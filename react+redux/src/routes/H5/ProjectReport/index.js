module.exports = {
  // 从应用消息过来，都会加个isFromApp路由
  path: 'project/:pid/report/:rid(/isFromApp)',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../../pages/h5/ProjectReport'))
    })
  }
}
