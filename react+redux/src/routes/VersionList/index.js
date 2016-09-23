module.exports = {
  path: 'menu/:menu/versions/:id',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/ProjectVersions'))
    })
  }
}
