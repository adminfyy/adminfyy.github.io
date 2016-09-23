import React, { Component } from 'react'
import Card from './plugins/Card'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import * as helpers from 'utils/helpers'

export default class ListContainer extends Component {
  componentDidMount(){
    helpers.ScrollToPrePosition(this.props.scrollTop, true)
  }
  componentWillUnmount(){
    this.props.modifyNotifyListScrollTop(this.refs['notify-list-ref'] && this.refs['notify-list-ref'].getDOMNode().scrollTop)
  }
  render() {
    const { data, isActive, updateNotification } = this.props
    // loading page
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
        <div className="label">未查找到相关列表</div>
      </div>)
    }

    return (
        <div className="notify js-scroll"
          onLoad={helpers.ScrollResize()}
          onScroll={this.scrollForLoad.bind(this)}
          ref="notify-list-ref">
          {
            data.items.map(function(item, i){
              return <Card key={`notify-card-${i}-${isActive}`} carddata={item} index={i} updateNotification={updateNotification}/>
            })
          }
          <RefreshStatus length={data.items.length} total={data.count} key={data.items.length}/>
        </div>
    )
  }
  scrollForLoad(){
    helpers.Scroll({fnCallback: this.props.onUpload})
  }
}
