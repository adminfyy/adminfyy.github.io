// Toast2.js
import React, { Component } from 'react'
import { Link } from 'react-router'
import * as helpers from 'utils/helpers'

export default
class ToastNew extends Component {
	constructor() {
  super()

  this.state = {
    icon: null,
    closeAction: false,
    link: null,
    movement: 'slideInDown',
    text: '',
    timeOut: -1,
    isShow: false
  }
}

  render() {
    let {icon, closeAction, text, link, isShow} = this.state

    let className = isShow ? 'notice-tip' : 'notice-tip hidden'
    return (
      <div id="tips">
        <div className={className} id={icon + '-wrap'} data-role="notice-tip">
          {icon && <div className={icon}></div>}
           <span>{text}</span>
          { link && <Link onClick={(e) => helpers.goPage(link.to)}>{link.value}</Link>}
          { closeAction && <a className="tip-close" href="javascript:void(0);" onClick={this.hide.bind(this)}>X</a> }
        </div>
      </div>
    )
  }

  hide() {
    this.setState({ isShow: false, icon: null })
  }

  setProps(option) {
    let that = this
    if (option) {
      this.setState({
        ...option
      })
    }
    if (option.timeOut && option.timeOut > 0) {
      setTimeout(function() {
        that.hide()
      }, option.timeOut)
    }
  }
  /* 兼容之前版本的toast提示 默认2s后隐藏
   * txt要设置的文本内容
   * */
  setTxt(txt) {
    let that = this
    this.setState({
      text: txt,
      isShow: true,
      link: null,
      closeAction: false
    })

    setTimeout(function(){
      that.hide()
    }, 2000)
  }
}
