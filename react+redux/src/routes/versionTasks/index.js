module.exports = {
  path: 'versiontasks/:pid/:vid/status/:type',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/versionTasksPage'))
    })
  }
}
