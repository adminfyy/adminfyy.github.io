import * as helpers from 'utils/helpers'
import {imOpenInWeb} from 'utils/im'
let msgMap = require('./errorData.js')

function getMsg(res, err, onlyShowMessage = false) {
  if (res && res.body && res.body.code && (res.body.code in msgMap.data)) {
    return msgMap.data[res.body.code]
  }
  if (typeof res === 'undefined') {
    return '网络异常，请检查您的网络'
  }
  return '未知错误'
}

export function redirectErrorPage(res, err, onlyShowMessage) {
  let hash = location.hash
  let AlreadyLoad = false || /notfound\/404|permission\/403|login/g.test(location.hash)
  let url

  if (res && +res.status === 404 || +err.status === 404) {
    url = 'notfound/404'
  } else if (+res.status === 403 || +err.status === 403) {
    if (imOpenInWeb()) {
      // 如果是应用消息点开的，且是在浏览器中打开的，才跳转到登录页面
      url = 'login'
    } else {
      url = 'permission/403'
    }
  }
  if (hash.indexOf('isFromApp') !== -1) {
    url = url + '/isFromApp'
  }

  if (!AlreadyLoad && typeof url !== 'undefined' && !onlyShowMessage) {
    if(imOpenInWeb){
      // 记录当前的页面hash，登录成功后跳回这个页面
      window.loginInUrl = location.search.substr(1) + hash
    }
    helpers.replacePage(url)
    return true
  }
  return false
}


export function message(res, err, onlyShowMessage = false) {
  let msg = getMsg(res, err, onlyShowMessage)
  if (msg) {
    window.toast.setTxt(msg)
  }
  redirectErrorPage(res, err, onlyShowMessage)
}
