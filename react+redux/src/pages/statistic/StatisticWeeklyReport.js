import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import ProjectHeader from 'components/widget/header/version'
import Tab from 'components/widget/tab/default/index'
import WeeklyReportStatistic from 'components/statistic/weeklyReport'
import * as consts from 'constants/const'
import * as helpers from 'utils/helpers'
@connect(state => ({
  weeklyReport: state.weeklyReport,
  misc: state.misc,
  roles: state.roles
}), actionCreators)
export default
class weeklyReportStatisticPage extends Component {
  constructor(props){
    super(props)
    this.tabDefault = {
      tabValue: consts.ScoreLevel,
      isAverage: true,
      handleFunction: this.tabCallback.bind(this)
    }
    this.projectHeaderArguments = {
      projectTitle: '项目周评分统计',
      backUrl: '/view',
      noinf: true,
      hideInfo: true
    }
  }
  componentDidMount() {
    const that = this
    let callback = function(){
      that.props.fetchWeeklyReport(
        {...that.setQuery(that.props.misc.filterWeeklyReport)}, null, true)
      that.props.fetchUCUserRoles()
    }
    callback && callback()
    helpers.refresh(function(){
      that.props.cleanWeeklyReport()
      callback()
    })
  }
  componentWillUnmount(){
    this.props.cleanWeeklyReport()
  }
  render(){
    const {weeklyReport, misc} = this.props

    return (
      <div>
        <ProjectHeader {...this.projectHeaderArguments}/>
        <Tab options={{...this.tabDefault, isActive: misc.filterWeeklyReport}}/>
        <WeeklyReportStatistic {...this.props} onUpload={this.onUpload.bind(this)} data={weeklyReport}/>
      </div>
    )
  }

  tabCallback(level){
    this.props.updateFilterWeeklyReport(level)
    this.props.cleanWeeklyReport()
    let that = this
    setTimeout(() => (
      that.props.fetchWeeklyReport({...that.setQuery(level)}, null, true)
    ), 50)
  }

  setQuery(level){
    return {
      $filter: this.setFilter(level),
      $limit: consts.PAGE_SIZE_MOBILE,
      $count: true,
      $orderby: 'progress_score DESC'
    }
  }
  /**
   * [setFilter description]
   * @method setFilter
   * @param  {[type]}
   * level [0:S:120,1:A:110,2:B:100,3:C:90,4:D:60,5:NAN]
   */
  setFilter(level){
    let filterStr = ''
    switch (level) {
      case 0:
        filterStr = 'progress_score gt 110 and progress_score le 120'
        break
      case 1:
        filterStr = 'progress_score gt 100 and progress_score le 110'
        break
      case 2:
        filterStr = 'progress_score gt 90 and progress_score le 100'
        break
      case 3:
        filterStr = 'progress_score gt 60 and progress_score le 90'
        break
      case 4:
        filterStr = 'progress_score gt 0 and progress_score le 60'
        break
      default:
        filterStr = 'progress_status eq 0'
        break
    }
    return filterStr
  }

    getNextQuery(query, weeklyReport){
      return {
        ...query,
        $offset: weeklyReport.page * query.$limit
      }
    }

    onUpload(){
      const {fetchWeeklyReport, weeklyReport, misc} = this.props
      let Querys = {...this.setQuery(misc.filterWeeklyReport)}
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
