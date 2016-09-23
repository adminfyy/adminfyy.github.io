module.exports = {
  path: 'project/:pid/versionvalid/:vid/apply/:aid(/isFromApp)',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/versionValidPage'))
    })
  }
}
