import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import utils from 'utils'
import {consts} from 'constants'

export default class WeeklyReportCard extends Component {
  componentWillMount() {
    this.setState({
      uid: helpers.getUid()
    })
  }

  // componentDidMount() {
  //   setTimeout(Scroll({fnCallback: this.props.onUpload}, 0), 500)
  // }

  storageForNextPage(options) {
    utils.setStorage('projectWeeklyReport', JSON.stringify(options))
  }

  isSelf(uid) {
    return +this.state.uid === +uid
  }

  handleCardClick() {
    const { carddata, data, roles } = this.props
    let uid = carddata.reporter_uid
    let isManager = this.isSelf(uid)
    let isVC = helpers.checkPermission(consts.PERMISSION_TYPE.editVersion, null, roles)

    if (!isManager && !isVC) {
      return
    }

    let projectId = carddata.project_id
    let reportId = carddata.report_id
    let status = carddata.progress_status

    carddata.backUrl = `/statistic/weeklyReport`
    carddata['progress_start_time'] = data.start_time
    carddata['progress_end_time'] = data.end_time
    let urlNotEvaluateIsManager = `project/${projectId}/report/${reportId}`
    let urlNotEvaluateNotManager = `statistic/valuation`
    let urlIsEvaluate = `project/${projectId}/report/${reportId}`
    this.storageForNextPage(carddata)

    // 待评价状态下:status=0，跳转待评价页面
    // 已读或未读状态下，所有角色查看项目周报详情页面
    switch (status) {
      case 0:
        if (isManager) {
          helpers.goPage(urlNotEvaluateIsManager)
        } else if (isVC) {
          helpers.goPage(urlNotEvaluateNotManager)
        }
        break
      default:
        if (projectId && reportId) {
          helpers.goPage(urlIsEvaluate)
        }
    }
  }

  render() {
    const {carddata, index, displayOrder} = this.props

    return (
      <div className="stat-card text-middle-55" onClick={this.handleCardClick.bind(this)}>
        <div className="column-4">{0 + index + 1}</div>
        {
          displayOrder.map((data) =>
            <div key={ index + '-' + data }
                 className={carddata[data] + ' column-4'}>{ carddata[data] === null ? '--' : carddata[data] }</div>
          )}
      </div>
    )
  }
}
