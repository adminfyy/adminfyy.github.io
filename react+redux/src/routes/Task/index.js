module.exports = {
  path: 'project/:pid/version/:vid/task/:tid/status/:type/mobile/:mobile',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/taskDetail'))
    })
  }
}
