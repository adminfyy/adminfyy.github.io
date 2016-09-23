export const vt = {
  chart: {
    renderTo: 'overview',
    type: 'pie',
    height: 260
  },
  title: {
    text: ''
  },
  plotOptions: {
    pie: {
      allowPointSelect: false,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        color: '#666',
        style: {
          'fontSize': '15px',
          'fontWeight': 'normal',
          'fontFamily': 'Arial'
        },
        format: '{point.y}',
        inside: true
      }
    },
    series: {
      enableMouseTracking: false
    }
  },
  credits: {
    enabled: false
  }
}
