module.exports = {
  // 从应用消息过来，都会加个isFromApp路由
  path: 'project/:pid/version/:vid/apply/:aid/review(/isFromApp)',

  getComponents (cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/MileStoneReview'))
    })
  }
}
