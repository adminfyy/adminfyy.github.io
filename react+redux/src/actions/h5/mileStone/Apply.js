import request from 'superagent'
import { actionTypes, consts } from 'constants'
import utils from 'utils'
import { message } from '../../../msg/error'


export function receiveH5VersionTasks(tasks) {
  return {
    type: actionTypes.H5_RECEIVE_VERSION_TASKS,
    versionTasks: tasks
  }
}
export function clearH5VersionTasks() {
  return {
    type: actionTypes.H5_CLEAR_VERSION_TASKS,
    versionTasks: {items:[]}
  }
}

export function receiveVersionStatus(applyStatus) {
  return {
    type: actionTypes.RECEIVE_VERSION_STATUS,
    applyStatus
  }
}

export function receiveApplyHistory(applyHistory) {
  return {
    type: actionTypes.RECEIVE_VERSION_APPLY__HISTORY_LIST,
    applyHistory
  }
}

export function updateApplyHistory(operateId) {
  return {
    type: actionTypes.UPDATE_APPLY_HISTORY,
    operateId
  }
}

export function clearApplyHistory() {
  return {
    type: actionTypes.CLEAR_VERSION_APPLY__HISTORY_LIST
  }
}

export function clearVersionStatus() {
  return {
    type: actionTypes.CLEAR_VERSION_STATUS,
    applyStatus:null
  }
}

export function updateVersionState(applyStatus){
  return {
    type: actionTypes.UPDATE_VERSION_STATUS,
    applyStatus
  }
}

export function receiveVersionPermission(versionPermission) {
  return {
    type: actionTypes.RECEIVE_VERSION_PERMISSION,
    versionPermission
  }
}

export function clearVersionPermission() {
  return {
    type: actionTypes.CLEAR_VERSION_PERMISSION,
    versionPermission:null
  }
}


export function fetchProjectH5VersionTasks(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let limit = options.$limit ? options.$limit : 40
    let offset = options.$offset || (options.$offset = 0)
    let url = '/v0.1/projects/' + options.projectId + '/version/' + options.versionId +
      '/task?%24limit=' + limit + '&%24offset=' + offset + '&%24count=true'

    let params = {
      $limit: limit,
      $offset: offset,
      $count: true
    }
    return request
      .get(`${consts.API_URL}/v0.1/projects/${options.projectId}/version/${options.versionId}/task`)
      .query(params)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
          dispatch(receiveH5VersionTasks(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchProjectH5ApplyStatus(options, callback) {
  return dispatch => {
    let uid = options.uid
    let projectId = options.projectId
    let versionId = options.versionId
    let applyId = options.applyId
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + projectId + '/version/' + versionId + '/apply/' + applyId + '?uid=' + uid
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/version/${versionId}/apply/${applyId}`)
      .query({
        uid: uid
      })
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveVersionStatus(res.body))
          callback && callback(res.body)
        } else {
            message(res, err)
        }
      })
  }
}

export function applyProject(options, callback) {
  return dispatch => {
    let uid = options.uid
    let status = options.status
    let projectId = options.projectId
    let versionId = options.versionId
    let applyId = options.applyId
    let applicationComment = options.application_comment
    const host = consts.API_HOST
    const method = 'POST'
    const url = '/v0.1/projects/' + projectId +
        '/version/' + versionId + '/apply/' + applyId
    return request
      .post(`${consts.API_URL}/v0.1/projects/${projectId}/version/${versionId}/apply/${applyId}`)
      .send({
        application_status: status,
        application_comment: applicationComment
      })
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
        } else {
          message(res, err)
          callback && callback(res.body)
          receiveVersionStatus({
            result: true})
        }
      })
  }

}
export function getUserInfoHistory(applyHistory) {
  return dispatch => {
    let ids = []
    applyHistory.items && applyHistory.items.forEach(apply =>
      apply.applications.forEach(item =>
        ids.push({'user_id': item.reviewer_uid})
      )
    )
    if(!ids.length){
      return null
    }
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
          applyHistory.users = res.body
          dispatch(receiveApplyHistory(applyHistory))
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchApplyList(options, callback) {
  return dispatch => {
    let projectId = options.projectId
    let versionId = options.versionId
    let applyId = options.applyId
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + projectId + '/version/' + versionId + '/apply/' + applyId + '/list'

    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/version/${versionId}/apply/${applyId}/list`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          let applyList = {
            count: res.body.length,
            items: []
          }
          let applications = []
          res.body.forEach(applyItem => {
            applications.push(applyItem)
          })
          applyList.items.push({applications: applications})
          dispatch(getUserInfoHistory(applyList))
          callback && callback(applyList)
        } else {
            message(res, err)
        }
      })
  }
}

export function fetchApplyHistory(options, callback) {
  return dispatch => {
    let projectId = options.projectId
    let versionId = options.versionId
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + projectId + '/version/' + versionId + '/apply?%24count=true'
    let params = {
      $count: true
    }
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/version/${versionId}/apply`)
      .query(params)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(getUserInfoHistory(res.body))
          callback && callback(res.body)
        } else {
            message(res, err)
        }
      })
  }
}
