module.exports = {
  path: 'project/:pid/roadmap',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/roadmap/index'))
    })
  }
}
