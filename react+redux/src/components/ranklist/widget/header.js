import React, { Component } from 'react'

export default class Header extends Component {

  render() {
    // const {data} = this.props

    return (
      <div className="th tr rank-list-weekreport-head">
        <div className="iconfont-crown-static"></div>
        <div className="title">项目周报评分排行</div>
        <div className="hint">{`本周一 14：00截止`}</div>
      </div>
    )
  }
}
