// ProjectVersionCard.js
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import { consts } from 'constants'
import * as helpers from '../../utils/helpers'
import utils from 'utils'

@connect(state => ({}), actionCreators)
export default
class ProjectVersionCard extends Component {
  render() {
    const {projectVersionDetail, projectId, rows, isActionHide} = this.props

    if (!projectVersionDetail) {
      return (
        <div className="page-loading"></div>
      )
    } else {
      let versionId = projectVersionDetail.project_version_id
      let status = +projectVersionDetail.version_application_status
      let statusTxt = status === consts.WAITING ? '待确认' : (status === consts.CHECKING ? '确认中' : '已确认')
      let statusCss = status === consts.WAITING ? 'm-waiting' : (status === consts.CHECKING ? 'm-checking' : 'm-checked')
      let beginTime = projectVersionDetail.schedule_begin_time
      let endTime = projectVersionDetail.schedule_end_time
      let applyId = projectVersionDetail.apply_operate_id
      let isUnreviewed = projectVersionDetail.is_unreviewed

      // 两行式  里程碑卡片
      if (rows === 2) {
        return (
          <div className={'list-table ' + statusCss} onClick={this.handleLinkClick.bind(this, status)}
               ref="panelContent">
            <div className="list-row">
              <div className="list-cell m-tag">
                <div className="list-line"></div>
                <div className="m-img-status"></div>
              </div>
              <div className="list-cell list-first">
                <div className="m-title">
                  {projectVersionDetail.version_title}
                </div>
                <div className="m-status">
                  {statusTxt}
                </div>
              </div>
            </div>
            <div className="list-row">
              <div className="list-cell m-tag">
                <div className="list-line"></div>
              </div>
              <div className="list-cell list-border">
                <div className="m-num">
                  编号：{projectVersionDetail.version_code}
                </div>
                <div className="m-date">
                  { isActionHide ? ''
                   : status === consts.UNACTIVE
                    ? <a className="m-calendar">
                        {helpers.dateTime(beginTime).format(consts.DATE_FORMAT) + '-' + helpers.dateTime(endTime).format(consts.DATE_FORMAT)}
                      </a>
                      : status === consts.WAITING
                      ? <span onClick={this.stopProgate.bind(this)}>
                        <span className="btn-sure"
                              onClick={this.onStartConfirm.bind(this, projectVersionDetail.total_task_count)}>发起确认</span>
                      </span>
                      : <span onClick={this.stopProgate.bind(this)}>
                      { isUnreviewed && applyId !== 0 &&
                      <span className="btn-sure" style={{marginRight: '10px'}}
                            onClick={this.onConfirm.bind(this)}>确认</span>
                      }
                      <span className="btn-check see-gress" onClick={this.stopProgate.bind(this)}>
                        <Link className="btn-click" onClick={(e) => helpers.goPage(`project/${projectId}/versionvalid/${versionId}/apply/${applyId}`)
                        }>查看进度</Link>
                      </span>
                      </span>
                  }
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        // orginal column  一行式  里程碑卡片
        return (
          <div className={'list-table m-done'} onClick={this.handleLinkClick.bind(this)} ref="panelContent">
            <div className="list-row">
              <div className="list-cell m-tag">
                <div className="list-line"></div>
                <div className="m-status-done"></div>
              </div>
              <div className="list-cell m-done">
                <div className="m-title">
                  {projectVersionDetail.version_title}
                </div>
                <div className="m-status">
                  编号：{projectVersionDetail.version_code}
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
  }

  /**
   * [onConfirm 里程碑确认]
   * @method onConfirm
   */
  onConfirm() {
    const { projectVersionDetail, projectId } = this.props
    let versionId = projectVersionDetail.project_version_id
    let applyId = projectVersionDetail.apply_operate_id
    const url = `/project/${projectId}/version/${versionId}/apply/${applyId}/review`
    helpers.goPage(url)
  }

  /**
   * [onStartConfirm 里程碑发起确认]
   * @method onStartConfirm
   * @param  {[type]}       totalTaskCount [里程碑的文档数量]
   * @param  {[type]}       e              [description]
   * @return {[type]}                      [description]
   */
  onStartConfirm(totalTaskCount, e) {
    let { projectVersionDetail, projectId, postVersionApply, curTabMore, permission } = this.props
    let that = this
    let options = {
      projectId: projectId,
      versionId: projectVersionDetail.project_version_id
    }

    let isCreateOrVC = utils.isCreatorOrVC(projectVersionDetail.creator_uid, projectVersionDetail.project_id, permission)

    if (!totalTaskCount) {
      if (isCreateOrVC) {
        // 里程碑创建人，vp，ceo才能显示“添加文档”，因为添加文档是跳转到编辑页面
        window.dialog.setOptions({
          visible: true,
          label: '该里程碑内没有文档，请补全文档后操作！',
          noAction: false,
          cancelLabel: '知道了',
          confirmLabel: '添加文档',
          actionHandler: function () {
            const url = '/project/' + projectId + '/milestone/' + projectVersionDetail.project_version_id + '/edit/1'
            helpers.goPage(url)
          }
        })
      } else {
        window.dialog.setOptions({
          visible: true,
          label: '该里程碑内没有文档，请补全文档后操作！',
          noAction: true,
          confirmLabel: '我知道了'
        })
      }
    } else {
      window.dialog.setOptions({
        visible: true,
        title: '',
        label: '将会发起里程碑确认申请，请确定操作!',
        noAction: false,
        actionHandler: function () {
          postVersionApply(options, function (data) {
            window.toast.setTxt('操作成功')
            projectVersionDetail['version_application_status'] = data.version_application_status
            projectVersionDetail['apply_operate_id'] = data.apply_operate_id
            that.props.fetchProjectVersions({
              projectId: projectId,
              versionTimeType: consts.Milestone.cur,
              isSearch: true,
              $limit: 3,
              $offset: 0
            })
            that.props.fetchProjectVersions({
              projectId: projectId,
              versionTimeType: consts.Milestone.undo,
              isSearch: true,
              $limit: 3,
              $offset: 0
            })
            if (curTabMore) {
              that.props.fetchProjectVersions({
                projectId: projectId,
                versionTimeType: consts.Milestone.undo,
                isSearch: true,
                $limit: 10,
                $offset: 0
              })
            } else {
              that.props.fetchProjectVersions({
                projectId: projectId,
                versionTimeType: consts.Milestone.done,
                isSearch: true,
                $limit: 3,
                $offset: 0
              })
            }
            that.forceUpdate()
          })
        }
      })
    }
    e && e.stopPropagation()
  }

  handleLinkClick(status) {
    const that = this
    const { projectVersionDetail, projectId, projectDetail, curTabMore } = this.props
    let projectStatus = projectDetail.project_info.status
    let versionId = projectVersionDetail.project_version_id
    let node = this.refs.panelContent.getDOMNode()
    const url = '/project/' + projectId + '/version/' + versionId + '/detail/status/' + projectStatus
    node.classList.add('active')
    if (status === consts.WAITING) {
      let options = {
        projectId: projectId,
        versionId: versionId
      }
      this.props.fetchProjectVersionDetail(options, function (data) {
        if (data.project_version_id) {
          helpers.goPage(url)
        } else {
          if (curTabMore) {
            that.props.fetchProjectVersions({
              projectId: projectId,
              versionTimeType: consts.Milestone.undo,
              isSearch: true,
              $limit: 10,
              $offset: 0
            }, function () {
              let $scroll = document.querySelector('.js-scroll')
              $scroll.scrollTop = 0
            })
          } else {
            that.props.fetchProjectVersions({
              projectId: projectId,
              versionTimeType: consts.Milestone.undo,
              isSearch: true,
              $limit: 3,
              $offset: 0
            })
          }
          node.classList.remove('active')
        }
      })
    } else {
      helpers.goPage(url)
    }
  }

  stopProgate(event) {
    event && event.stopPropagation()
  }

}
