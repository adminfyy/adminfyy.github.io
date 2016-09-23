// index.js
module.exports = {
  path: 'project/:pid/notification/:nid/checklist',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/notification/Checklist'))
    })
  }
}
