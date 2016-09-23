import request from 'superagent'
import {actionTypes, consts} from 'constants'
import utils from 'utils'
import {message} from '../../msg/error'

function receiveNotickChecklist(checklist) {
  return {
    type: actionTypes.RECEIVE_NOTICE_CHECKLIST,
    checklist
  }
}

export function cleanNoticeChecklist(){
  return {
    type: actionTypes.ClEAN_NOTICE_CHECKLIST,
    versionStat: {}
  }
}

function getMembersInfo(checklist) {
  return dispatch => {
    let ids = []

    checklist.items.forEach(item => ids.push({'user_id': item.receive_uid}))

    const host = consts.UC_API_HOST
    const method = 'POST'
    const url = `/v0.93/users/actions/query`

    return request
      .post(`${consts.UC_API_ORIGIN}/v0.93/users/actions/query`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .send(ids)
      .end(function cb(err, res) {
        if (!err) {
          checklist.users = res.body
          dispatch(receiveNotickChecklist(checklist))
        } else {
          message(res, err)
        }
      })
  }
}

export function fecthNoticeChecklist(options, callback, isCleanFirst) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let projectId = options.projectId
    let notificationId = options.notificationId
    let url = `/v0.1/projects/${projectId}/notifications/${notificationId}/checklist`
    let querys = []
    delete options.projectId
    delete options.notificationId
    Object.keys(options).forEach((key) => (
      querys.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    ))
    if(querys.length){
      url = url + ('?' + querys.join('&'))
    }
    let auth = utils.getAuthHybrid({host, method, url})
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/notifications/${notificationId}/checklist`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          if(isCleanFirst){
            dispatch(cleanNoticeChecklist())
          }
          if(callback){
            callback(res.body)
          }
          dispatch(getMembersInfo(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

function receiveNoticeCheckNum(checkNum) {
  return {
    type: actionTypes.RECEIVE_NOTICE_CHECK_NUM,
    checkNum
  }
}

export function fecthNoticeCheckNum(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let projectId = options.projectId
    let notificationId = options.notificationId
    let url = `/v0.1/projects/${projectId}/notifications/${notificationId}/check_num`
    let auth = utils.getAuthHybrid({host, method, url})
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/notifications/${notificationId}/check_num`)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          if(callback){
            callback(res.body)
          }
          dispatch(receiveNoticeCheckNum(res.body))
        } else {
          message(res, err)
        }
      })
  }
}
