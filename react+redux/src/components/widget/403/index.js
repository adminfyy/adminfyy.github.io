import React, { Component } from 'react'
import Header from 'components/widget/header/version'

export default class extends Component {
  render() {
    return (
        <div className="permission-403">
          <Header
            projectTitle="提示"
            hideInfo="true"
          />
          <div className="status-code-main">
          <div className="status-code-content">
            <i className="status-code-backimg"></i>
            <p className="status-code-txt">sorry，您暂无权限访问~</p>
            </div >
          </div>
          </div>
        )
  }
}
