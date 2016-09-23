// 通知详情页面上的底部的回复输入框
import React, { Component } from 'react'
import * as helpers from 'utils/helpers'

export default class extends Component {
  render(){
    const {replyShow} = this.props
    return (
      <div className={`reply-input-container ${ replyShow ? '' : 'hidden'}`}>
        <div className="reply-input">
          <textarea required maxLength="200" rows="1"
            onChange={this.validate.bind(this)}
            onCut={this.delayResize.bind(this)}
            onPaste={this.delayResize.bind(this)}
            onDrop={this.delayResize.bind(this)}
            onKeydown={this.delayResize.bind(this)}
            type="text" placeholder="请输入回复内容" ref="reply"/>
        </div>
        <div ref="commit" className="commit disabled" onClick={this.handleClick.bind(this)}>提交</div>
      </div>
    )
  }

  handleClick(){
    const that = this
    const {postReply, notificationDetail} = this.props
    let inputDiv = this.refs.reply.getDOMNode()
    let commitBtn = this.refs.commit.getDOMNode()
    let options = {
      'reply_content': inputDiv.value,
      projectId: notificationDetail.project_id,
      noticeId: notificationDetail.notification_id
    }
    commitBtn.classList.add('disabled')
    setTimeout(function() {
      postReply(options, (data) => {
        that.smaller()
        inputDiv.value = ''
        helpers.backToTop(true, () => (setTimeout(() => (window.toast.setTxt('回复成功')), 700)))
      })
    }, 300)
  }
  smaller(){
    let inputDiv = this.refs.reply.getDOMNode()
    helpers.ScrollResize(44)
    inputDiv.style.height = 15 + 'px'
  }
  autoResizeInput(){
    let inputDiv = this.refs.reply.getDOMNode()
    let scrollHeight = inputDiv.scrollHeight
    inputDiv.style.height = 'auto'
    inputDiv.style.height = inputDiv.scrollHeight + 'px'
    helpers.ScrollResize(scrollHeight < 61 ? scrollHeight + 29 : 60 + 29)
  }
  delayResize(){
    setTimeout(this.autoResizeInput, 0)
  }

  validate(){
    let inputDiv = this.refs.reply.getDOMNode()
    let commitBtn = this.refs.commit.getDOMNode()
    if(/\S/g.test(inputDiv.value)){
      if(commitBtn.classList.contains('disabled')){
        commitBtn.classList.remove('disabled')
      }
    } else {
      commitBtn.classList.add('disabled')
    }
    this.autoResizeInput()
  }
}
