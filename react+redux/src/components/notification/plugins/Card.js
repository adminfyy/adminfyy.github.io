import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import * as consts from 'constants/const'

export default class Card extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     carddata: props.carddata
  //   }
  // }


  render() {
    const {carddata} = this.props
    if(!carddata.is_sent){
      let currentTime = new Date()
      let sentTime = new Date(carddata.sent_time)
      this.changeData(sentTime.getTime() - currentTime.getTime())
    }
    let stateText = carddata.is_checked ? '' : consts.UNREAD
    stateText = !carddata.is_sent ? '未发送' : stateText
    let stateCSS = carddata.is_checked ? 'read' : 'unread'
    let isMe = helpers.getUid().toString() === carddata.send_uid
    let isReplyAmountShow = this.getReplyAmountShow(isMe, carddata)
    let isCheckAmountShow = isMe && +carddata.sent_time_type === 0 || isMe && +carddata.sent_time_type === 1 && carddata.is_sent
    let name = isMe ? '我' : carddata.name
    let content = carddata.notification_content
    return (
      <div className="notify-card" onClick={this.handleCardClick.bind(this)}>
        <div className="notify-baseline"></div>
          <div className={`card-status-point ${stateCSS}`}></div>
        <div className="card-content fr">
          <div className="notify-row">
            <img className="avatar" src={helpers.avatar(carddata.send_uid)} onError={helpers.onError.bind(this, consts.DEFAUT_USER)} />
            <div className="info">
              <div className={`name ${isMe ? 'me' : ''}`}>{name || carddata.send_uid} </div>
              <div className="time">{`${helpers.dateTime(carddata.sent_time, 'yyyy/MM/dd hh:mm')}`}</div>
            </div>
            <div className={`fr state-text ${stateCSS}`}>{stateText}</div>
          </div>
          <div className="notify-row">
            <div className="notify-content" >
              <div className="content" >{content}</div>
            </div>
          </div>
          <div className={`notify-row ${(isReplyAmountShow && isCheckAmountShow) ? '' : 'hidden'}`}>
            <div className={`reply_amount fl ${isReplyAmountShow ? '' : 'hidden'}`}>
              共有<span className="digits">{carddata.reply_amount}</span>条回复
              <div className={`unread_red_spot ${carddata.unread_reply_num > 0 ? '' : 'hidden'}`}>
              </div>
            </div>
            <div className={`checked_number fr${isCheckAmountShow ? '' : ' hidden'}`}>共有<span className="digits">{`${carddata.checked_number}/${carddata.receiver_amount}`}</span>已确认</div>
          </div>
        </div>
      </div>
    )
  }

    changeData(time = 5000){
      let that = this
      setTimeout(() => {
        if(that){
          that.props.updateNotification({
            ...that.props.carddata,
            'is_sent': true
          }, that.props.index)
        }
      }, time)
    }

    handleCardClick(){
      const {carddata, updateNotification} = this.props
      updateNotification({
        ...carddata,
        'is_checked': 1,
        'unread_reply_num': 0
      }, this.props.index)
      helpers.goPage(`/project/${carddata.project_id}/notifications/${carddata.notification_id}`)
    }
    getReplyAmountShow(isMe, carddata){
      if(!isMe && carddata.is_checked && carddata.reply_amount > 0 ||
      isMe && +carddata.sent_time_type === 0 && carddata.reply_amount > 0 ||
      isMe && +carddata.sent_time_type === 1 && carddata.is_sent && carddata.reply_amount > 0){
        return true
      } else {
        return false
      }
    }
}
