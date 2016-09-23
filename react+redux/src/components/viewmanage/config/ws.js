import { consts } from 'constants'

export const ws = {
  chart: {
    'renderTo': 'weekScore',
    'type': 'column',
    'height': 200
  },
  title: '',
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
        color: '#666',
        style: {
          fontSize: '15px',
          fontWeight: 'normal',
          fontFamily: 'Arial'
        },
        formatter: function() {
          return this.y
        }
      }
    },
    series: {
      enableMouseTracking: false
    }
  },
  xAxis: {
    categories: consts.ScoreLevel,
    labels: {
      staggerLines: 1,
      style: {
        fontSize: '13px',
        fontWeight: 'normal',
        fontFamily: 'Arial',
        maxStaggerLines: 1
      }
    },
    lineColor: '#f2f2f2',
    tickWidth: 0
  },
  credits: {
    enabled: false
  }
}
