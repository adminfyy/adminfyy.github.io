module.exports = {
  path: 'menu/:menu/project/:id',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/ProjectDetailPage'))
    })
  }
}
