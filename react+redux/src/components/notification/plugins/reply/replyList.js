// 通知详情页面上的回复列表
import React, { Component } from 'react'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import Card from './replyCard'

export default class extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     projectId: this.props.params.pid,
  //     noticeId: this.props.params.nid
  //   }
  // }
  render(){
    const { reply, notificationDetail } = this.props
    // let pictureTop = (document.body.clientHeight - 230 - 150) / 2

    // loading page
    if(!reply.page){
      return (
        <div className="list-result" style={{paddingTop: 0}}>
          <div className="label">数据加载中...</div>
        </div>
      )
    }
    // not-found - page
    if(reply.empty){
      return (
      <div className="list-result" style={{paddingTop: 0}}>
        <div className="label">暂无回复</div>
      </div>)
    }

    return (
        <div>
          <div className="reply-header">共有<span className="normal">{reply.count}</span>条回复</div>
          {
              reply.items.map((item, index) => (
              <Card key={`reply-list-${index}`} data={item} notificationDetail={notificationDetail}/>
          ))}
          <RefreshStatus length={reply.items.length} total={reply.count} key={reply.items.length}/>
        </div>
    )
  }

}
