// index.js
module.exports = {
  path: 'search/milestone/:id/:vid/:tid',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/MilestoneSearchPage'))
    })
  }
}
