module.exports = {
  path: 'project/:pid/widget/select',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../../pages/widget/select'))
    })
  }
}
