module.exports = {
  path: 'thumbnail',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/thumbnail'))
    })
  }
}
