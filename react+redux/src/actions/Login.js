import request from 'superagent'
import {
  consts
} from 'constants'
import utils from 'utils'
import {
  message
} from '../msg/error'
import * as helpers from 'utils/helpers'
import {
  imOpenInWeb
} from 'utils/im'
const Base64 = require('js-base64/base64').Base64


export function login(options, callback) {
  return dispatch => {
    return request
      .post(`${consts.UC_API_ORIGIN}/v0.93/tokens`)
      .send(options)
      .set('Content-Type', 'application/json')
      .end(function cb(err, res) {
        if (err) {
          callback(res.body.message)
        } else {
          // alert('登录成功')
          utils.setToken(res.body)
          let url = './?token=' + utils.makeTokenStr()
          if (imOpenInWeb()) {
            if (window.loginInUrl) {
              url = url + '&' + window.loginInUrl
            }
          }
          debugger
          window.location.href = url
          // callback()
        }
      })
  }
}


export function valid(tokenStr, callback) {
  return dispatch => {
    // 手机端应用消息跳转过来的不需要走这个分支
    if (typeof Bridge !== 'undefined' && utils.isFromAppForSearch()) {
      return callback && callback('success')
    }

    if (tokenStr === '') {
      return callback && callback('error')
    }

    tokenStr = tokenStr.slice(7).split('&')[0]

    if (utils.getStorage('tokenStr') === tokenStr) {
      return callback && callback('success')
    }

    let data

    if (tokenStr.indexOf('MAC') === 0) {
      data = utils.parseToken(decodeURIComponent(tokenStr))
    } else {
      data = utils.parseToken(Base64.decode(tokenStr))
    }

    const accessToken = data['access_token']
    delete data.access_token

    return request
      .post(`${consts.UC_API_ORIGIN}/v0.93/tokens/${accessToken}/actions/valid`)
      .set('Content-Type', 'application/json')
      .send(data)
      .end(function cb(err, res) {
        if (err) {
          message(res, err)
          callback && callback('error')
        } else {
          utils.setStorage('tokenStr', tokenStr)
          utils.setToken(res.body)
          callback && callback('success')
        }
      })
  }
}
