module.exports = {
  path: 'project/:pid/milepost',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/milepost/index'))
    })
  }
}
