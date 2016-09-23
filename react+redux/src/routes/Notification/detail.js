// 通知提醒详情
module.exports = {
  path: 'project/:pid/notifications/:nid(/isFromApp)',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/notification/detail'))
    })
  }
}
