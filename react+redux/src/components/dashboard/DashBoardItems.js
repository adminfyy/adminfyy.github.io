import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import * as actionCreators from 'actions'
import * as helpers from '../../utils/helpers'
import { consts } from 'constants'
import ConfirmDialog from '../widget/dialog/ConfirmDialog'
import {mobile} from 'nd-browser'


@connect(state => ({
  forumUser: state.forumUser,
  groupUser: state.groupUser
}), actionCreators)
export default
class DashBoardItems extends Component {
  constructor(props) {
    super()
    let {projectDetail} = props

    this.state = {
      isShow: false,
      title: null,
      label: null,
      noAction: false,
      actionHandler: null,
      'project_id': projectDetail.project_id,
      'im_group_id': projectDetail.im_group_id,
      'forum_id': projectDetail.forum_id
    }
  }

  componentWillUnmount() {
    const {clearGroupUser, clearForumUser} = this.props
    clearGroupUser()
    clearForumUser()
  }
  componentWillMount() {
    let uid = helpers.getUid()
    this.setState({
      uid: uid
    })
  }

  render() {
    const {permission, unread} = this.props

    let projectId = this.state.project_id
    let groupId = this.state.im_group_id
    let forumId = this.state.forum_id
    let uid = this.state.uid
    let canEdit = helpers.checkPermission(consts.PERMISSION_TYPE.editable, projectId, permission)
    // 项目负责人，开发子负责人，策划自负责人可以创建群
    let isAdmin = helpers.checkPermission(14, projectId, permission)
    // 项目负责人
    let isProjectAdmin = helpers.checkPermission(consts.PERMISSION_TYPE.subadmin, projectId, permission)
    let count = unread.unread_notification_count + unread.unread_reply_count

    return (
      <div className="dashboard-items">

        <Link onClick={(e) => helpers.goPage(`project/${projectId}/members`)}>
          <div className="dashboard-item">
            <div className="members border blue-item">
            </div>
          </div>
        </Link>

      {mobile && <div className="dashboard-item">
          <div className="group border green-item"
               onClick={this.handleClick.bind(this, consts.GROUP, groupId, canEdit, isAdmin, isProjectAdmin, helpers.imStr(consts.GROUP, groupId, uid))}>
          </div>
        </div>}

        {mobile && <div className="dashboard-item">
          <div className="cloud-disk border yellow-item"
               onClick={this.handleClick.bind(this, consts.SHARE, groupId, canEdit, isAdmin, isProjectAdmin, helpers.imStr(consts.SHARE, groupId))}>
          </div>
        </div>}

        {mobile && <div className="dashboard-item">
          <div className="forum border pink-item"
               onClick={this.handleClick.bind(this, consts.FORUM, forumId, canEdit, isAdmin, isProjectAdmin, helpers.imStr(consts.FORUM, forumId))}>
          </div>
        </div>}

        {mobile && <div className="dashboard-item">
          <div className="forum border todo-item"
               onClick={this.handleClick.bind(this, consts.TODO, forumId, canEdit, isAdmin, isProjectAdmin, helpers.imStr(consts.TODO))}>
          </div>
        </div>}

        {mobile && <div className="dashboard-item">
          <div className="forum border video-item"
               onClick={this.handleClick.bind(this, consts.VIDEO, groupId, canEdit, isAdmin, isProjectAdmin, helpers.imStr(consts.VIDEO, groupId))}>
          </div>
        </div>}

        <div className="dashboard-item">
          <div className={count > 0 ? 'notice border notice-item' : 'border notice-item'}
               onClick={this.handleClick.bind(this, consts.NOTICE)}>
          </div>
        </div>


        <ConfirmDialog ref="dialog"/>
      </div>
    )
  }

  destoryDialog() {
    this.setState({
      isShow: false
    })
  }

