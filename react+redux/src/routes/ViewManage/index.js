module.exports = {
  // 从应用消息过来，都会加个isFromApp路由
  path: 'view(/isFromApp)',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/ViewManage'))
    })
  }
}
