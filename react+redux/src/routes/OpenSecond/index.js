module.exports = {
  path: 'project/open/2',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/openSecond'))
    })
  }
}
