module.exports = {
  path: 'statistic/weeklyreport',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/statistic/StatisticWeeklyReport'))
    })
  }
}
