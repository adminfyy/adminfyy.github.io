module.exports = {
  path: 'addtasks/:pid/:vid/status/:type',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/AddTasks'))
    })
  }
}
