import React, { Component } from 'react'
import * as helpers from 'utils/helpers'

class notifyButton extends Component {
  render() {
    return (<div className={`notify-button`} onClick={ this.handleClick.bind(this)} ref="goTop"><div className="content">{`我要
    发送`}</div></div>)
  }
  handleClick() {
    const {projectId, unitSelectOptions} = this.props
    unitSelectOptions({
      isRequest: true,
      isCache: false,
      isCompenent: true,
      title: '选择联系人',
      subTitle: '项目成员',
      selectedName: '人',
      data: [],
      selectedItems: [],
      selectedConfirmItems: [],
      comment: ''
    })
    helpers.goPage(`notice/${projectId}/add`)
  }
}

export default notifyButton
