import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchPerson from 'components/widget/search/SearchPerson'
import ProjectHeader from 'components/widget/header'
import * as actionCreators from 'actions'
import * as helpers from '../utils/helpers'
@connect(state => ({
  users: state.users,
  projectDetail: state.projectDetail,
  duties: state.duties
}), actionCreators)
export default class AddMember extends Component {
  componentDidMount() {
    this.props.getOrgId()
    this.props.fetchProjectDetail(this.props.params.id)
  }

  render() {
    const {projectDetail} = this.props

    if (helpers.isEmpty(projectDetail)) {
      return (
        <div>
          <div className="page-loading"></div>
        </div>
      )
    } else {
      return (
        <div className="w_height">
          <ProjectHeader projectDetail={projectDetail} projectTitle={'项目成员'} />
          <SearchPerson {...this.props} />
        </div>
      )
    }
  }
}
