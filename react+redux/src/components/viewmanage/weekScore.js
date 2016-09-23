import React, { Component } from 'react'
import { Link } from 'react-router'
import * as helpers from 'utils/helpers'
import Highcharts from 'highcharts'
import { consts } from 'constants'
import * as options from './config/ws'

export default class WeekScore extends Component {
  /**
   * 生成图表
   * @param  {[Object]} versionsTotal [图标所需的数据]
   * @return {[undefined]}
   */
  createChart(weeklyScore) {
    let levelA = weeklyScore.level_a
    let levelB = weeklyScore.level_b
    let levelC = weeklyScore.level_c
    let levelD = weeklyScore.level_d
    let levelS = weeklyScore.level_s
    let levelNan = weeklyScore.level_nan
    let maxLevel = Math.max(levelS, levelA, levelB, levelC, levelD, levelNan)
    let tickInterval = Math.ceil(maxLevel / 5)

    new Highcharts.Chart({
      series: [ {
        name: ' ',
        data: [ {
          y: levelS,
          color: '#ff8a2b'
        }, {
          y: levelA,
          color: '#ffdd5f'
        }, {
          y: levelB,
          color: '#86cd4d'
        }, {
          y: levelC,
          color: '#e77046'
        }, {
          y: levelD,
          color: '#ff5543'
        }, {
          y: levelNan,
          color: '#c5c5c5'
        } ],
        color: 'white'
      } ],
      yAxis: {
        tickInterval: tickInterval,
        title: {'text': ''},
        gridLineColor: '#f2f2f2'
      },
      ...options.ws
    })
  }

  isCreateChart() {
    const {weeklyScore} = this.props
    if (!helpers.isEmpty(weeklyScore)) {
      this.init = true
      this.createChart(weeklyScore)
    }
  }

  componentDidMount() {
    this.isCreateChart()
  }

  componentDidUpdate() {
    if (!this.init) {
      this.isCreateChart()
    }
  }


  render() {
    const {weeklyScore} = this.props
    let startTime = helpers.dateTime(weeklyScore.start_time).format(consts.DATE_FORMAT_MD)
    let endTime = helpers.dateTime(weeklyScore.end_time).format(consts.DATE_FORMAT_MD)

    return (
      <div className="week-score">
        <div className="view-main">
          <div className="left">
            <h1>项目周评分统计</h1>
            <div>统计周期：{startTime} - {endTime}</div>
          </div>
          <div className="right">
            <Link onClick={(e) => helpers.goPage(`statistic/weeklyReport`)} className="more">查看详情</Link>
            <div>单位：项目数（个）</div>
          </div>
        </div>
        <div className="bar-chart-area" id="weekScore"></div>
      </div>
    )
  }

}
