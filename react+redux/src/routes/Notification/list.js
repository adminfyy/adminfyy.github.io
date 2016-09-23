// index.js
module.exports = {
  path: 'project/:pid/notificationList',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/notification/List'))
    })
  }
}
