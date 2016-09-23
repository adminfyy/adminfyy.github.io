module.exports = {
  path: 'project/:id/cost/member',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/MemberCost'))
    })
  }
}
