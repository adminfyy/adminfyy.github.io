import React, { Component, PropTypes } from 'react'
import ProjectCard from 'components/projects/ProjectCard'
import Banner from 'components/projects/banner'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import Content from 'components/projects/widget/content'
import { consts } from 'constants'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import {ScrollResize, Scroll, ScrollToPrePosition, getUid} from 'utils/helpers'
import warn from 'utils/warn'

@connect(state => ({
  misc: state.misc
}), actionCreators)
export default class ProjectList extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    projects: PropTypes.object.isRequired
  }
  componentDidMount() {
    const uid = getUid()
    if(!warn.warnKey){
      this.props.fetchProjects({isDispatch: 'no', $filter: `manager_uid eq ${uid}`, tab: 3},
      (data) => {
        if(!data.items.length) { return }
        let j = 0
        window.dialog.setOptions({
          visible: true,
          title: '',
          label: {
            component: Content
          },
          componentProps: {
            name: data.items[j]['project_info'].name,
            overlayDays: data.items[j]['project_info']['roadmap_overdue_days']
          },
          noAction: true,
          prefixClass: 'projects-warn-dialog',
          isHidden: false,
          cancelHandler: function(){
            j = ++j
            if(j > data.items.length - 1) {
              window.dialog.setOptions({
                visible: false
              })
              return
            }
            window.dialog.setOptions({
              componentProps: {
                name: data.items[j]['project_info'].name,
                overlayDays: data.items[j]['project_info']['roadmap_overdue_days']
              }
            })
          }
        })
        warn.warnKey = true
      })
    }
    ScrollToPrePosition(this.props.misc.scrollTop)
  }

  componentWillUnmount(){
    this.props.modifyProjectsListScrollTop(this.refs['project-list-ref'].getDOMNode().scrollTop)
  }

  getRandom(){
    return Math.random()
  }

  render() {
    const {
      subProjects,
      curTab,
      stats,
      getData,
      updateProjectInfo
      } = this.props
    const activeTab = curTab.curTab || consts.PROJECTS
    const oldTab = curTab.oldTab || consts.PROJECTS
    let data = getData(activeTab)
    // 1 normal 2warn 3error 4follow
    if(!(data && (data.isSearch || typeof data.items !== 'undefined'))){
      return <div className="page-loading"></div>
    }
    return (
      <div className="page js-scroll-panel panel-group js-scroll scroll-css"
      onLoad={ScrollResize()} onScroll={this.scrollForLoad.bind(this)}
      ref="project-list-ref">
        {stats && <Banner {...this.props} tab={activeTab} oldTab={oldTab} />}
        {data.items.map((project, i) =>
          <ProjectCard key={ 'projecstList-' + project.project_info.project_id + (curTab.curTab || '') + i}
                       project={project}
                       subProjects={subProjects}
                       month={data.month}
                       updateProjectInfo={updateProjectInfo}/>
        )}
        <RefreshStatus length={data.items.length} total={data.count} key={data.count}/>
      </div>
    )
  }

  getProjectListScrollTop() {
    return this.refs['project-list-ref'] && this.refs['project-list-ref'].getDOMNode().scrollTop
  }

  scrollForLoad(){
    Scroll({fnCallback: this.onUpload.bind(this)})
  }

  search() {
    const { curTab, getData } = this.props
    const activeTab = curTab.curTab || consts.PROJECTS
    const data = getData(activeTab)
    let page = data.page
    let queryInfo = {}
    queryInfo.keyword = data.keyword
    queryInfo.$offset = page * consts.PAGE_SIZE
    return queryInfo
  }

  /**
   * [onUpload 滚动加载更新,加载状态参考scroll--refreshStatus]
   * @method onUpload
   * @return {[type]} [description]
   */
  onUpload() {
    const { fetchProjects, updateQueryInfo, curTab } = this.props
    let activeTab = curTab.curTab || consts.PROJECTS
    let queryInfo = this.search()
    let nextInfo = {...queryInfo}
    if (activeTab) {
      nextInfo.subscribe = activeTab === consts.SUBSCRIBE ? 1 : 0
      nextInfo.tab = activeTab
    }
    let $loading = document.querySelector('.js-scroll-loading')
    let $el = document.querySelector('.js-scroll')
    if ($loading.classList.contains('data-short')) return
    $loading.classList.remove('data-more')
    $loading.classList.add('data-loading')
    updateQueryInfo(nextInfo)
    setTimeout(function () {
      fetchProjects(nextInfo, function (data) {
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
