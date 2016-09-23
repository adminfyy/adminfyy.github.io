import React, { Component } from 'react'
export default class extends Component {

  render() {
    const {name, overlayDays} = this.props
    return (
      <div className="content" id="tipContent">
        <div className="warn-image"></div>
        <p className="projct-name">{name}</p>
        <p className="roadmap-none">无当前路线图</p>
        <p className="roadmap-tip">
          { overlayDays === 'null' || overlayDays === null
              ? '无当前路线图，请尽快提交!'
              : (overlayDays && overlayDays > 0 ? `已超期${overlayDays}天，超期90天将强制释放开发人员` : '')
          }
        </p>
      </div>
      )
  }
}
