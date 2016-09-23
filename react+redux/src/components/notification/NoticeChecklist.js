import React, { Component } from 'react'
import NoticeCheckItem from './NoticeCheckItem'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import {Scroll, ScrollResize} from 'utils/helpers'

export default class NoticeChecklist extends Component {
  componentDidMount() {
    const {checkNum} = this.props
    let text = `共发送给${checkNum.receiver_amount}位同学，已有${checkNum.checked_number}位同学确认收到`

    window.toast.setProps({
      icon: 'tip-check',
      closeAction: true,
      text: text,
      timeOut: 3000,
      isShow: true,
      id: 'checkToast'
    })
    ScrollResize()
  }
  render() {
    const { data } = this.props
    let that = this

    if(!data.page){
      return (
        <div className="list-result">
          <div className="data-loading"></div>
          <div className="label">数据加载中...</div>
        </div>
      )
    }
    // not-found - page
    if(!data.items || data.empty){
      return (
      <div className="list-result">
        <div className="no-data-img"></div>
        <div className="label">暂无通知可确认</div>
      </div>)
    }

    return (
      <div className="check-list js-scroll"
        onScroll={this.scrollForLoad.bind(this)}>
          {
            data.items.map(function(item, i){
              return <NoticeCheckItem {...that.props} key={`check-list-item-${i}`} carddata={item} />
            })
          }
          <RefreshStatus length={data.items.length} total={data.count} key={data.items.length}/>
      </div>
    )
  }
  scrollForLoad(){
    Scroll({fnCallback: this.props.onUpload.bind(this)})
  }

}
