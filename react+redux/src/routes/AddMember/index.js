module.exports = {
  path: 'addmember/:id',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/AddMember'))
    })
  }
}
