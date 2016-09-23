module.exports = {
  path: 'statistic/milestone',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/statistic/StatisticVersion'))
    })
  }
}
