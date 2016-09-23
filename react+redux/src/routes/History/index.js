module.exports = {
  path: 'menu/:menu/history/:id',

  getComponents (cb) {
    cb(null, require('../../pages/HistoryPage'))
  }
}
