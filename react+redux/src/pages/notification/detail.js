import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import Header from 'components/widget/header/version'
import Detail from 'components/notification/detail'
import ReplyList from 'components/notification/plugins/reply/replyList'
import Reply from 'components/notification/plugins/reply/reply'
import {ScrollResize, Scroll} from 'utils/helpers'
import * as helpers from 'utils/helpers'
@connect(state => ({
  projectInfo: state.h5ProjectInfo,
  notificationDetail: state.notificationDetail,
  reply: state.reply
}), actionCreators)

export default class ProjectReportPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      projectId: this.props.params.pid,
      noticeId: this.props.params.nid
    }
  }
  componentDidMount() {
    const that = this
    let callback = function(){
      const options = {
        projectId: that.props.params.pid,
        noticeId: that.props.params.nid
      }
      that.props.fetchH5ProjectInfo(options)
      that.props.getNotificationDetail(options)
      that.props.getNotificationReply(options)
    }
    callback && callback()
    helpers.refresh(function(){
      that.props.cleanNotificationReply()
      callback()
      let $el = document.querySelector('.js-scroll')
      if($el){
      	$el.classList.remove('data-scroll')
      }
    })
  }
  componentWillUnmount(){
    this.props.cleanNotificationReply()
  }

  render() {
    const {notificationDetail, projectInfo, reply} = this.props
    const replyShow = +notificationDetail.is_sent === 1

    if (notificationDetail.notification_id) {
      return (
        <div className="project-weekly-report">
          <Header
            projectTitle="通知提醒详情"
            projectInfo={projectInfo}
            {...this.props}
          />
        <div className="js-scroll"
          onLoad={ScrollResize(44)}
          onScroll={this.scrollForLoad.bind(this)}>
          <Detail
            notificationDetail={notificationDetail}
            reply={reply}
          />
          <ReplyList {...this.props}/>
        </div>
        <Reply {...this.props} replyShow={replyShow}/>
      </div>
      )
    } else {
      return (
        <div className="page-loading"></div>
      )
    }
  }

    getNextQuery(query, data){
      return {
        ...query,
        $offset: data.items.length
      }
    }

    onUpload(){
      const {getNotificationReply, reply} = this.props
      let Querys = this.state
      let nextInfo = this.getNextQuery(Querys, reply)
      let $loading = document.querySelector('.js-scroll-loading')
      let $el = document.querySelector('.js-scroll')
      if ($loading.classList.contains('data-short')) return
      $loading.classList.remove('data-more')
      $loading.classList.add('data-loading')
      setTimeout(function () {
        getNotificationReply(nextInfo, function (data) {
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

  scrollForLoad(){
    Scroll({fnCallback: this.onUpload.bind(this)})
  }
}
