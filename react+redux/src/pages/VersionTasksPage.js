import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskList from 'components/version/detail/group/TaskList'
import VersionHeader from 'components/widget/header/version'
import * as actionCreators from 'actions'

@connect(state => ({
  projectVersionDetail: state.projectVersionDetail
}), actionCreators)

export default class VersionTasksPage extends Component {

  componentDidMount() {
    let options = {
      projectId: this.props.params.pid,
      versionId: this.props.params.vid
    }

    this.props.fetchProjectNoVersionDetail(options)
  }

  render() {
    const {projectVersionDetail} = this.props
    let projectId = this.props.params.pid
    let versionId = this.props.params.vid
    let projectStatus = this.props.params.type
    let versionDetail = {
      'project_version_id': versionId,
      'project_id': projectId,
      'projectStatus': projectStatus
    }
    let addTask = true

    return (
      <div>
        <div className="project-page">
          <VersionHeader {...this.props}
            projectTitle={'管理文档'}
            projectVersionDetail={projectVersionDetail}
            projectStatus={projectStatus}
            backUrl={`/menu/2/versions/${projectId}`} />
          <TaskList detail={versionDetail}
            addTask={addTask}
            projectStatus={projectStatus} />
        </div>
      </div>
    )
  }
}
