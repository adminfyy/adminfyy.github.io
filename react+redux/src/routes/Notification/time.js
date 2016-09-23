module.exports = {
  path: 'notice/:pid/time',
  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('components/notification/plugins/Time'))
    })
  }
}
