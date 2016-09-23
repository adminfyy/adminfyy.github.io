import React, { Component } from 'react'
import VersionCard from './plugins/versionCard'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import GoTopButton from 'components/widget/button/GoTopButton'
import * as helpers from 'utils/helpers'

export default class VersionStatistic extends Component {

  render() {
    const { data, onUpload } = this.props
    let that = this
    let displayOrder = [ 'name', 'current_count', 'future_count' ]

    // loading page
    let isMini = document.body.clientWidth < 333 ? '' : '里程碑'

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
      <div className="stat">
        <div className="stat-header">
          <div className="stat-card">
            <div className="column-3 text-middle-60">序号</div>
            <div className="column-3 text-middle-60">项目名称</div>
            <div className="column-3 text-middle-60">
              <div className="row  text-middle-30">
                <div className="column">未结束里程碑</div>
              </div>
              <div className="row  text-middle-30">
                <div className="column-2">当前{isMini}</div>
                <div className="column-2">未来{isMini}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="content js-scroll"
          onLoad={helpers.ScrollResize()}
          onScroll={this.scrollForUpload.bind(this)}>
          {
            data.items.map(function(item, i){
              return <VersionCard {...that.props} onUpload={onUpload} displayOrder={displayOrder} key={`stat-weeklyreport-${i}`} carddata={item} index={i}/>
            })
          }
          <RefreshStatus length={data.items.length} total={data.count} key={data.items.length}/>
        </div>
        <GoTopButton/>
      </div>
    )
  }

  scrollForUpload(){
    helpers.Scroll({fnCallback: this.props.onUpload.bind(this)})
  }

}
