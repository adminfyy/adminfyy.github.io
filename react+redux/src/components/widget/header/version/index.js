import React, { Component } from 'react'
import PageInfo from './PageInfo'
import ProjectInfo from './ProjectInfo'

export default class ProjectHeader extends Component {

  render() {
    const {hideInfo} = this.props
    return (
      <div className="detail-header" id="project-header">
        <PageInfo {...this.props}
          backUrl={this.props.backUrl}
          homeUrl={this.props.homeUrl}
          projectTitle = {this.props.projectTitle} />
        {hideInfo ? '' : <ProjectInfo {...this.props} />}
      </div>
    )
  }
}
