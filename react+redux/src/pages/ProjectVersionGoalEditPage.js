// ProjectVersionGoalEditPage.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actionCreators from 'actions'
import * as helpers from 'utils/helpers'
// components
import ProjectVersionGoalEdit from 'components/ProjectVersionGoalEdit'
import { is } from 'immutable'

@connect(state => ({}), actionCreators)
export default
class ProjectVersionEditPage extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props === nextProps || is(this.props, nextProps)) || !(this.state === nextState || is(this.state, nextState))
  }

  render() {
    const { id, vid, gpid, glid, type, tplid } = this.props.params

    return (
      <div>
        <ProjectVersionGoalEdit projectId={id} versionId={vid} groupId={gpid} goalId={glid} type={type} tplid={tplid}/>

        <Link className="suspended" onClick={(e) => helpers.goPage(`/project/${id}/versions`)}>返回</Link>
      </div>
    )
  }
}
