module.exports = {
  path: 'project/:pid/milestone/:vid/edit/:from',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/ProjectVersionEditPage'))
    })
  }
}
