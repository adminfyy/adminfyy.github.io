module.exports = {
  path: 'project/:pid/version/:vid/applyHistory/:operateId',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/milestone/ApplyHistory'))
    })
  }
}
