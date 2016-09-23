import React, {Component} from 'react'
import * as helpers from 'utils/helpers'
import {consts} from 'constants'
import utils from 'utils'

export default class ProjectWeeklyReport extends Component {
  componentWillMount(){
    this.setState({
      uid: helpers.getUid()
    })
  }

  render() {
    const {projectInfo, projectWeeklyReport} = this.props

    return (
      <ul className="report-list">
        {
          projectWeeklyReport.items && projectWeeklyReport.items.map(item =>
            <li onClick={this.handleClick.bind(this, projectInfo, item)}>
              <div>
                <span className="report-name iconfont-wendang">项目周报</span>
                ({helpers.dateTime(item.progress_start_time).format(consts.DATE_FORMAT)}-{helpers.dateTime(item.progress_end_time).format(consts.DATE_FORMAT)})
              </div>
              <div className={item.progress_status ? (item.is_read ? 'readed' : 'unread') : 'unreport'}>
                {item.progress_status ? (item.is_read ? '已读' : '未读') : '待评价'}
              </div>
            </li>
          )
        }
      </ul>
    )
  }

  handleClick(projectInfo, data) {
    let reportId = data.id
    let projectId = data.project_id
    let status = +data.progress_status
    let uid = projectInfo.manager_uid
    let isManager = this.isSelf(uid)
    let urlNotEvaluateIsManager = `project/${projectId}/report/${reportId}`
    let urlNotEvaluateNotManager = `statistic/valuation`
    let urlIsEvaluate = `project/${projectId}/report/${reportId}`
    data.backUrl = `/menu/4/project/${projectId}`

    this.storageForNextPage(data)

    // 待评价状态下:status=0，项目负责人跳转项目周报评价页面，其他角色跳转待评价页面
    // 已读或未读状态下，所有角色查看项目周报详情页面
    switch(status) {
      case 0:
        if(isManager) {
          helpers.goPage(urlNotEvaluateIsManager)
        } else {
          helpers.goPage(urlNotEvaluateNotManager)
        }
        break
      default:
        helpers.goPage(urlIsEvaluate)
    }
  }

  storageForNextPage(options) {
    utils.setStorage('projectWeeklyReport', JSON.stringify(options))
  }

  isSelf(uid) {
    return +this.state.uid === +uid
  }
}