  // 创建群聊、论坛
  create(type) {
    let that = this
    const { projectDetail, createGroup, createForum, recieveGroupUser, recieveForumUser } = this.props
    const {uid} = this.state
    if (type === consts.GROUP || type === consts.SHARE || type === consts.VIDEO) {
      // 群聊
      createGroup({
        projectId: projectDetail.project_id
      }, function (data) {
        let option = {'im_group_id': data.im_group_id}
        that.setState(option)
        recieveGroupUser(option)

        setTimeout(function () {
          let url

          if (type === consts.VIDEO) {
            url = helpers.imStr(consts.VIDEO, data.im_group_id)
          } else if (type === consts.GROUP) {
            url = helpers.imStr(consts.GROUP, data.im_group_id, uid)
          } else if (type === consts.SHARE) {
            url = helpers.imStr(consts.SHARE, data.im_group_id)
          }

          if (typeof Bridge !== 'undefined') {
            helpers.gotoPageLink(url)
          } else {
            window.location.href = url
          }
        }, 500)
      })
    }
    if (type === consts.FORUM) {
      // 论坛
      createForum({
        projectId: projectDetail.project_id
      }, function (data) {
        let option = {
          'forum_id': data.forum_id
        }
        that.setState(option)
        recieveForumUser(option)
        setTimeout(function () {
          let url = helpers.imStr(consts.FORUM, data.forum_id)
          if (typeof Bridge !== 'undefined') {
            helpers.gotoPageLink(url)
          } else {
            window.location.href = url
          }
        }, 500)
      })
    }
  }

  // 加入群聊、订阅论坛
  join(type) {
    const { projectDetail, joinGroup, joinForum, recieveGroupUser, recieveForumUser } = this.props
    const {uid} = this.state
    if (type === consts.GROUP || type === consts.SHARE || type === consts.VIDEO) {
      // 群聊
      joinGroup({
        projectId: projectDetail.project_id
      }, function (data) {
        recieveGroupUser({
          'im_group_id': data.im_group_id
        })

        setTimeout(function () {
          let url

          if (type === consts.VIDEO) {
            url = helpers.imStr(consts.VIDEO, data.im_group_id)
          } else if (type === consts.GROUP) {
            url = helpers.imStr(consts.GROUP, data.im_group_id, uid)
          } else if (type === consts.SHARE) {
            url = helpers.imStr(consts.SHARE, data.im_group_id)
          }

          if (typeof Bridge !== 'undefined') {
            helpers.gotoPageLink(url)
          } else {
            window.location.href = url
          }
        }, 500)
      })
    }
    if (type === consts.FORUM) {
      // 论坛
      joinForum({
        projectId: projectDetail.project_id
      }, function (data) {
        recieveForumUser({
          'forum_id': data.forum_id
        })
        setTimeout(function () {
          let url = helpers.imStr(consts.FORUM, data.forum_id)
          if (typeof Bridge !== 'undefined') {
            helpers.gotoPageLink(url)
          } else {
            window.location.href = url
          }
        }, 500)
      })
    }
  }


  /**
   * [handleClick 实时获取项目群组，论坛id，防止群组，论坛为空]
   * @method handleClick
   * @param  {[type]}    type      [description]
   * @param  {[type]}    ids1      [description]
   * @param  {[type]}    canEdit   [description]
   * @param  {Boolean}   isAdmin   [项目负责人，开发子负责人，策划自负责人]
   * @param  {Boolean}   isProjectAdmin   [项目负责人]
   * @param  {[type]}    actionUrl [description]
   * @return {[type]}              [description]
   */
  handleClick(type, ids1, canEdit, isAdmin, isProjectAdmin, actionUrl) {
    const {projectDetail, checkGroupUser, checkForumUser} = this.props
    let id
    let that = this

    if (type === consts.TODO) {
      if (typeof Bridge !== 'undefined') {
        helpers.gotoPageLink(actionUrl)
      } else {
        window.location.href = actionUrl
      }
    } else if (type === consts.NOTICE) {
      let projectId = projectDetail.project_id
      helpers.goPage(`/project/${projectId}/notificationList`)
    } else {
      this.props.fetchProjectDetail(projectDetail.project_id, function (data) {
        let project = data.project_info
        if (type === consts.GROUP || type === consts.VIDEO || type === consts.SHARE) {
          id = project.im_group_id

          if (project && id) {
            checkGroupUser({
              groupId: id
            }, function () {
              that.handlePetch(type, id, canEdit, isAdmin, isProjectAdmin, actionUrl)
            })
          } else {
            that.handlePetch(type, id, canEdit, isAdmin, isProjectAdmin, actionUrl)
          }
        } else if (type === consts.FORUM) {
          id = project.forum_id
          if (project && id) {
            checkForumUser({
              forumId: id
            }, function () {
              that.handlePetch(type, id, canEdit, isAdmin, isProjectAdmin, actionUrl)
            })
          } else {
            that.handlePetch(type, id, canEdit, isAdmin, isProjectAdmin, actionUrl)
          }
        }
      })
    }
  }

