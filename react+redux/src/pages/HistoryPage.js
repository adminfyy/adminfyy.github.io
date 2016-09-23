import React, { Component } from 'react'
import { Bar as BarChart } from 'react-chartjs'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import * as helpers from '../utils/helpers'
import ProjectHeader from 'components/widget/header'
import HistoryDetail from './HistoryDetail'
import MemberCost from './MemberCost'
import Blank from 'components/widget/tab/blank/index'
import Tabs from 'components/widget/tab/index'

@connect(state => ({
  histories: state.histories,
  projectDetail: state.projectDetail,
  projectSummary: state.projectSummary
}), actionCreators)
export default
class HistoryPage extends Component {
  constructor(){
    super()

    this.state = {
      showPre: true,
      showNext: true
    }
  }

  componentDidMount() {
    let that = this
    this.props.fetchProjectDetail(this.props.params.id)
    this.props.fetchProjectSummary({
      projectId: this.props.params.id
    })
    this.props.fetchHistories({
      projectId: this.props.params.id
    }, function() {
      that.updateHistoryDetail()
    })
    helpers.refresh()
  }

  updateHistoryDetail() {
    const {histories} = this.props
    if (!histories.items) {
      return null
    }

    if (this.refs.chart && !this.hasBindChartClick) {
      const chartDom = this.chartDom = this.refs.chart.getCanvass()
      chartDom.addEventListener('click', this._handleClickBar.bind(this))
      this.hasBindChartClick = true
    }

    this.isFetching = false

    let isVP = histories.items[0].finance_cost !== null
    let hasHistory = false

    for (let i = histories.items.length - 1; i >= 0; i--) {
      let item = histories.items[i]
      let value = isVP ? item['finance_cost'] : item['work_time']

      if (value > 0) {
        hasHistory = true
        this.props.fetchHistory({
          projectId: this.props.params.id,
          month: item.month,
          currentMonth: helpers.getMonthCN(item.month)
        })
        break
      }
    }

    if (!hasHistory) {
      let item = histories.items[histories.items.length - 1]

      this.props.fetchHistory({
        projectId: this.props.params.id,
        month: item.month,
        currentMonth: helpers.getMonthCN(item.month)
      })
    }
  }

  componentWillUnmount() {
    this.chartDom && this.chartDom.removeEventListener('click', this._handleClickBar.bind(this))
  }

  render() {
    const {histories, projectDetail, projectSummary} = this.props
    if (!histories.items || histories.items.length === 0 ||
      helpers.isEmpty(projectDetail) ||
      helpers.isEmpty(projectSummary)) {
      return <div className="page-loading"></div>
    } else {
      this.chartData = this._getChartData(histories)

      let projectId = this.props.params.id
      let activeKey = this.props.params.menu
      let isVP = histories.items[0].finance_cost !== null
      let cost = null
      let showPre = this.state.showPre
      let showNext = this.state.showNext
      const state = this.state
      /* eslint no-unused-vars:0 */
      let isSub = projectDetail['is_sub']
      if (state && typeof state.isSub !== 'undefined') {
        isSub = state.isSub
      }

      if (isVP) {
        cost = (<div className="history-chart-header">
          <div className="summary">
            <table width="100%">
            <tbody>
              <tr className="label">
                <td width="50%">
                  总营收
                </td>
                <td width="50%">排名</td>
              </tr>
              <tr className="value">
                <td>{helpers.convertMoney(projectSummary.revenue)}</td>
                <td>{projectSummary.revenue_rank}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="detail">
            <table width="100%" className="detailTable">
              <tbody>
              <tr className="label">
                <td className="normal">总投入</td>
                <td className="left-line"></td>
                <td className="normal">人数投入</td>
                <td className="left-line"></td>
                <td className="normal">平均成本</td>
                <td className="left-line"></td>
                <td className="normal">人均产出</td>
              </tr>
              <tr className="value">
                <td className="normal">{helpers.convertMoney(projectSummary.work_cost)}</td>
                <td className="left-line"></td>
                <td className="normal">{projectSummary.member_count}</td>
                <td className="left-line"></td>
                <td className="normal">{helpers.convertMoney(projectSummary.cost_avg)}</td>
                <td className="left-line"></td>
                <td className="normal">{helpers.convertMoney(projectSummary.revenue_avg)}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>)
      }
      return (
        <div className="histories" onLoad={(e) => {
          helpers.ScrollResize(54, document.querySelector('.histories'))
          helpers.refreshTouch(document.querySelector('.histories'))
        }}>
          <ProjectHeader {...this.props}
            projectTitle={'报表'}
            projectDetail={projectDetail}
            backUrl="/"/>
          <div className="history-chart-container">
            {cost}
            <BarChart data={this.chartData.barData} options={this._getChartOptions()} redraw
              width={document.body.offsetWidth - 76} height="200" ref="chart"/>
            { showPre && <button id="history_button_prev" className="history-button prev"
              onClick={this._getHistoryPrev.bind(this)}><span></span></button> }
            { showNext && <button id="history_button_next" className="history-button next"
              onClick={this._getHistoryNext.bind(this)}><span></span></button> }
            <div className="chart-title">{this.chartData.title}</div>
          </div>
          <HistoryDetail clearHistoryDetail={this.props.clearHistoryDetail}/>
          <MemberCost projectId={this.props.params.id} />
          <Blank />
        </div>
      )
    }
  }

