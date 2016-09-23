import request from 'superagent'
import { actionTypes, consts } from 'constants'
import utils from 'utils'
import {message} from '../msg/error'
function recieveCurrentProjectRoadMaps(roadmaps){
  return {
    type: actionTypes.RECEIVE_CURRENT_ROADMAP,
    roadmaps: roadmaps
  }
}

function recieveProjectRoadMaps(roadmaps, options){
  return {
    type: actionTypes.RECEIVE_ROADMAP,
    roadmaps: roadmaps,
    isSearch: options.isSearch
  }
}
export function clearCurrentProjectRoadmaps(){
  return {
    type: actionTypes.CLEAR_CURRENT_ROADMAP
  }
}
export function clearProjectRoadmaps(){
  return {
    type: actionTypes.CLEAR_ROADMAP
  }
}
export function fetchCurrentProjectRoadMaps(options) {
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
    let url = `/v0.1/projects/${projectId}/projectroadmap`
    delete options.projectId
    let querys = []
    Object.keys(options).forEach((key) => (
      querys.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    ))
    if (querys.length) {
      url = url + '?' + querys.join('&')
    }
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/projectroadmap`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({ host, method, url }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(recieveCurrentProjectRoadMaps(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchProjectRoadMaps(options, callback) {
  options.$count = true
  options.$orderby = `period_end desc and period_start desc`
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let projectId = options.projectId
    let url = `/v0.1/projects/${projectId}/projectroadmap`
    delete options.projectId
    let querys = []
    Object.keys(options).forEach((key) => (
      querys.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    ))
    if (querys.length) {
      url = url + '?' + querys.join('&')
    }
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/projectroadmap`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({ host, method, url }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(recieveProjectRoadMaps(res.body, options))
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}
