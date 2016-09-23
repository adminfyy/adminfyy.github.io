let CryptoJS = require('nd-project-cryptojs')
let md5 = require('nd-md5')
let dateTime = require('../utils/dateTime')
let photoFunc = require('./misc/orginalJS')
const Base64 = require('js-base64/base64').Base64
import * as helpers from 'utils/helpers'
import parseQuery from 'utils/query'
import imOpenInWeb from 'utils/im'
import {
  consts
} from 'constants'
import {
  setStorage,
  getStorage,
  removeStorage
} from './storage'

function nonce(diff) {
  function rnd(min, max) {
    let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8',
      '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
      'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
      'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
      'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
      'V', 'W', 'X', 'Y', 'Z'
    ]

    let range = max ? max - min : min
    let str = ''
    let i
    let length = arr.length - 1

    for (i = 0; i < range; i++) {
      str += arr[Math.round(Math.random() * length)]
    }

    return str
  }

  return new Date().getTime() + (diff || 0) + ':' + rnd(8)
}

// 获取 token
function getToken() {
  let token = getStorage('token')
  if (!token) return null

  return JSON.parse(token)
}
// 设置 token
function setToken(data) {
  data.diff = new Date(data['server_time']) - new Date()
  let jsonString = JSON.stringify(data)
  setStorage('token', jsonString)
}
/* eslint no-redeclare:0 */
function md5(value) {
  return md5(value)
}

function getUserInfo() {
  let userInfo = getStorage('userInfo')
  if (!userInfo) return null

  userInfo = JSON.parse(userInfo)
  if (userInfo) {
    let args = [].slice.call(arguments)
    let key
    while ((key = args.shift()) && userInfo) {
      userInfo = userInfo[key]
    }
  }
  return userInfo
}

function parseToken(token) {
  let authrization = token.match(/id\=\s*"(.*?)",nonce\=\s*"(.*?)",mac\=\s*"(.*?)"/)
    // 如果是手机端的就调用的Bridge的getMACContent方法，不需要再走token了
  if (authrization === null) return false
  return {
    'access_token': authrization[1],
    'nonce': authrization[2],
    'mac': authrization[3],
    'request_uri': '/',
    'host': location.hostname,
    'http_method': 'GET'
  }
}

// 判断是否从应用消息跳转过来,这个是用来判断路由，隐藏返回按钮用的
function isFromAppForHash() {
  const hashStr = window.location.hash
  return hashStr.indexOf('isFromApp') > -1
}
/*
 * 判断是否从应用消息跳转过来,这个是用来判断search里面是否含有is_from_app_msg
 * ，因为search上的是任何页面都会带过去的，用来判断是否从app过来的
 */
function isFromAppForSearch() {
  const searchStr = window.location.search
  return searchStr.indexOf('is_from_app_msg') > -1
}


/*
 *判断是里程碑创建人，vp，ceo
 */
function isCreatorOrVC(creatorUid, projectId, roles) {
  let userId = this.getToken().user_id
  return +userId === +creatorUid || helpers.checkPermission(consts.PERMISSION_TYPE.editVersion, projectId, roles)
}
module.exports = {
  getAuth: function(token) {
    let options = getToken()
    if (!options) {
      // 用户没有登录过，跳转到登录页面
      return ''
    }
    options.nonce = nonce(options.diff)
    let strAuth = 'MAC id="' + options.access_token + '",nonce="' + options.nonce + '",mac="'
    let requestContent = options.nonce + '\n' + token.method + '\n' + token.url + '\n' + token.host + '\n'
    let hash = CryptoJS.HmacSHA256(requestContent, options.mac_key)
    let mac = hash.toString(CryptoJS.enc.Base64)
    strAuth += mac + '"'
    return strAuth
  },
  /**
   * [function app下授权验证]
   * @method function
   * @param  {[type]} options [host + url + method]
   * @return {[type]}         [description]
   */
  getAuthHybrid: function(options) {
    if (typeof Bridge !== 'undefined') {
      // 解决多次请求的导致nonce串无效
      let nonceCountKey = 'nonceCount'
      let curUid = helpers.getUid()

      if (curUid && +helpers.getSearchString('user_id') !== +curUid) {
        this.setStorage(nonceCountKey, '0')
      }
      let count = this.getStorage(nonceCountKey) || 0
      this.setStorage(nonceCountKey, (++count) + '')
      let uc = Bridge.require('UC')
      let url = 'http://' + options.host + options.url
      let ret = uc.getMACContent({
        'url': url,
        'method': options.method
      })

      if (ret.result === true) {
        let strAuth = ret.returnMessage.replace(/\\/g, '')
          // 以下代码解决从手机应用im消息跳转过来的问题

        if (+this.getStorage(nonceCountKey) > 1) {
          // 解决多次请求的导致nonce串无效
          return strAuth
        }
        // 推送消息分支
        /* eslint max-depth:0 */
        if (this.isFromAppForSearch()) {
          let data
          if (strAuth.indexOf('MAC') === 0) {
            data = parseToken(decodeURIComponent(strAuth))
          } else {
            data = parseToken(Base64.decode(strAuth))
          }
          data.host = options.host
          data['request_uri'] = options.url
          const accessToken = data.access_token
          let token = {
            'access_token': accessToken,
            'user_id': helpers.getSearchString('user_id')
          }
          this.setStorage('token', JSON.stringify(token))
            //  this.setStorage('userInfo',{nick_name:'','user_id':helpers.getSearchString('user_id')})
        }
        return strAuth
      } else {
        window.toast.setText('授权失败： ' + ret.message)
      }
    } else {
      return this.getAuth(options)
    }
  },
  setStorage: setStorage,
  getStorage: getStorage,
  getToken: getToken,
  setToken: setToken,
  parseToken: parseToken,
  removeStorage: removeStorage,
  dateTime: dateTime,
  md5: md5,
  isFromAppForSearch: isFromAppForSearch,
  isFromAppForHash: isFromAppForHash,
  isCreatorOrVC: isCreatorOrVC,
  makeTokenStr: function() {
    let option = {
      host: window.location.hostname,
      url: '/',
      method: 'GET'
    }
    let result = this.getAuth(option) + ',request_uri="/",host="' + option.host + '"'
    return Base64.encode(result)
  },
  getUserInfo: getUserInfo,
  cutPhoto: photoFunc.cutPhoto,
  UploadPhoto: photoFunc.UploadPhoto,
  parseQuery,
  imOpenInWeb
}
