import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {consts} from 'constants';
import * as helpers from '../../../utils/helpers';
import Comment from 'components/widget/textarea'
let [ winHeight, eHeight ] = [ 0, 0 ]

export default
class ApplyPlugin extends Component {
  constructor() {
    super()
    this.state = {
      status: helpers.getSearchString('application_status'),
      isWrite: false
    }

    this.desDefault = {
      total: 100,
      placeholder: '请填写书面说明（100个字以内）',
      required: true,
      rows: 4
    }
  }

  render() {
    let style = {
      margin: '0 10px'
    }
    let topStyle = {
      height: '10px',
      background: '#ececec'
    }
    let {isWrite} = this.state
    let writedCss = isWrite ? 'writed' : ''
    return (
      <div className="page-confirm buttonArea">
        <div style={topStyle}></div>
        <div className="confirm-title">
          <div className="title-label fl">是否确认该里程碑</div>
        </div>
        <ul className="confirm-content" style={style}>
          <Comment options={this.desDefault} ref="comment"/>
        </ul>
        <div className="confirm-footer clearfix">
          <div className="confirm-center ">
            <div className="btn btn-sure" onClick={this.sure.bind(this, 1)}>确定</div>
            <div className="btn btn-cancel" onClick={this.sure.bind(this, 2)}>拒绝</div>
          </div>
        </div>
        <div className="page-confirm-mark" onClick={this.mark.bind(this)}></div>
      </div>
    )
  }

  sure(type) {
    const {projectVersionDetail,applyProject,updateVersionState,uid,apply} = this.props
    let that = this
    let $comment = this.refs.comment

    if (!$comment.valid()) {
      return
    }

    let option = {
      projectId: projectVersionDetail.project_id,
      versionId: projectVersionDetail.project_version_id,
      applyId: projectVersionDetail.apply_operate_id,
      status: type,
      uid: uid,
      application_comment: $comment.getValue()
    }
    applyProject(option, function (data) {
      apply(type)
      setTimeout(function(){
        helpers.ScrollResize()
        if(!data.code){
          window.toast.setTxt('审核成功')
        }
      }, 500)
    }.bind(this))
  }

  mark(e){
    let $comment = this.refs.comment.refs.comment.getDOMNode()
    e.target.style.position = 'relative'
    $comment.focus()
  }
}
