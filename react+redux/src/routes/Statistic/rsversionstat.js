module.exports = {
  path: 'statistic/rsmilestone',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/statistic/StatisticReachStandardVersion'))
    })
  }
}
