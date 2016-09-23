import React, { Component } from 'react'
import { connect } from 'react-redux'


import * as
actionCreators
from
'actions'


@connect(state => ({}), actionCreators)
class RoleDialog extends Component {
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
    return (

      <div>
        <div className="dialog-mark" data-role="dialogMark" ref="dialogMark"></div>
        <div className="dialog-confirm" ref="dialogConfirm">
          <div className="dialog-confirm-content" data-role="content">

            <div className="dialog-confirm-head" data-role="head">
              <div className="dialog-confirm-title" data-role="title">
                <div className="title">添加角色</div>
              </div>
            </div>

            <div className="dialog-confirm-main" data-role="main">
              <div className="dialog-confirm-message" data-role="message">
                <ul className="dialog-ul">
                  <li onClick={this.selectDuty.bind(this, '开发')}>开发</li>
                  <li onClick={this.selectDuty.bind(this, '策划')}>策划</li>
                  <li onClick={this.selectDuty.bind(this, '项管')}>项管</li>
                  <li onClick={this.selectDuty.bind(this, 'UIUE')}>UIUE</li>
                  <li onClick={this.selectDuty.bind(this, '商务/运营')}>商务/运营</li>
                  <li onClick={this.selectDuty.bind(this, '客服')}>客服</li>
                  <li onClick={this.selectDuty.bind(this, 'QA')}>QA</li>
                </ul>
              </div>
            </div>
            <div className="dialog-confirm-footer" data-role="head">
				<div className="dialog-confirm-footer-title" data-role="title" onClick={this.cancelHandler.bind(this)}>
					<span className="addrole-addmember">取消</span>
				</div>
            </div>
          </div>
        </div>

      </div>
    )
  }

  selectDuty(dutyname) {
    const that = this
    this.props.setDutyPannel()
    this.forceUpdate()
    this.props.selectDuty({
      'projectid': this.props.projectId,
      'data': {
        'duty': dutyname,
        'user_id': +this.props.uid
      }
    }, function () {
      that.props.setSuccessFlag()
    })
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

export default RoleDialog
