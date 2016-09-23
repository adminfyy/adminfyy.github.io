module.exports = {
  path: 'notice/:pid/add',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/notification/Add'))
    })
  }
}
