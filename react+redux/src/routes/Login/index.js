module.exports = {
  path: 'login(/isFromApp)',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/login/index.js'))
    })
  }
}
