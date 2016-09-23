import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import * as actionCreators from 'actions'
import DashBoardHeader from 'components/dashboard/DashBoardHeader'
import DashBoardItems from 'components/dashboard/DashBoardItems'
import utils from 'utils'
import * as helpers from 'utils/helpers'
@connect(state => ({
  roles: state.roles,
  projectDetail: state.projectDetail,
  unread: state.unread
}), actionCreators)
export default class DashBoard extends Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    let projectId = this.props.params.id

    this.props.fetchUCUserRoles()
    this.flag = true
    this.props.fetchNoticeUnreadCount(projectId)
    this.props.cleanNotifications()
    this.props.modifyNotifyListScrollTop(0)
    helpers.refresh()
  }

  /*  <Link className="suspended" to={`/project/${this.props.params.id}`}>返回</Link>*/
  render() {
    const {roles, unread} = this.props
    const {project} = this.state
    let that = this
    if (!this.flag) {
      this.props.fetchProjectDetail(this.props.params.id, function (data) {
        that.setState({
          project: data
        })
      })
    }

    if (!project || !project.project_info) {
      return (
        <div>
          <div className="page-loading"></div>

        </div>

      )
    }
    utils.setStorage('memberListBackUrl', '/menu/1/project/' + this.props.params.id + '/dashboard')

    return (
      <div className="dashboard-page js-scroll" onLoad={(e) => {
        helpers.refreshTouch(document.querySelector('.js-scroll'))
        helpers.ScrollResize(55)
      }}>
        <DashBoardHeader {...this.props} projectDetail={project} />
        <DashBoardItems projectDetail={project.project_info} permission={roles} unread={unread} />
      </div>
    )
  }
}
