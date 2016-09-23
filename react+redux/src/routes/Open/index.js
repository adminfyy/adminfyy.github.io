module.exports = {
  path: 'open',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/OpenIndex'))
    })
  }
}
