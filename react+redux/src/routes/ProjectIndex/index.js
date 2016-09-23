module.exports = {
  path: 'menu/:menu/project/:id/index',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/ProjectIndex'))
    })
  }
}
