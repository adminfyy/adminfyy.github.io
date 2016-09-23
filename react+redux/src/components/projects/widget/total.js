import React, { Component } from 'react'

export default class BannerTotal extends Component {

  render() {
    const {
      stats
      } = this.props

    return (
      <div className="total ">
        <div className="normalfont">
          您有
        </div>
        <div className="digits">
          {stats.all_count}<span className="normalfont yellow">项</span>
        </div>
        <div className="normalfont">
          正在进行
        </div>
      </div>
    )
  }
}
