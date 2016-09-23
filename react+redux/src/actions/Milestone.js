import request from 'superagent'
import {actionTypes, consts} from 'constants'
import utils from 'utils'
import {message} from '../msg/error'

export function receiveLastFinishTime(lastTime) {
  return {
    type: actionTypes.RECEIVE_LAST_FINISH_TIME,
    lastTime
  }
}

export function fetchLastFinishTime(projectId) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + projectId + '/version/lastFinishTime'

    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/version/lastFinishTime`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveLastFinishTime(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

export function RevieStateApply(options, callback) {
  return dispatch => {
    let uid = options.uid
    let status = options.status
    let projectId = options.projectId
    let versionId = options.versionId
    return request
      .post(`${consts.API_URL}/v0.1/projects/${projectId}/version/${versionId}/apply?uid=${uid}&application_status=${status}`)
      .send({
        uid: uid,
        'application_status': status
      })
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}


export function fetchReviewDetail(options, callback) {
  return dispatch => {
    let uid = options.uid
    let projectId = options.projectId
    let versionId = options.versionId
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + projectId + '/version/' + versionId + '/apply?uid=' + uid

    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/version/${versionId}/apply?uid=${uid}`)
      .send({
        uid: uid
      })
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveLastFinishTime(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

function recieveCurrentProjectMilestone(milestones){
  return {
    type: actionTypes.RECEIVE_CURRENT_MILESTONE,
    milestones: milestones
  }
}
export function clearCurrentProjectMilestone(){
  return {
    type: actionTypes.CLEAR_CURRENT_MILESTONE
  }
}
export function fetchCurrentProjectMilestones(options) {
  let dateTime = new Date()
  dateTime.setUTCHours(0, 0, 0, 0)
  options.$filter = `period_start le ${dateTime.valueOf()} and period_end ge ${dateTime.valueOf()} and audit_status in 0,1`
  options.$count = true
  options.$orderby = `period_end desc and period_start desc`
  options.ifCountDelay = true
  options.ifCountCurrent = true
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let projectId = options.projectId
    let url = `/v0.1/projects/${projectId}/projectmilestone`
    delete options.projectId
    let querys = []
    Object.keys(options).forEach((key) => (
      querys.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    ))
    if (querys.length) {
      url = url + '?' + querys.join('&')
    }
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/projectmilestone`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({ host, method, url }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(recieveCurrentProjectMilestone(res.body))
        } else {
          message(res, err)
        }
      })
  }
}
