module.exports = {
  path: 'project/:pid/weeklyreport',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/statistic/ProjectWeeklyReportList'))
    })
  }
}
