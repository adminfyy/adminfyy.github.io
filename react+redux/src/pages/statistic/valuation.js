import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import DetailHeader from 'components/widget/header/version'
import utils from 'utils'
import * as helpers from 'utils/helpers'
import {consts} from 'constants'

@connect(state => ({
}), actionCreators)
export default class Valuation extends Component {
  render() {
    let projectWeeklyReport = JSON.parse(utils.getStorage('projectWeeklyReport'))
    let progressStartTime = helpers.dateTime(projectWeeklyReport.progress_start_time).format(consts.DATE_FORMAT)
    let progressEndTime = helpers.dateTime(projectWeeklyReport.progress_end_time).format(consts.DATE_FORMAT)
    let backUrl = projectWeeklyReport.backUrl
    let projectStr = utils.getStorage('project')
    let project = projectStr ? JSON.parse(projectStr) : ''
    let projectName = projectWeeklyReport.name || (project && project.project_info && project.project_info.name)

    return (
      <div className="evaluate-wrap detail-header">
        <DetailHeader {...this.props}
          projectTitle={'项目周报'}
          backUrl={backUrl}
          hideInfo />
        <div className="detail-info-wrap iconfont-project">
          项目：{projectName}
        </div>

        <div className="main">
          <div className="iconfont-wendang">
            {progressStartTime}-{progressEndTime} 项目周报
          </div>
          <div className="iconfont-evaluation"></div>
          <div className="loading">等待负责人评价...</div>
        </div>
      </div>
    )
  }
}
