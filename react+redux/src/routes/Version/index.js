module.exports = {
  path: 'project/:pid/version/:vid/detail/status/:type',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/ProjectVersion'))
    })
  }
}
