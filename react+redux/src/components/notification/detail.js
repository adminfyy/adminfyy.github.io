// 通知详情页面
import React, { Component } from 'react'
import DetailInfo from './plugins/detail/info'


export default class extends Component {

/*
* 1.通知详情的详细内容组件
* 2.通知详情的回复列表组件
* 3.通知详情的回复输入框组件
* */

  render() {
    return (
        <DetailInfo {...this.props}/>
    )
  }


}
