import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  Line as LineChart
} from 'react-chartjs'
import * as actionCreators from 'actions'
import MemberFlow from 'components/history/memberCost/MemberFlow'

@connect(state => ({
  memberCost: state.memberCost
}), actionCreators)
export default class MemberCost extends Component {

  componentDidMount() {
    const {
      projectId
    } = this.props
    this.props.fetchMemberCost(projectId)
  }
  render() {
    const {
      memberCost
    } = this.props
    if (!memberCost.items) {
      return <div className = "page-loading" > < /div>
    }

    const chartData = this._getChartData(memberCost)
    return (< div >
      < div className = "member-cost-body" >
      < div className = "member-cost-summary" >
      < div className = "member-cost-summary-total-label" > 总投入人员 < /div> < div className = "member-cost-summary-total" > {
        memberCost.total_user_count
      } < /div> < /div> < LineChart data = {
        chartData
      }
      options = {
        this._getChartOptions()
      }
      redraw width = {
        document.body.offsetWidth
      }
      height = "180"
      ref = "chart" / >
      < div className = "member-cost-chart-example" >
      < span className = "member-cost-chart-example-total" >
      < span className = "graph" > < /span><span>总人数</span >
      < /span> < span className = "member-cost-chart-example-in" >
      < span className = "graph" > < /span>流入人数</span >
      < span className = "member-cost-chart-example-out" > < span className = "graph" > < /span>流出人数</span >
      < /div> < /div> < div >
      < div className = "project-goal" >
      < div className = "header-bar" >
      < span className = "title" > 本年度 < /span> < /div> < /div> < MemberFlow memberCost = {
        memberCost
      }
      /> < /div> < /div>
    )
  }

  _getChartData(memberCost) {
    // 总人数
    let dataset1 = {
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: '#fff',
      pointStrokeColor: '#fff',
      data: []
    }

    // 流入人数
    let dataset2 = {
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: '#3f8302',
      pointStrokeColor: '#fff',
      data: []
    }

    // 流出人数
    let dataset3 = {
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: '#eb6c06',
      pointStrokeColor: '#fff',
      data: []
    }

    let chartData = {
      labels: [],
      datasets: [ dataset1, dataset2, dataset3 ]
    }

    memberCost.items && memberCost.items.forEach(function(item) {
      chartData.labels.push(item.month)
      chartData.datasets[0].data.push(item.month_total_person_count)
      chartData.datasets[1].data.push(item.in_users ? item.in_users.length : 0)
      chartData.datasets[2].data.push(item.out_users ? item.out_users.length : 0)
    })

    return chartData
  }

  _getChartOptions() {
    return {

      // Boolean - If we show the scale above the chart data
      scaleOverlay: false,

      // Boolean - If we want to override with a hard coded scale
      scaleOverride: false,

      // ** Required if scaleOverride is true **
      // Number - The number of steps in a hard coded scale
      scaleSteps: null,
      // Number - The value jump in the hard coded scale
      scaleStepWidth: null,
      // Number - The scale starting value
      scaleStartValue: null,

      // String - Colour of the scale line
      scaleLineColor: 'rgba(255,255,255,0.5)',

      // Number - Pixel width of the scale line
      scaleLineWidth: 1,

      // Boolean - Whether to show labels on the scale
      scaleShowLabels: true,

      // Interpolated JS string - can access value
      scaleLabel: '<%=value%>',

      // String - Scale label font declaration for the scale label
      scaleFontFamily: '"Arial"',

      // Number - Scale label font size in pixels
      scaleFontSize: 12,

      // String - Scale label font weight style
      scaleFontStyle: 'normal',

      // String - Scale label font colour
      scaleFontColor: '#fff',

      // /Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,

      // String - Colour of the grid lines
      scaleGridLineColor: 'rgba(255,255,255,0.5)',

      // Number - Width of the grid lines
      scaleGridLineWidth: 1,

      // Boolean - Whether the line is curved between points
      bezierCurve: true,

      // Boolean - Whether to show a dot for each point
      pointDot: true,

      // Number - Radius of each point dot in pixels
      pointDotRadius: 5,

      // Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,

      // Boolean - Whether to show a stroke for datasets
      datasetStroke: true,

      // Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,

      // Boolean - Whether to fill the dataset with a colour
      datasetFill: true,

      // Boolean - Whether to animate the chart
      animation: true,

      // Number - Number of animation steps
      animationSteps: 60,

      // String - Animation easing effect
      animationEasing: 'easeOutQuart',

      // Function - Fires when the animation is complete
      onAnimationComplete: function() {}

    }
  }
}
