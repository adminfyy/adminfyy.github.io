import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectVersionList from 'components/versions/ProjectVersionList'
import * as actionCreators from 'actions'
import { is } from 'immutable'
import { consts } from 'constants'
import * as helpers from 'utils/helpers'
@connect(state => ({
  roles: state.roles,
  projectDetail: state.projectDetail,
  projectCurVersions: state.projectCurVersions,
  projectUndoVersions: state.projectUndoVersions,
  projectDoneVersions: state.projectDoneVersions,
  VersionActiveTab: state.VersionActiveTab
}), actionCreators)

export default class ProjectVersions extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props === nextProps || is(this.props, nextProps)) ||
     !(this.state === nextState || is(this.state, nextState))
  }

  componentDidMount() {
    // 请求项目的版本列表
    const that = this
    const {id} = that.props.params
    let callback = function(){
      that.props.fetchUCUserRoles()
      that.props.fetchProjectDetail(id)
      that.props.fetchProjectVersions({ projectId: id, versionTimeType: consts.Milestone.cur, $limit: 3 })
      that.props.fetchProjectVersions({ projectId: id, versionTimeType: consts.Milestone.undo, isCut: false, $limit: 3 })
      that.props.fetchProjectVersions({ projectId: id, versionTimeType: consts.Milestone.done, isCut: false, $limit: 3 })
    }
    callback && callback()
    helpers.refresh(function(){
      that.props.clearProjectCurVersions()
      that.props.clearProjectUndoVersions()
      that.props.clearProjectDoneVersions()
      callback()
    })
  }
  componentWillUnmount() {
    this.props.clearProjectCurVersions()
    this.props.clearProjectUndoVersions()
    this.props.clearProjectDoneVersions()
  }

  render() {
    const { projectDetail, projectCurVersions, projectUndoVersions, projectDoneVersions } = this.props
    if (!projectDetail || !projectDetail.hasOwnProperty('project_info') ||
     !projectCurVersions || !projectCurVersions.page ||
     !projectUndoVersions || !projectUndoVersions.page ||
     !projectDoneVersions || !projectDoneVersions.page){
      return (
        <div>
          <div className="page-loading"></div>
        </div>
        )
    } else {
      return (
        <div className="g-milestone">
          <ProjectVersionList {...this.props}/>
        </div>
      )
    }
  }
}
