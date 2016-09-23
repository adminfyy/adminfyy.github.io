import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import ProjectHeader from 'components/widget/header/version'
import Tab from 'components/widget/tab/default/index'
import VersionStatistic from 'components/statistic/versionStat'
import * as consts from 'constants/const'
import * as helpers from 'utils/helpers'
@connect(state => ({
  versionStat: state.versionStat,
  misc: state.misc,
  roles: state.roles
}), actionCreators)
export default
class weeklyReportStatisticPage extends Component {
  constructor(props){
    super(props)
    this.tabDefault = {
      tabValue: consts.MileStoneLabels,
      isAverage: true,
      handleFunction: this.tabCallback.bind(this)
    }
    this.projectHeaderArguments = {
      projectTitle: '项目里程碑概览',
      backUrl: '/view',
      noinfo: true,
      hideInfo: true
    }
  }
  componentDidMount() {
    const that = this
    let callback = function(){
      that.props.fetchVersionStatistic(
        {...that.setQuery(that.props.misc.filterVersion)}
        , null, true)
      that.props.fetchUCUserRoles()
    }
    callback && callback()
    helpers.refresh(callback)
  }
  componentWillUnmount(){
    this.props.cleanVersionStatistic()
  }
  render(){
    const { versionStat, misc } = this.props
    return (
      <div>
        <ProjectHeader {...this.projectHeaderArguments}/>
        <Tab options={{...this.tabDefault, isActive: misc.filterVersion}}/>
        <VersionStatistic {...this.props}
          onUpload={this.onUpload.bind(this)}
          data={versionStat}/>
      </div>
    )
  }

  tabCallback(level){
    this.props.updateFilterVersion(level)
    this.props.cleanVersionStatistic()
    let that = this
    setTimeout(() => (
      that.props.fetchVersionStatistic({...that.setQuery(level)}, null, true)
    ), 50)
  }


  setQuery (level){
    return {
      $filter: this.setFilter(level),
      $limit: consts.PAGE_SIZE_MOBILE,
      $count: true
    }
  }
  setFilter(level){
    let filterStr = ''
    switch (level) {
      case 0:
        filterStr = 'unfinished_count eq 0'
        break
      case 1:
        filterStr = 'unfinished_count eq 1'
        break
      case 2:
        filterStr = 'unfinished_count ge 2'
        break
      default:
        filterStr = 'unfinished_count eq 0'
        break
    }
    return filterStr
  }

    getNextQuery(query, versionStat){
      return {
        ...query,
        $offset: versionStat.page * query.$limit
      }
    }

    onUpload(){
      const {fetchVersionStatistic, versionStat, misc} = this.props
      let Querys = {...this.setQuery(misc.filterVersion)}
      let nextInfo = this.getNextQuery(Querys, versionStat)
      let $loading = document.querySelector('.js-scroll-loading')
      let $el = document.querySelector('.js-scroll')
      if ($loading.classList.contains('data-short')) return
      $loading.classList.remove('data-more')
      $loading.classList.add('data-loading')
      setTimeout(function () {
        fetchVersionStatistic(nextInfo, function (data) {
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
