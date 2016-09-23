// im应用消息的判断
import {mobile} from 'nd-browser'

export function imOpenInWeb(){
  // 如果是应用消息点开的，且是在浏览器中打开的--返回true，才跳转到登录页面
  // is_from_app_msg只要从应用消息过来的都会带这个
  return !mobile && window.location.search.indexOf('is_from_app_msg') !== -1
}

export function imOpenInWebFirstPage(){
  // 如果是应用消息点开的，且是第一个页面，不需要返回按钮
  // isFromApp这个是从应用消息过来，只有应用消息过来的第一个页面会带。从第一个页面跳转到其他页面都没有带
  return !mobile && window.location.hash.indexOf('isFromApp') !== -1
}
