// index.js

module.exports = {
  path: '/projects/:id/version/:vid/goal_group/:gpid/goal/:glid/type/:type/tplid/:tplid',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/ProjectVersionGoalEditPage'))
    })
  }
}
