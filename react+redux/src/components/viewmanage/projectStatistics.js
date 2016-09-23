import React, { Component } from 'react'
import * as helpers from 'utils/helpers'

export default class ProjectStatistics extends Component {
  render() {
    const {stats, versionStandard} = this.props
    let thisWeekCount = versionStandard.this_week_count
    let lastWeekCount = versionStandard.last_week_count
    let vsRatio = this.ratio(thisWeekCount, lastWeekCount) * 100
    vsRatio = !isNaN(vsRatio) && helpers.convertDecimal(vsRatio, 1)

    return (
      <div className="projects-statistics">
        <div className="projects-info border-b">
          <div>
            <p>项目总数</p>
            <strong>{stats.all_count}</strong>
          </div>
          <div>
            <p>环比上月</p>
            <strong className="ratio">
              +{stats.recent_active_count}个
            </strong>
          </div>
        </div>
        <div className="projects-info iconfont-select" onClick={this.handleClick.bind(this)}>
          <div>
            <p>达标项目数</p>
            <strong>{versionStandard.this_week_count}</strong>
          </div>
          <div>
            <p>环比上周</p>
            <strong className={+vsRatio > 0 ? 'ratio increase' : (+vsRatio < 0 ? 'ratio decline' : 'ratio')}>
              {+vsRatio >= 0 ? '+' + vsRatio : vsRatio}%
            </strong>
          </div>
        </div>
        <div className="tip">达标标准：已提交确认的未来里程碑达2个</div>
      </div>
    )
  }

  handleClick() {
    helpers.goPage(`statistic/rsmilestone`)
  }

  /**
   * [ratio 计算环比涨幅公式处理]
   * @param  {[number]} t [本周达标项目数]
   * @param  {[number]} l [上周达标项目数]
   * @return {[number]}   [环比比率]
   */
  ratio(t, l) {
    if (t === 0 && l === 0) {
      return 0
    } else if (t !== 0 && l === 0) {
      return (t - l) / (l + 1)
    } else {
      return (t - l) / l
    }
  }
}
