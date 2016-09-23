module.exports = {
  path: 'permission/403(/isFromApp)',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/403/index.js'))
    })
  }
}
