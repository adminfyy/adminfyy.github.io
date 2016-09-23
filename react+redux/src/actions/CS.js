import request from 'superagent'
import {consts} from 'constants'
import utils from 'utils'
import {message} from '../msg/error'

export function fetchCSSession(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let url = '/v0.1/uploads/session'
    let querys = []
    Object.keys(options).forEach((key) => (
      querys.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    ))
    if (querys.length) {
      url = url + '?' + querys.join('&')
    }
    return request
      .get(`${consts.API_URL}/v0.1/uploads/session`)
      .query(options)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if(!err){
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}
