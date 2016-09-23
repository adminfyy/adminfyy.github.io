import React, { Component } from 'react'
import TaskList from 'components/version/detail/group/TaskList'
import ProjectVersionDescription from './ProjectVersionDescription'
export default class ProjectVersion extends Component {
  render() {
    const {versionDetail} = this.props
    return (
      <div>
        { versionDetail.project_id !== 'error' &&
        <div >
          <ProjectVersionDescription versionDetail={versionDetail}/>
          <TaskList detail={versionDetail} addTask={false}
            projectStatus={this.props.projectStatus}/>
        </div>
        }
      </div>
    )
  }
}
