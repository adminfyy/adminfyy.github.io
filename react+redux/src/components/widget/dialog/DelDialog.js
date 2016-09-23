import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as
actionCreators
from
'actions'


@connect(state => ({}), actionCreators)
class dialogDialog extends Component {

  componentDidMount() {
    let that = this
    this.setMaskHeight()
    window.addEventListener('scroll', function(){
      that.setMaskHeight()
    })
  }

  componentWillUnmount() {
    const that = this
    window.removeEventListener('scroll', function(){
      that.setMaskHeight()
    })
  }

  render() {
    const {duty, name, uid} = this.props

    return (
      <div>
      <div className="dialog-mark" data-role="dialogMark" ref="dialogMark"></div>
      <div className="dialog-confirm" ref="dialogConfirm">

        <div className="dialog-confirm-content" data-role="content">

          <div className="dialog-confirm-head" data-role="head">
            <div className="dialog-confirm-title" data-role="title">提示</div>
          </div>

          <div className="dialog-confirm-main" data-role="main">
            <div className="dialog-confirm-message" data-role="message">确定删除当前为
              <span className="dialog-confirm-txt">{duty}角色</span>
              的
              <span className="dialog-confirm-txt">{name || uid}</span>
              同学吗？</div>
          </div>

          <div className="dialog-confirm-foot" data-role="foot">

            <div className="dialog-confirm-confirm-box dialog-confirm-action" data-role="confirm">
              <button onClick={this.delHandler.bind(this)}>确定</button>

            </div>

            <div className="dialog-confirm-cancel-box dialog-confirm-action" data-role="cancel">
              <button onClick={this.cancelHandler.bind(this)}>取消</button>
            </div>

          </div>

        </div>
      </div>
      </div>
    )
  }

  delHandler() {
    const {projectId, delMember, uid, destoryDialog, delProjectMembers} = this.props

    function callback(){
      delProjectMembers([ uid ])
      destoryDialog()
    }

    delMember({projectId: projectId, uid: uid}, callback, callback)
  }

  cancelHandler(){
    const {destoryDialog} = this.props
    destoryDialog()
  }

  setMaskHeight(){
    let dialogMark = this.refs.dialogMark && this.refs.dialogMark.getDOMNode()
    if (dialogMark) {
      let docHeight = document.body.scrollHeight
      let winHeight = document.documentElement.clientHeight
      dialogMark.style.height = (docHeight <= winHeight ? winHeight : docHeight) + 'px'
    }
  }

}

export default dialogDialog
