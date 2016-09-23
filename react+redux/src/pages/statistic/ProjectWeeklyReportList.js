import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import DetailHeader from 'components/widget/header/version'
import ProjectWeeklyReportList from 'components/project/report/ProjectWeeklyReportList'
import utils from 'utils'
import * as helpers from 'utils/helpers'

@connect(state => ({
  projectWeeklyReport: state.projectWeeklyReport
}), actionCreators)
export default class ProjectWeeklyReportListPage extends Component {
  constructor() {
    super()
    let date = helpers.getCurrentDate()
    this.currentYear = date.year
    this.currentMonth = date.month
    this.state = {
      year: this.currentYear,
      month: this.currentMonth
    }
    this.optionsCache = {}
  }
  componentDidMount() {
    const that = this
    let callback = function(){
      const {year, month} = that.state
      const {projectWeeklyReport} = that.props
      // 获取月份的起始和结束时间戳
      let startTimeStamp = helpers.getTimeStamp(year, 0, 1)
      let endDate = helpers.getDaysInMonth(year, month)
      let endTimeStamp = helpers.getTimeStamp(year, month, endDate)
      let isBack = projectWeeklyReport.isBack
      let options = {
        projectId: that.props.params.pid,
        $filter: 'progress_end_time ge ' + startTimeStamp + ' and progress_end_time lt ' + endTimeStamp,
        $orderby: 'progress_end_time DESC',
        $count: true
      }
      if(that.optionsCache.options){
        that.optionsCache.options.projectId = that.props.params.pid
      }
      if (!isBack) {
        that.props.fecthProjectWeeklyReport(that.optionsCache.options || options, that.optionsCache.activeYear || year, that.optionsCache.month || month)
      }
    }
    callback && callback()
    helpers.refresh(function(){
      callback()
    })
  }
  render() {
    const {projectWeeklyReport} = this.props
    console.log(projectWeeklyReport)
    let year = projectWeeklyReport.currentYear
    let month = projectWeeklyReport.currentMonth
    let projectDetail = JSON.parse(utils.getStorage('project'))
    let projectId = this.props.params.pid
    let projectName = projectDetail.project_info.name
    // 计算年份数组的长度
    let len = this.currentYear - 2014
    let items = projectWeeklyReport.items
    let results = projectWeeklyReport.results
    let yearArr = []
    for (let i = 0; i < len; i++) {
      yearArr.push(2015 + i)
    }

    if (!results) {
      return (
        <div className="page-loading"></div>
      )
    } else {
      return (
        <div className="weeklyreport-wrap">
          <DetailHeader {...this.props}
            projectTitle={'项目周报'}
            backUrl={`/menu/4/project/${projectId}`}
            hideInfo={'true'} />

          <div className="detail-info-wrap">
            <ul className="year-selector">
              {
                yearArr.map(item =>
                  <li className={item === year ? 'active' : ''}
                    onClick={this.handleClick.bind(this, item)}
                    ref="year"><a>{item}</a></li>
                )
              }
            </ul>
          </div>

          <div className="iconfont-project">项目：{projectName}</div>
          <div>
            {
              items.length
              ? <ProjectWeeklyReportList {...this.props} month={month} />
              : <div className="no-doc">
                <div className="txt-center">暂无项目周报</div>
              </div>
            }
          </div>
        </div>
      )
    }
  }

  handleClick(activeYear) {
    const that = this
    let startTimeStamp = helpers.getTimeStamp(activeYear, 0, 1)
    let endDate
    let endTimeStamp
    let month
    that.props.clearProjectWeeklyReport()

    if (activeYear < that.currentYear) {
      month = 11
    } else if (activeYear === that.currentYear) {
      month = that.currentMonth
    }

    endDate = helpers.getDaysInMonth(activeYear, month)
    endTimeStamp = helpers.getTimeStamp(activeYear, month, endDate)
    let options = {
      projectId: that.props.params.pid,
      $filter: 'progress_end_time ge ' + startTimeStamp + ' and progress_end_time lt ' + endTimeStamp,
      $orderby: 'progress_end_time DESC',
      $count: true
    }
    this.optionsCache = {
      options: {...options},
      activeYear: activeYear,
      month: month
    }
    this.props.fecthProjectWeeklyReport(options, activeYear, month)
  }
}
