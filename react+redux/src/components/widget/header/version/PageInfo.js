import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import utils from 'utils'
import webview from 'utils/webview'
import { imOpenInWeb, imOpenInWebFirstPage } from 'utils/im'
export default class PageInfo extends Component {
  render() {
    // pc端接收的im消息在浏览器中打开，头部右上角不显示首页图标
    return (
      <div className="detail-page-info">
        { !imOpenInWebFirstPage() &&
        <div className="back iconfont-left-arrow">
          <a onClick={this.backFunction.bind(this)}>
            返回
          </a>
        </div>
        }
        <div className="page-title">
          <p>{this.props.projectTitle}</p>
        </div>
        {+this.props.homeUrl !== 1 && !imOpenInWeb() &&
        <div className="goto-index">
          <a className="iconfont-index" onClick={this.backFunction.bind(this, 'home')}>
          </a>
        </div>
        }
      </div>
    )
  }

  backFunction(type) {
    let {backUrl, backFunction} = this.props
    let urlTemp
    // 首页使用history.push，因为有可能从应用消息过来也有回到首页的按钮
    if (type === 'home') {
    // 做下面的分支操作，主要是解决从应用消息到首页的时候，还会出现返回的按钮后再跳转到首页
      utils.isFromAppForSearch() ? backUrl = '/projects/isFromApp' : backUrl = '/'
    } else {
    // 是否关闭webview页面
      urlTemp = this.closePage(type)
    }
    // 返回操作之前做回调
    this.goBack(urlTemp || backUrl, backFunction)
  }
  /**
   * [goBack 是否回调判断]
   * @method goBack
   * @param  {[type]} backUrl      [description]
   * @param  {[type]} backFunction [description]
   * @return {[type]}              [description]
   */
  goBack(backUrl, backFunction){
    if(backFunction){
      backFunction(function () {
        helpers.goPage(backUrl)
      })
    } else {
      helpers.goPage(backUrl)
    }
  }
/**
 * [closePage 应用消息的返回都是直接关闭webview页面]
 * @return {[type]} [description]
 */
closePage(type) {
  let url = null
  if (utils.isFromAppForHash()) {
    // 应用消息列表上点击跳转的页面的返回，都是直接关闭webview，回到应用消息列表上
    webview.finishCurrentPage()
  } else {
    // 项目里面没有权限跳转到403页面后，403页面的返回“直接跳转到首页”
    location.hash.indexOf('permission/403') !== -1 ? url = '/' : ''
  }
  return url
}
}
