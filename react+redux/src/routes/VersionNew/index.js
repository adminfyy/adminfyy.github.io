module.exports = {
  path: 'addmilestone/:pid',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/ProjectVersionEditPage'))
    })
  }
}
