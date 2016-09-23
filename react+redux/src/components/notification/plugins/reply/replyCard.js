// 通知详情页面上的回复列表
import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import * as consts from 'constants/const'

export default class extends Component {
  // componentDidMount(){
  //   let that = this
  //   setTimeout(helpers.Scroll({fnCallback: that.props.onUpload}, 44), 100)
  // }
  render(){
    const { data, notificationDetail } = this.props
    if(data.reply_uid === helpers.getUid().toString()){
      data.name = '我'
    }
    return (
      <div className="reply-card">
        <div className="reply-row">
          <img className="avatar fl" src={helpers.avatar(data.reply_uid)} onError={helpers.onError.bind(this, consts.DEFAUT_USER)} />
          <div className="info fl">{data.name || data.reply_uid}<span className="light">回复</span>{notificationDetail.send_uname}</div>
          <div className="time fr">{`${helpers.dateTime(data.reply_time, 'yyyy/MM/dd hh:mm')}`}</div>
       </div>
        <div className="reply-row">
          <div className="send-content-bg">
            <div className="send-content">{data.reply_content}</div>
          </div>
        </div>
      </div>
    )
  }
}
