import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    const {projectName} = this.props
    return (
      <div className="notify-header">
          <span className="iconfont-project-static">项目：{projectName}</span>
      </div>
    )
  }
}
