// 通知详情页面上的详情内容
import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import * as utils from 'utils'
import * as consts from 'constants/const'

export default class extends Component {

  componentDidMount() {

  }

  render() {
    const {notificationDetail} = this.props
    const isSelf = +notificationDetail.send_uid === +utils.getToken().user_id
    const replyShow = +notificationDetail.is_sent === 1

    return (
      <div className="notify-detail">
        <div className="notify-send-info">
          <img className="avatar"
               src={helpers.avatar(notificationDetail.send_uid)}
               onError={helpers.onError.bind(this, consts.DEFAUT_USER)}/>
          <div className={`name ${isSelf ? 'self' : ''}`}>{isSelf ? '我' : (notificationDetail.send_uname || notificationDetail.send_uid)}</div>
          <div className="time">{`${helpers.dateTime(notificationDetail.sent_time, 'yyyy/MM/dd hh:mm')}`}</div>
        </div>
        <div className="notify-content">{notificationDetail.notification_content}</div>
        <div className={`notify-confirm-info ${replyShow ? '' : 'hidden'}`}>
          {isSelf &&
          <div className="notify-confirm-txt">
            已确认
            <span className="notify-confirm-count">
              {notificationDetail.checked_number}/{notificationDetail.receiver_amount}人
            </span>
          </div>
          }
          <div className="notify-confirm" onClick={this.goPage.bind(this)}>查看确认详情</div>
        </div>
      </div>
    )
  }

  goPage() {
    const {notificationDetail} = this.props
    helpers.goPage(`project/${notificationDetail.project_id}/notification/${notificationDetail.notification_id}/checklist`)
  }
}
