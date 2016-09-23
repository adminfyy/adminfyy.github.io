import React, { Component } from 'react'
import SubscribeButton from 'components/widget/button/SubscribeButton'
import * as helpers from 'utils/helpers'
import { consts } from 'constants'
import utils from 'utils'

export default class ProjectInfo extends Component {

  render() {
    const {isMilestone} = this.props

    let projectDetail = this.props.projectDetail
    let projectInfo = projectDetail.project_info
    let iconDentryId = projectDetail.project_info.icon_dentry_id

    return (
      <div className="project-info-wrap">
        <div className="project-logo" onClick={this.selectPhotoAndUpload.bind(this)}>
          <img src={helpers.getProjectIcon(iconDentryId)} onError={helpers.onError.bind(this, consts.DEFAULT_PROJECT)}/>
        </div>
        <div className="detail">
          <div className="project-name">{projectInfo.name}</div>
          <div className="project-item">
            负责人：{projectDetail && projectDetail.users && projectDetail.users.items[0] && projectDetail.users.items[0].org_exinfo.real_name}
          </div>
        </div>
        {isMilestone &&
        <div className="follow-container follow-project-info" onClick={this.handleClick.bind(this)}>
          <div className="sub-btn-follow">
            <div className="row-action off">
              项目详情
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
  handleClick(){
    const { projectDetail } = this.props
    let url = `/menu/4/project/${projectDetail.project_info.project_id}`
    helpers.goPage(url)
  }
  selectPhotoAndUpload(){
    const { isIconEditable, projectDetail } = this.props
    if(!isIconEditable){ return }
    utils.cutPhoto(
      (photo) => {
        helpers.getNetWork((netWorkCondition) => {
          if(!netWorkCondition){
            window.toast.setTxt('网络异常，请检查您的网络')
            return
          }
          this.props.fetchCSSession({path: projectDetail.project_info.project_id}, (session) => {
            utils.UploadPhoto(photo.file, session, projectDetail, (msg) => {
              this.props.updateProjectVision(
                {projectId: projectDetail.project_info.project_id, 'data': {'icon_dentry_id': msg.dentry_id || msg.path || 'undefined'}}
                , (res) => {
                  window.toast.setTxt('上传成功')
                  this.props.updateProjectDetail(res.body)
                  this.props.updateProjectInfo(res.body)
                  // this.props.updateSearchProjectInfo(res.body)
                  // this.props.updateSubProjectInfo(res.body)
                  // this.props.updateNormalProjectInfo(res.body)
                  // this.props.updateWarnProjectInfo(res.body)
                  // this.props.updateErrorProjectInfo(res.body)
                })
            })
          })
        })
      }
  )
  }
}