  getUrl(url, id) {
    return url.replace(/\?(\w*)=(null|(\w*-?\w*)*|\w*)/, function (input, $1, $2) {
      return '?' + $1 + '=' + id
    })
  }

  /*
   if 群不存在 then
   管理员（项目负责人，开发子负责人，策划自负责人） 创建群(跳转)
   非管理员 提示请联系管理员
   else 群存在 then
   if 非项目负责人 then 提示是否加入群(跳转)
   else 直接跳转
   */
  handlePetch(type, id, canEdit, isAdmin, isProjectAdmin, actionUrl) {
    const {
      groupUser,
      forumUser
    } = this.props
    let isVPCEO = canEdit && isProjectAdmin && isAdmin

    if (id) {
      actionUrl = this.getUrl(actionUrl, id)
      if (!isProjectAdmin || isVPCEO) {
        // 弹出确认窗口 点击确定调用加入、订阅接口
        switch (type) {
          case consts.GROUP:
          case consts.SHARE:
          case consts.VIDEO:
            if (helpers.isEmpty(groupUser)) {
              window.dialog.setOptions({
                isShow: true,
                title: '加入群聊',
                label: '是否加入群聊?',
                actionHandler: this.join.bind(this, type),
                visible: true
              })
            } else if (typeof Bridge !== 'undefined') {
              helpers.gotoPageLink(actionUrl)
            } else {
              window.location.href = actionUrl
            }
            break
          case consts.FORUM:
            // role = 0 未订阅，role = 3 普通成员
            if (!forumUser.role) {
              window.dialog.setOptions({
                isShow: true,
                title: '订阅论坛',
                label: '是否订阅论坛?',
                actionHandler: this.join.bind(this, type),
                visible: true
              })
            } else if (typeof Bridge !== 'undefined') {
              helpers.gotoPageLink(actionUrl)
            } else {
              window.location.href = actionUrl
            }
            break
          default:
            break
        }
      } else if (typeof Bridge !== 'undefined') {
        // 项目负责人 直接跳转
        helpers.gotoPageLink(actionUrl)
      } else {
        window.location.href = actionUrl
      }
    } else {
      if (isAdmin) {
        // 显示 创建提示窗 点击确定调用创建接口
        switch (type) {
          case consts.GROUP:
          case consts.SHARE:
          case consts.VIDEO:
            window.dialog.setOptions({
              isShow: true,
              title: '创建群聊',
              label: '该项目的群还未创建，您是否需要创建?',
              actionHandler: this.create.bind(this, type),
              visible: true
            })
            break
          case consts.FORUM:
            window.dialog.setOptions({
              isShow: true,
              title: '创建论坛',
              label: '该项目的论坛还未创建，您是否需要创建?',
              actionHandler: this.create.bind(this, type),
              visible: true
            })
            break
          default:
            break
        }
      } else {
        switch (type) {
          case consts.GROUP:
          case consts.SHARE:
          case consts.VIDEO:
            window.dialog.setOptions({
              isShow: true,
              title: '提示',
              label: '该项目的群还未创建，请联系项目负责人创建!',
              noAction: true,
              visible: true
            })
            break
          case consts.FORUM:
            window.dialog.setOptions({
              isShow: true,
              title: '提示',
              label: '该项目的论坛还未创建，请联系项目负责人创建!',
              noAction: true,
              visible: true
            })
            break
          default:
            break
        }
      }
    }
  }
}
