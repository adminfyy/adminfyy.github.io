import React, { Component } from 'react'
import * as helpers from 'utils/helpers'

export default class ProjectItem extends Component {

  handleClick() {
    const {project, projectsAll} = this.props
    let keyword = projectsAll.keyword
    let projectId = project.project_id

    this.props.updateProjectsAll(projectId, 1, keyword)
  }

  componentDidMount() {
    let that = this
    setTimeout(function () {
      helpers.Scroll({ fnCallback: that.props.onUpload }, 110)
    }, 500)
  }

  render() {
    const {project, onUpload} = this.props
    let isSelected = project.isSelected

    return (
        <li className={isSelected ? 'active' : ''}
          onClick={this.handleClick.bind(this)}
          onUpload={onUpload.bind(this)}>{project.name}</li>
    )
  }

}
