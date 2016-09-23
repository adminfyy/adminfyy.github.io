import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import * as helpers from 'utils/helpers'
import ProjectMilestoneEdit from 'components/version/edit/ProjectMilestoneEdit'

@connect(state => ({}), actionCreators)
export default class ProjectVersionEditPage extends Component {
  componentDidMount() {
    helpers.refresh()
  }
  render() {
    const { menu, pid, vid, from } = this.props.params
    return (
      <div className="milestone-edit js-virKeybord">
        <ProjectMilestoneEdit menu={menu} projectId={pid} versionId={vid} fromFlag={from} {...this.props}/>
      </div>)
  }
}
