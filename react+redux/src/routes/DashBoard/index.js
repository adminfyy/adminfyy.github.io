module.exports = {
  path: 'menu/:menu/project/:id/dashboard',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/DashBoard'))
    })
  }
}
