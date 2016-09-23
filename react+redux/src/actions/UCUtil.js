// UCUtil.js

import request from 'superagent'
import {actionTypes, consts} from 'constants'
import utils from 'utils'
import {message} from '../msg/error'

function receiveTimestamp(options) {
  return {
    type: actionTypes.RECEIVE_SEVER_TIME,
    Timestamp: options.Timestamp
  }
}

export function sysTimestamp() {
  return dispatch => {
    // host不带http://
    const host = consts.UC_API_HOST
    const method = 'GET'
    let url = `/v0.93/server/time`
    return request
      .get(`${consts.UC_API_ORIGIN}/v0.93/server/time`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveTimestamp({
            Timestamp: res.body
          }))
        } else {
          message(res, err)
        }
      })
  }
}
