import React, { Component } from 'react'
import ProjectHeader from 'components/widget/header'

export default class DashBoardHeader extends Component {

  render() {
    return (
      <div>
        <ProjectHeader {...this.props}
          projectDetail={this.props.projectDetail}
          projectTitle={'协作'}
          backUrl="/"
           />
      </div>
    )
  }
}
