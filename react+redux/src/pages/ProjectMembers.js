import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectMember from 'components/member/ProjectMember'
import ProjectHeader from 'components/widget/header'
import * as actionCreators from 'actions'
import * as helpers from 'utils/helpers'

@connect(state => ({
  roles: state.roles,
  projectDetail: state.projectDetail,
  members: state.members
}), actionCreators)
export default
class ProjectMembers extends Component {

  componentDidMount() {
    this.props.fetchProjectDetail(this.props.params.id)
    this.props.fetchUCUserRoles()
    this.props.fetchProjectMembers(this.props.params.id)
    setTimeout(helpers.ScrollResize, 300)
  }

  render() {
    const {projectDetail, members, delMember} = this.props
    const { roles } = this.props

    if (projectDetail && projectDetail.project_info) {

      const state = this.state
      const projectInfo = projectDetail.project_info
      /* eslint no-unused-vars:0 */
      let isSub = projectDetail.is_sub
      if (state && typeof state.isSub !== 'undefined') {
        isSub = state.isSub
      }

      let groupurl = 'cmp://com.nd.social.im/chat?id=' + projectInfo.im_group_id + '&type=1'
      let forumurl = 'cmp://com.nd.social.forum/forumSectionHomePage?sectionId=' + projectInfo.forum_id
      return (
        <div className="second-div">
          <div className="project-page w_height">
            <ProjectHeader projectDetail={projectDetail} projectTitle={'项目成员'}/>
            <ProjectMember projectInfo={projectInfo} projectDetail={projectDetail} members={members} permission={roles} delMember={delMember}/>
          </div>
        </div>
      )
    } else {
      return (
        <div className="page-loading"></div>
      )
    }
  }
}
