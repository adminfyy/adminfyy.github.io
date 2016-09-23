module.exports = {
  path: 'project/open/3/:val',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/openThird'))
    })
  }
}
