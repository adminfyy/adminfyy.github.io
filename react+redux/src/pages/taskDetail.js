import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import TaskDetail from 'components/version/detail/group/TaskDetail'
import VersionHeader from 'components/widget/header/version'
import * as helpers from '../utils/helpers'
let versionDetail
@connect(state => ({
  version: state.projectVersionDetail,
  task: state.versionTask,
  projectInfo: state.h5ProjectInfo
}), actionCreators)
export default class ProjectVersionEditPage extends Component {

  componentDidMount() {
    let that = this
    let options = {
      projectId: this.props.params.pid,
      versionId: this.props.params.vid,
      mobile: this.props.params.mobile,
      taskId: this.props.params.tid
    }
    if(+that.props.params.vid){
      that.props.fetchProjectVersionDetail(options)
    }
    that.props.fetchH5ProjectInfo(options)
    // that.props.fetchTaskDetail(options)
  }

  render() {
    const {version, task, projectInfo} = this.props
    const { pid, vid, tid, mobile } = this.props.params
    if(!helpers.isEmpty(version)){
      versionDetail = version
    }
  //  let backUrl = utils.getStorage('taskDetail')
    let homeUrl = ''
    if (+mobile){
      homeUrl = '1'
    }
    if (helpers.isEmpty(versionDetail) || !versionDetail.project_version_id){
      return (
        <div>
          <div className="page-loading"></div>
        </div>
        )
    } else{
      return (
        <div>
          <VersionHeader {...this.props}
          projectTitle={'文档详情'}
          projectVersionDetail={versionDetail}
          projectStatus={projectInfo.status}
          homeUrl={homeUrl} />
          <TaskDetail projectId={pid}
                      versionId={vid}
                      taskId={tid}
                      version={version}
                      task={task}
                      projectName ={versionDetail.project_name}
                      projectVersionDetail={versionDetail}
          />
        </div>
      )
    }
  }
}