  _handleClickBar(evt) {
    const barChartInst = this.refs.chart.getChart()
    const activeBars = barChartInst.getBarsAtEvent(evt)

    let result = 0

    for (let barIndex = 0; barIndex < barChartInst.datasets[0].bars.length; barIndex++) {
      if (barChartInst.datasets[0].bars[barIndex] === activeBars[0]) {
        result = barIndex
      }
    }
    if (activeBars[0]) {
      this.props.fetchHistory({
        projectId: this.props.params.id,
        month: this.chartData.barData.datasets[0].originDataArray[result].month,
        currentMonth: activeBars[0].label
      })
    }
  }

  _getHistoryPrev() {
    let that = this
    const {histories, fetchHistories} = this.props
    this.setState({
      showNext: true
    })

    if (!histories.items.length || this.isFetching) {
      return
    }
    this.isFetching = true
    this.props.clearHistoryDetail()

    let dateStr = histories.items[0].month + ''
    dateStr = dateStr.replace(/(^\d{4})/, '$1-')

    let date = new Date(dateStr)
    date.setMonth(date.getMonth() - 1)

    let month = date.getMonth() + 1
    month = (month < 10 ? '0' : '') + month

    fetchHistories({
      projectId: this.props.params.id,
      month: date.getFullYear() + month
    }, function() {
      that.updateHistoryDetail()
    })
  }

  _getHistoryNext() {
    let that = this
    const {histories, fetchHistories} = this.props
    this.setState({
      showPre: true
    })

    if (!histories.items.length || this.isFetching) {
      return
    }

    this.props.clearHistoryDetail()

    const now = new Date()
    let dateStr = histories.items[histories.items.length - 1].month + ''
    dateStr = dateStr.replace(/(^\d{4})/, '$1-')
    let date = new Date(dateStr)
    date.setMonth(date.getMonth() + 5)

    if (date > now) {
      this.setState({ showNext: false })
      return
    }

    this.isFetching = true
    let month = date.getMonth() + 1
    month = (month < 10 ? '0' : '') + month

    fetchHistories({
      projectId: this.props.params.id,
      month: date.getFullYear() + month
    }, function() {
      that.updateHistoryDetail()
    })
  }

  _getChartData(histories) {
    let chartData = {}
    let barData = {
      labels: [],
      datasets: []
    }
    let isVP = histories.items[0].finance_cost !== null
    let dataset = {
      label: isVP ? '成本' : '工时',
      fillColor: 'rgba(96,184,220,1)',
      strokeColor: 'rgba(255,255,255,1)',
      highlightFill: 'rgba(255,255,255,1)',
      highlightStroke: 'rgba(255,255,255,1)',
      data: [],
      originDataArray: []
    }

    let timeRangeObj = {}
    let timeRange = []

    histories.items.forEach(function (item) {
      barData.labels.push(helpers.getMonthCN(item.month))
      dataset.data.push(isVP ? helpers.convertChartMoney(item['finance_cost'], true) : item['work_time'])
      dataset.originDataArray.push(item)

      let year = item.month.slice(0, 4)
      if (!timeRangeObj[year]) {
        timeRange.push(year)
        timeRangeObj[year] = true
      }
    })

    barData.datasets.push(dataset)

    chartData.isVP = isVP
    chartData.title = isVP ? '成本（万）' : '工时（h）'
    chartData.timeRange = timeRange.join(' - ')
    chartData.barData = barData

    return chartData
  }

  _getChartOptions() {
    return {
      scaleGridLineColor: 'rgba(255,255,255,.5)',
      scaleShowVerticalLines: false,
      barValueSpacing: 15,
      scaleLineColor: 'rgba(255,255,255,1)',
      scaleFontColor: '#fff',
      scaleFontSize: 14
    }
  }
}
