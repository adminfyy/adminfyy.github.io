module.exports = {
  path: 'widget/select/search',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../../pages/widget/search'))
    })
  }
}
