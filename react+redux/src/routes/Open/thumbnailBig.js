module.exports = {
  path: 'thumbnailBig',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/thumbnailBig'))
    })
  }
}
