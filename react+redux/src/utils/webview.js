/**
 * webview相关的公共方法
 */

module.exports = {
  /**
   * 关闭当前页面
   * finishCurrentPage
   */
  finishCurrentPage: function() {
    if (typeof Bridge !== 'undefined') {
      const appFactory = Bridge.require('sdp.appfactory')
      appFactory.finishCurrentPage()
    }
  }
}
