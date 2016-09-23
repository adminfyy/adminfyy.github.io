import React, { Component } from 'react'
import * as helpers from '../../../utils/helpers'

export default class BannerManager extends Component {

  toManagerPage(){
    window.toast.setProps({
      text: '统计视图改版中...',
      timeOut: 1000,
      isShow: true
    })
  //  helpers.goPage('/view')
  }
  render() {
    return (
        <div className="total manager" onClick={this.toManagerPage.bind(this)}>
        </div>
      )
  }
}
