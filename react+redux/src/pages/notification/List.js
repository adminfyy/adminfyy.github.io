import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import ProjectHeader from 'components/widget/header/version'
import Tab from 'components/widget/tab/default/index'
import ListContainer from 'components/notification/List'
import NotifyButton from 'components/notification/plugins/notifyButton'
import Header from 'components/notification/plugins/Header'
import * as consts from 'constants/const'
import * as helpers from 'utils/helpers'
@connect(state => ({
  notifications: state.notifications,
  misc: state.misc,
  projectDetail: state.projectDetail,
  roles: state.roles
}), actionCreators)
export default
class weeklyReportStatisticPage extends Component {
  constructor(props){
    super(props)
    this.tabDefault = {
      tabValue: [ '全部', '我发送的', '我接收的' ],
      isAverage: true,
      handleFunction: this.tabCallback.bind(this)
    }
    this.projectHeaderArguments = {
      projectTitle: '通知提醒',
      backUrl: `/menu/1/project/${props.params.pid}/dashboard`,
      hideInfo: true,
      backFunction: function(callback) {
        callback()
      }
    }
  }
  componentWillMount() {
    const that = this
    const {fetchProjectDetail, projectDetail, notifications} = this.props
    let callback = function(){
      if(typeof projectDetail.project_info === 'undefined'){
        fetchProjectDetail(that.props.params.pid)
      }
      if (typeof that.props.roles.items === 'undefined'){
        that.props.fetchUCUserRoles()
      }
      if(typeof notifications.items === 'undefined' || notifications.items.length === 0){
        that.props.fetchNotifications(
        {...that.setQuery(that.props.misc.filterNotify)}
        , null, true)
      }
    }
    callback && callback()
    helpers.refresh(function(){
      that.props.cleanNotifications()
      callback()
    })
  }
  render(){
    const { notifications, misc, projectDetail, unitSelectOptions, modifyNotifyListScrollTop, updateNotification } = this.props
    let projectName = projectDetail.project_info && projectDetail.project_info.name
    if(!projectName || !projectDetail.project_info){
      return <div className="page-loading"></div>
    }
    return (
      <div style={{position: 'relative', height: '100%'}}>
        <ProjectHeader {...this.projectHeaderArguments}/>
        <Tab options={{...this.tabDefault, isActive: misc.filterNotify}}/>
        <Header projectName={projectName}/>
        <ListContainer scrollTop={misc.scrollTopNotify} isActive={misc.filterNotify}
          modifyNotifyListScrollTop={modifyNotifyListScrollTop}
          updateNotification={updateNotification}
          onUpload={this.onUpload.bind(this)} data={notifications}/>
        <NotifyButton projectId={this.props.params.pid} unitSelectOptions={unitSelectOptions}/>
      </div>
    )
  }

  tabCallback(level){
    this.props.updateFilterNotify(level)
    this.props.modifyNotifyListScrollTop(0)
    this.props.cleanNotifications()
    let that = this
    setTimeout(() => (
    that.props.fetchNotifications({...that.setQuery(level)}, null, true)
  ), 150)
  }

  setQuery(level){
    return {
      type: this.setType(level),
      $orderby: this.setOrderby(level),
      projectId: this.props.params.pid,
      $limit: consts.PAGE_SIZE_MOBILE,
      $count: true
    }
  }
  setType(level){
    let typeStr = ''
    switch (level) {
      case 0:
        typeStr = 'all'
        break
      case 1:
        typeStr = 'my_sent'
        break
      case 2:
        typeStr = 'my_received'
        break
      default:
        typeStr = 'all'
        break
    }
    return typeStr
  }

  setOrderby(index){
    let OrderBy = ''
    switch (index) {
      case 0:
        OrderBy = 'is_checked asc and send_time desc'
        break
      case 1:
        OrderBy = 'sent_time desc'
        break
      case 2:
        OrderBy = 'is_checked asc and send_time desc'
        break
      default:
        OrderBy = 'is_checked asc and send_time desc'
        break
    }
    return OrderBy
  }

    getNextQuery(query, notifications){
      return {
        ...query,
        $offset: notifications.items.length
      }
    }

    onUpload(){
      const {fetchNotifications, notifications, misc} = this.props
      let Querys = {...this.setQuery(misc.filterNotify)}
      let nextInfo = this.getNextQuery(Querys, notifications)
      let $loading = document.querySelector('.js-scroll-loading')
      let $el = document.querySelector('.js-scroll')
      if ($loading.classList.contains('data-short')) return
      $loading.classList.remove('data-more')
      $loading.classList.add('data-loading')
      setTimeout(function () {
        fetchNotifications(nextInfo, function (data) {
          let list = data && data.items
          let len = list.length
          $loading.classList.remove('data-loading')
          $el.classList.remove('data-scroll')
          if (!len) {
            $loading.classList.add('data-short')
          }
        })
      }, 500)
    }

}
