import React, { Component } from 'react'
import { connect } from 'react-redux'
import VersionHeader from 'components/widget/header/version'
import ProjectVersion from 'components/version/ProjectVersion'
import ProjectVersionButton from 'components/version/ProjectVersionButton'
import VersionHistory from 'components/version/ProjectVersionHistory'
import {ScrollResize} from 'utils/helpers'
import { consts } from 'constants'
import * as actionCreators from 'actions'
import utils from 'utils'
import * as helpers from 'utils/helpers'
@connect(state => ({
  applyHistory: state.applyHistory,
  roles: state.roles,
  projectVersionDetail: state.projectVersionDetail,
  projectDetail: state.projectDetail
}), actionCreators)
export default class ProjectVersionDetail extends Component {
  componentWillUnmount(){
    this.props.clearProjectVersionDetail()
  }
  componentDidMount() {
    // 请求项目的版本详细页
    let options = {
      projectId: this.props.params.pid,
      versionId: this.props.params.vid
    }
    this.props.fetchUCUserRoles()
    if (+this.props.params.vid){
      this.props.clearApplyHistory()
      this.props.fetchProjectVersionDetail(options)
      this.props.fetchApplyHistory(options)
    }
    helpers.refresh()
  }
  componentDidUpdate () {
    let $el = document.querySelector('.js-scroll')
    helpers.refreshTouch($el)
  }
  render() {
    let {projectVersionDetail, roles, applyHistory} = this.props
    let projectStatus = this.props.params.type
    // let { creator_uid } = versionDetail
    let status = +projectVersionDetail.version_application_status
    let rolePermisson = false

    // 里程碑创建者 /vp/ceo均可编辑里程碑
    if (utils.isCreatorOrVC(projectVersionDetail.creator_uid, projectVersionDetail.project_id, roles)) {
      rolePermisson = true
    }
    // 待确认以及权限许可 才可编辑/删除 里程碑
    let isButtonShow = (status === consts.WAITING && (rolePermisson || !projectVersionDetail.isCreatorInProject))
    if (!+this.props.params.vid) {
      projectVersionDetail = {
        'project_id': this.props.params.pid,
        'project_version_id': 0
      }
    }
    if (projectVersionDetail && projectVersionDetail.project_id) {
      return (
       <div className="project-page">
          <VersionHeader projectVersionDetail={projectVersionDetail}
                         projectTitle={'里程碑详情'} projectStatus={projectStatus} {...this.props}
                         backUrl={`/menu/2/versions/${this.props.params.pid}`}/>
          <div className="panel-group  scroll-css version-detail js-scroll" onLoad={ScrollResize()}>
             <ProjectVersion versionDetail={ projectVersionDetail }
               projectStatus={projectStatus}
               permission={roles}
               {...this.props}
             />
             {applyHistory.applyList && applyHistory.applyList.length > 0 &&
             <VersionHistory
             items={applyHistory.applyList}
             projectId={projectVersionDetail.project_id}
             versionId={projectVersionDetail.project_version_id}
             />}
          </div>
          {isButtonShow && <ProjectVersionButton versionDetail={ projectVersionDetail } {...this.props}/>}
        </div>
      )
    } else {
      return (
        <div className="page-loading"></div>
      )
    }
  }
}


// <Link className="suspended" to={`versions/${this.props.params.id}`}>返回</Link>
