import React, { Component } from 'react'
import ProjectMemberTo from 'components/member/ProjectMemberTo'
import * as helpers from '../../utils/helpers'
import {consts} from 'constants'

export default
class ProjectMember extends Component {
  goToLink(projectId) {
    let url = `/addMember/${projectId}`
    helpers.goPage(url)
  }
  componentDidMount() {
    let $el = document.querySelector('.overflow-y')
    helpers.refreshTouch($el)
  }
  render() {
    const {members, permission, projectDetail, delMember, setProjectSubAdminMember} = this.props
    let projectId = projectDetail.project_info.project_id

    let canEdit = helpers.checkPermission(consts.PERMISSION_TYPE.editUsers, projectId, permission)

    let isAdmin = helpers.checkPermission(consts.PERMISSION_TYPE.subadmin, projectId, permission)

    let isHome = this.props.isHome === 'true'

    return (
      <div className="project-members overflow-y js-scroll">
        <div className={"members-page"}>
            <div className="header-bar">
              <span className="title">总人数：{members.count || members.total}人</span>
              {canEdit
                ? <div className="header-actions" onClick={this.goToLink.bind(this, projectId)}>
                <a className="iconfont iconfont-add"></a>
              </div>
                : ''}
            </div>
          <div className="member-container">
            <ProjectMemberTo setProjectSubAdminMember={setProjectSubAdminMember}
                             projectInfo={projectDetail.project_info}
                             members={members}
                             delMember={delMember}
                             canEdit={!isHome && canEdit}
                             isHome={isHome}
                             isAdmin={isAdmin}/>
          </div>
        </div>
      </div>
    )
  }

}
