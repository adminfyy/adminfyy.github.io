import React, { Component } from 'react'
import Header from 'components/widget/header/version'

export default class extends Component {
  render() {
    return (
        <div className="notfound-404">
          <Header
            projectTitle="提示"
            hideInfo="true"
          />
          <div className="status-code-main">
          <div className="status-code-content">
            <i className="status-code-backimg"></i>
            <p className="status-code-txt">抱歉，您访问的页面不存在~</p>
            </div >
          </div>
          </div>
        )
  }
}
