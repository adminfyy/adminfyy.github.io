import React, {Component} from 'react'
import {createHashHistory} from 'history'
import * as helpers from 'utils/helpers'
import {consts} from 'constants'
import utils from 'utils'

export default class ProjectReportItem extends Component {
  componentWillMount(){
    this.setState({
      uid: helpers.getUid()
    })
  }

  render() {
    const {currentMonth, projectWeeklyReport} = this.props

    let currentData = projectWeeklyReport.results[currentMonth]
    let isCurrent = +projectWeeklyReport.currentMonth === +currentMonth

    let year = projectWeeklyReport.currentYear

    return (
      <div className="project-wr-item">
        <div className={isCurrent ? 'title iconfont-arrow-circle-up' : 'title iconfont-arrow-circle-down'}
          onClick={this.handleClick.bind(this, currentMonth, year)}
           ref={'title-' + currentMonth}>
          <h1>{helpers.getMonthCN(currentMonth + 1)}</h1>
        </div>
        {currentData.length
          ? <ul className={isCurrent ? '' : 'dn'} ref={'list-' + currentMonth}>
            {
              currentData.map(item =>
                <li className={item.progress_status ? (item.is_read ? 'readed-li' : 'unread-li') : 'unreport-li'}
                  onClick={this.clickItem.bind(this, item, currentMonth, year)}>
                  <div>
                  {helpers.dateTime(item.progress_start_time).format(consts.DATE_FORMAT_MD)}-{helpers.dateTime(item.progress_end_time).format(consts.DATE_FORMAT_MD)} 项目周报
                  </div>
                  <div className={item.progress_status ? (item.is_read ? 'readed' : 'unread') : 'unreport'}>
                    {item.progress_status ? (item.is_read ? '已读' : '未读') : '待评价'}
                  </div>
                </li>
              )
            }
          </ul>
        : <div className={isCurrent ? 'item-no-data' : 'item-no-data dn'} ref={'list-' + currentMonth}>暂无项目周报</div>
        }
      </div>
    )
  }

  clickItem(data, month, year) {
    let reportId = data.id
    let projectId = data.project_id
    let status = +data.progress_status
    let uid = data.reporter_uid
    let isManager = this.isSelf(uid)
    let history = new createHashHistory()
    let urlNotEvaluateIsManager = `project/${projectId}/report/${reportId}`
    let urlNotEvaluateNotManager = `statistic/valuation`
    let urlIsEvaluate = `project/${projectId}/report/${reportId}`
    data.backUrl = `/project/${projectId}/weeklyreport`

    this.props.updateProjectWeeklyReport(month, year, true, reportId)
    this.storageForNextPage(data)

    // 待评价状态下:status=0，项目负责人跳转项目周报评价页面，其他角色跳转待评价页面
    // 已读或未读状态下，所有角色查看项目周报详情页面
    switch(status) {
      case 0:
        if(isManager) {
          history.push(urlNotEvaluateIsManager)
        } else {
          history.push(urlNotEvaluateNotManager)
        }
        break
      default:
        history.push(urlIsEvaluate)
    }
  }

  storageForNextPage(options) {
    utils.setStorage('projectWeeklyReport', JSON.stringify(options))
  }

  isSelf(uid) {
    return +this.state.uid === +uid
  }

  handleClick(month, year) {
    let list = this.refs['list-' + month].getDOMNode()
    let title = this.refs['title-' + month].getDOMNode()
    if(list.classList.contains('dn')){
      list.classList.remove('dn')
      title.className = 'title iconfont-arrow-circle-up'
    } else{
      list.classList.add('dn')
      title.className = 'title iconfont-arrow-circle-down'
    }
    this.props.updateProjectWeeklyReport(month, year, false)
  }

}
