import React, { Component } from 'react'
import PageInfo from './PageInfo'
import ProjectInfo from './ProjectInfo'

export default class ProjectHeader extends Component {

  render() {
    let status = this.props.projectDetail.project_info.status
    return (
      <div className="project-header" id="project-header">
        <div className={`bg-header-${status}`}>
          <PageInfo {...this.props}
            backUrl={this.props.backUrl}
            projectTitle = {this.props.projectTitle} />
          <ProjectInfo {...this.props} projectDetail={this.props.projectDetail} />
        </div>
      </div>
    )
  }
}
