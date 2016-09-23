module.exports = {
  path: 'project/:id/members',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/ProjectMembers'))
    })
  }
}
