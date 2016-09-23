module.exports = {
  path: 'notfound/404(/isFromApp)',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/404/index.js'))
    })
  }
}
