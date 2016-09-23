module.exports = {
  path: 'projects/search',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../../pages/projects/search'))
    })
  }
}
