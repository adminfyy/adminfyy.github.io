import React, { Component } from 'react'
import VersionCard from './plugins/rsVersionCard'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import GoTopButton from 'components/widget/button/GoTopButton'
import * as helpers from 'utils/helpers'

export default class VersionStatistic extends Component {

  render() {
    const { data, onUpload, isActive, clickable } = this.props
    let displayOrder = [ 'name', 'future_verifying_version_amount' ]
    let displayOrder2 = [ 'name', 'annual_not_standard_times' ]

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
      <div className="stat">
        <div className="update-time">{`数据更新于${helpers.dateTime(data.end_time, 'yyyy/MM/dd')}`}</div>
        <div className="stat-header">
          <div className="stat-card">
            <div className="column-3 text-middle-60">序号</div>
            <div className="column-3 text-middle-60">项目名称</div>
            <div className="column-3 text-middle-60 pre-line">{ isActive ? `本年度未达标周数` : `未来里程碑数
                (已提交确认)`}</div>
          </div>
        </div>
        <div className="content js-scroll"
          onLoad={helpers.ScrollResize()}
          onScroll={this.scrollForUpload.bind(this)}>
          {
            data.items.map(function(item, i){
              return <VersionCard onUpload={onUpload} clickable={clickable} displayOrder={isActive ? displayOrder2 : displayOrder} key={`stat-weeklyreport-${i}`} carddata={item} index={i}/>
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
