import React, { Component } from 'react'
import WeeklyReportCard from './plugins/weeklyReportCard'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import GoTopButton from 'components/widget/button/GoTopButton'
import {Scroll, ScrollResize} from 'utils/helpers'

export default class WeeklyReportStatistic extends Component {

  render() {
    const { data, onUpload } = this.props
    let displayOrder = [ 'name', 'performLevel', 'progress_score' ]
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
        <div className="label">未查找到相关列表</div>
      </div>)
    }

    return (
      <div className="stat">
        <div className="stat-header">
          <div className="stat-card text-middle-45">
            <div className="column-4">序号</div>
            <div className="column-4">项目名称</div>
            <div className="column-4">评价等级</div>
            <div className="column-4">分数</div>
          </div>
        </div>
        <div className="content js-scroll"
          onLoad={ScrollResize()}
          onScroll={Scroll.bind(this, {fnCallback: this.props.onUpload})}>
          {
            data.items.map((item, i) =>
              <WeeklyReportCard onUpload={onUpload}
                displayOrder={displayOrder}
                key={`stat-weeklyreport-${i}`}
                carddata={item}
                index={i}
                data = {data}
                {...that.props} />
            )
          }
          <RefreshStatus length={data.items.length} total={data.count} key={data.items.length}/>
        </div>
        <GoTopButton/>
      </div>
    )
  }


}
