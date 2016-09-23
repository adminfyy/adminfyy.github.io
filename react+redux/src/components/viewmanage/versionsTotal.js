import React, { Component } from 'react'
import { Link } from 'react-router'
import Highcharts from 'highcharts'
import * as helpers from 'utils/helpers'
import * as options from './config/vt'

export default class VersionsTotal extends Component {
  /**
   * 生成图表
   * @param  {[Object]} versionsTotal [图标所需的数据]
   * @return {[undefined]}
   */
  createChart(versionsTotal) {
    let vta = versionsTotal.project_count_of_unfinished_milestone_a
    let vtb = versionsTotal.project_count_of_unfinished_milestone_b
    let vtc = versionsTotal.project_count_of_unfinished_milestone_c
    new Highcharts.Chart({
      series: [ {
        data: [ {
          name: '',
          color: '#bebebe',
          y: vta
        }, {
          name: '',
          color: '#f7d54d',
          y: vtb
        }, {
          name: '',
          color: '#85cd4c',
          y: vtc
        } ]
      } ],
      credits: {
        enabled: false
      },
      ...options.vt
    })
  }

  getTotal(versionsTotal) {
    let vta = versionsTotal.project_count_of_unfinished_milestone_a
    let vtb = versionsTotal.project_count_of_unfinished_milestone_b
    let vtc = versionsTotal.project_count_of_unfinished_milestone_c
    return vta + vtb + vtc
  }

  isCreateChart() {
    const {versionsTotal} = this.props
    let total = this.getTotal(versionsTotal)
    if (!helpers.isEmpty(versionsTotal) && total) {
      this.init = true
      this.createChart(versionsTotal)
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
    const {versionsTotal} = this.props
    let total = this.getTotal(versionsTotal)

    return (
      <div className="view-summary">
        <div className="view-main">
          <div className="left">
            <h1>项目里程碑概览</h1>
          </div>
          <div className="right">
            <Link
              onClick={(e) => helpers.goPage(`/statistic/milestone`)} className="more">查看详情</Link>
            <div>单位：项目数（个）</div>
          </div>
        </div>
        {(!helpers.isEmpty(versionsTotal) && total)
          ? <div>
            <div className="pie-chart-area" id="overview">
            </div>
            <div className="tip">
              <strong></strong>
              <span>未结束里程碑=0</span>
              <strong></strong>
              <span>未结束里程碑=1</span>
              <strong></strong>
              <span>未结束里程碑≥2</span>
            </div>
          </div>
          : ''
        }
      </div>
    )
  }

}
