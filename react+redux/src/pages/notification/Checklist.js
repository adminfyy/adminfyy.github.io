import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import VersionHeader from 'components/widget/header/version'
import NoticeChecklist from 'components/notification/NoticeChecklist'
import * as consts from 'constants/const'
import * as helpers from 'utils/helpers'
@connect(state => ({
  noticeChecklist: state.noticeChecklist,
  checkNum: state.checkNum,
  projectDetail: state.projectDetail
}), actionCreators)
export default class NoticeChecklistPage extends Component {
  constructor(props){
    super(props)
    this.checkNum = {
      projectId: this.props.params.pid,
      notificationId: this.props.params.nid
    }
    this.state = {
      $limit: consts.PAGE_SIZE,
      $count: true,
      $orderby: 'is_checked ASC and checked_time DESC',
      projectId: this.props.params.pid,
      notificationId: this.props.params.nid
    }
  }
  componentDidMount() {
    this.props.fecthNoticeChecklist({...this.state}, null, true)
    this.props.fecthNoticeCheckNum({...this.checkNum})
    this.props.fetchProjectDetail(this.props.params.pid)
    helpers.refresh()
  }
  componentWillUnmount() {
    this.props.cleanNoticeChecklist()
  }
  render(){
    const {noticeChecklist, checkNum, projectDetail} = this.props
    let projectHeaderArguments = {
      projectTitle: '消息确认详情',
      projectInfo: projectDetail.project_info
    }

    if (!noticeChecklist.page || !checkNum.receiver_amount) {
      return (
        <div>
          <div className="page-loading"></div>
        </div>
      )
    } else {
      return (
        <div className="checklist-wrap">
          <VersionHeader {...projectHeaderArguments} {...this.props}/>
          <NoticeChecklist {...this.props}
            onUpload={this.onUpload.bind(this)}
            data={noticeChecklist}/>
        </div>
      )
    }
  }

  getNextQuery(query, noticeChecklist){
    return {
      ...query,
      $offset: noticeChecklist.items.length
    }
  }

  onUpload(){
    const {fecthNoticeChecklist, noticeChecklist} = this.props
    let Querys = {...this.state}
    let nextInfo = this.getNextQuery(Querys, noticeChecklist)
    let $loading = document.querySelector('.js-scroll-loading')
    let $el = document.querySelector('.js-scroll')
    if ($loading.classList.contains('data-short')) return
    $loading.classList.remove('data-more')
    $loading.classList.add('data-loading')
    setTimeout(function () {
      fecthNoticeChecklist(nextInfo, function (data) {
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
