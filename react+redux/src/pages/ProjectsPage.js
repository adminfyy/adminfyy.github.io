import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectList from 'components/projects/ProjectList'
import Login from 'components/login/Login'
import Navbar from 'components/project/NavBar'
import OpenIndex from './OpenIndex'
import * as actionCreators from 'actions'
import {consts} from 'constants'
import RankList from 'components/ranklist/project'
import Header from 'components/ranklist/widget/header'
import Card from 'components/ranklist/widget/card'
import CardMine from 'components/ranklist/widget/card-mine'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import {Scroll, ScrollResize} from 'utils/helpers'
import * as helpers from 'utils/helpers'
import { imOpenInWeb } from 'utils/im'

@connect(state => ({
  projects: state.projects,
  subProjects: state.subProjects,
  normalProjects: state.normalProjects,
  warnProjects: state.warnProjects,
  errorProjects: state.errorProjects,
  curTab: state.curTab,
  queryInfo: state.queryInfo,
  refresh: state.refresh,
  stats: state.stats,
  roles: state.roles,
  weeklyReport: state.weeklyReport,
  mineWeeklyReport: state.mineWeeklyReport
}), actionCreators)
export default class ProjectsPage extends Component {
  constructor() {
    super()
    this.state = {
      activeIndex: 'projectlist',
      isValid: true
    }
    this.myListOptions = {
      isScrollLock: true,
      query: {
        'is_ranking': true,
        '$orderby': 'ranking asc and progress_score desc',
        'is_member': true,
        '$count': true,
        '$limit': 20
      }
    }
    this.rankListOptions = {
      isUploadAllowed: true,
      isScrollLock: true,
      query: {
        'is_ranking': true,
        '$orderby': 'ranking asc and progress_score desc',
        '$count': true,
        '$limit': 10
      }
    }
  }

  getData(activeTab) {
    let {
      subProjects,
      projects,
      normalProjects,
      warnProjects,
      errorProjects} = this.props
    switch (activeTab) {
      case consts.PROJECTS:
        return projects
      case consts.SUBSCRIBE:
        return subProjects
      case consts.PROJECT_NORMAL:
        return normalProjects
      case consts.PROJECT_WARN:
        return warnProjects
      case consts.PROJECT_ERROR:
        return errorProjects
      default :
        return projects
    }
  }

  componentDidMount() {
    const that = this
    const {curTab} = this.props
    let callback = function(){
      let tab = curTab.curTab || consts.PROJECTS
      const index = (that.props.params && that.props.params.index) || that.state.activeIndex
      if (imOpenInWeb()) { return }
      that.props.valid(window.location.search, function cb(res) {
        if (res === 'success') {
          that.props.fetchProjectsStatistic()
          that.props.fetchUCUserRoles()
          let data = that.getData(tab)
          if (typeof data.items === 'undefined') {
            that.props.fetchProjects({tab: tab})
          }
          that.props.getOrgId()
          that.setState({
            isValid: true,
            activeIndex: index
          })
        } else {
          that.setState({
            isValid: false,
            activeIndex: index
          })
        }
      })
      that.props.clearVersionsTab('cur')
      document.title = '项目官网'
    }
    callback && callback()
    helpers.refresh(function(){
      const curTabCallback = that.props.curTab
      that.props.clearSubProjects()
      that.props.clearNormalProjects()
      that.props.clearWarnProjects()
      that.props.clearErrorProjects()
      const isSubscribe = curTabCallback.curTab === consts.PROJECTS
      that.props.fetchProjectsStatistic()
      that.props.fetchUCUserRoles()
      if (!curTabCallback.curTab || isSubscribe) {
        that.props.clearProjects()
      }
      if(curTabCallback.curTab === 'subscribe'){
        that.props.fetchProjects({subscribe: 1, tab: consts.SUBSCRIBE})
      } else{
        that.props.fetchProjects({tab: curTabCallback.curTab})
      }
      that.props.getOrgId()
    })
  }

  componentDidEnter() {
    this.props.clearProjectDetail()
  }

  handleClick(view) {
    this.setState({activeIndex: view})
  }

  render() {
    const { stats, weeklyReport, fetchWeeklyReport, mineWeeklyReport, fetchMineWeeklyReport, cleanWeeklyReport, cleanMineWeeklyReport } = this.props
    const {activeIndex} = this.state

    if (this.state && !this.state.isValid) {
      return <Login {...this.props} projectsPage={this}/>
    }
    if (typeof stats.all_count === 'undefined') {
      return <div className="page-loading"></div>
    }
    if (stats.all_count === 0) {
      return <OpenIndex />
    }

    return (
      <div id="project-list" className="page position-relative">
        {
          activeIndex === 'ranklist'
          ? <div className={`js-scroll`}
          onScroll={this.scrollForUpload.bind(this)}
          onLoad={ScrollResize()}>
            <RankList fetchAction={fetchMineWeeklyReport}
                      cleanAction={cleanMineWeeklyReport}
                      datas={mineWeeklyReport}
                      Card={CardMine}
                      options={this.myListOptions}/>
            <RankList fetchAction={fetchWeeklyReport}
                      cleanAction={cleanWeeklyReport}
                      datas={weeklyReport}
                      Card={Card} Header={Header}
                      options={this.rankListOptions}/>
            <RefreshStatus length={weeklyReport.items.length} total={weeklyReport.count} key={weeklyReport.items.length}/>
          </div>
          : <ProjectList {...this.props} getData={this.getData.bind(this)}/>
        }
        <Navbar handleClick={this.handleClick.bind(this)} activeIndex={activeIndex} key={`activeIndex:${activeIndex}`}/>
      </div>
    )
  }

    scrollForUpload(){
      Scroll({fnCallback: this.onUpload.bind(this)})
    }

    /* js-scroll 滚动加载函数 */
    getNextQuery(query, data){
      return {
        ...query,
        $offset: data.items.length
      }
    }

    /*
    ** fetchAction 用于滚动加载的数据请求借口
    ** data 当前的卡片数据列表
     */
    onUpload(){
      const {fetchWeeklyReport, weeklyReport} = this.props
      let Querys = this.rankListOptions.query
      let nextInfo = this.getNextQuery(Querys, weeklyReport)
      let $loading = document.querySelector('.js-scroll-loading')
      let $el = document.querySelector('.js-scroll')
      if ($loading.classList.contains('data-short')) return
      $loading.classList.remove('data-more')
      $loading.classList.add('data-loading')
      setTimeout(function () {
        fetchWeeklyReport(nextInfo, function (data) {
          let list = data && data.items
          let len = list.length
          $loading.classList.remove('data-loading')
          $el.classList.remove('data-scroll')
          if (!len) {
            $loading.classList.add('data-short')
          }
        })
      }, 500)
    }
}
