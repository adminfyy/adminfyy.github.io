module.exports = {
  path: 'statistic/valuation',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/statistic/valuation'))
    })
  }
}
