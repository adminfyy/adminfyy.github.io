import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectReport from 'components/h5/ProjectReport'
import * as actionCreators from 'actions'
import * as helpers from '../../utils/helpers'
import Header from 'components/widget/header/version'


@connect(state => ({
  projectInfo: state.h5ProjectInfo,
  h5ReportDetail: state.h5ReportDetail,
  h5ReportVersions: state.h5ReportVersions
}), actionCreators)

export default class ProjectReportPage extends Component {

  constructor() {
    super()
    this.state = {
      uid: helpers.getSearchString('user_id')
    }
  }

  componentDidMount(){
    let {uid} = this.state

    // 请求项目的版本详细页
    let options = {
      projectId: this.props.params.pid,
      uid: uid,
      reportId: this.props.params.rid
    }
    this.props.fetchH5WeeklyReportDetail(options)
    this.props.fetchH5ProjectInfo(options)
    helpers.refresh()
  }

  render() {
    let {uid} = this.state
    let {pid} = this.props.params
    const {h5ReportDetail} = this.props
    if (h5ReportDetail.report_versions){
      return (
        <div className="project-weekly-report">
          <Header
            projectTitle="项目周报"
            hideInfo="true"
            />
          <ProjectReport {...this.props} uid={uid} projectId={pid}/>
        </div>
      )
    } else {
      return (
        <div className="page-loading"></div>
      )
    }
  }
}
