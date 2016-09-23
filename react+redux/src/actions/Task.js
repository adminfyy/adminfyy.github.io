import request from 'superagent'
import { actionTypes, consts } from 'constants'
import utils from 'utils'
import { message } from '../msg/error'
import * as Users from './Users'

export function delVersionTask(versionTask) {
  return {
    type: actionTypes.DEL_VERSION_TASK,
    versionTask
  }
}

export function receiveProjectVersionTaskDetail(versionTask) {
  return {
    type: actionTypes.RECEIVE_PROJECT_VERSION_TASK_DETAIL,
    versionTask
  }
}

export function replaceProjectVersionTasks(versionTasks) {
  return {
    type: actionTypes.REPLACE_PROJECT_VERSION_Tasks,
    versionTasks
  }
}
// 更新文档列表选中状态
export function updateProjectNoVersionTasks(taskcode, isChecked, isAllChecked) {
  return {
    type: actionTypes.UPDATE_PROJECT_NOVERSIONS_TASKS,
    taskcode,
    isChecked,
    isAllChecked
  }
}

export function receiveProjectVersionTasks(versionTasks) {
  return {
    type: actionTypes.RECEIVE_PROJECT_VERSION_Tasks,
    versionTasks
  }
}

export function receiveProjectNoVersionTasks(options) {
  return {
    type: actionTypes.RECEIVE_PROJECT_NOVERSIONS_TASKS,
    projectNoVersionTasks: options.projectNoVersionTasks,
    isSearch: options.isSearch,
    projectId: options.projectId,
    removeTask: options.removeTask
  }
}
export function clearProjectNoVersionTasks() {
  return {
    type: actionTypes.CLEAR_PROJECT_NOVERSIONS_TASKS,
    projectNoVersionTasks: {}
  }
}
export function clearProjectVersionTasks() {
  return {
    type: actionTypes.CLEAR_PROJECT_VERSION_Tasks,
    versionTasks: {}
  }
}
// 修改文档所属版本
export function updateVersionTask(options, callback) {
  return dispatch => {
    const projectId = options.projectId
    const versionId = options.versionId
    const taskId = options.taskId
    const vId = options.vId


    const host = consts.API_HOST
    const method = 'PUT'
    const url = '/v0.1/projects/' + projectId + '/version/' + versionId + '/task/' + taskId


    return request
      .put(`${consts.API_URL}/v0.1/projects/${projectId}/version/${versionId}/task/${taskId}`)
      .set('Authorization', utils.getAuthHybrid({
        host, method, url
      }))
      .send({
        'version_id': vId
      })
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
          dispatch(delVersionTask(options))
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchProjectVersionTasks(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let limit = options.$limit ? options.$limit : 30
    let offset = options.$offset || (options.$offset = 0)
    let key = options.key || ''
    let url = '/v0.1/projects/' + options.projectId + '/version/' + options.versionId +
      '/task?key=' + encodeURIComponent(key) + '&%24limit=' + limit + '&%24offset=' + offset + '&%24count=true'

    let params = {
      key: key,
      $limit: limit,
      $offset: offset,
      $count: true
    }

    return request
      .get(`${consts.API_URL}/v0.1/projects/${options.projectId}/version/${options.versionId}/task`)
      .query(params)
      .set('Authorization', utils.getAuthHybrid({
        host, method, url
      }))
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
          if(options.isEdit){
            dispatch(replaceProjectVersionTasks(res.body))
          } else{
            dispatch(receiveProjectVersionTasks(res.body))
          }
        } else {
          message(res, err)
        }
      })
  }
}

export function getUserInfos(tasks, callback) {
  return dispatch => {
    let ids = []
    tasks.items.forEach(task => {
      if (task.receiver) {
        ids.push({
          'user_id': task.receiver
        })
      }
    })
    Users.getUserInfos(ids, function cb(data) {
      if (!data) {
        tasks.users = data
      }
      dispatch(receiveProjectVersionTasks(tasks))
      // callback&&callback(task)
    })
  }
}

export function fetchProjectNoVersionTasks(options, callback) {
  return dispatch => {
    let limit = options.$limit ? options.$limit : 20
    let url = '/v0.1/projects/' + options.projectId + '/version/' + options.versionId + '/task?%24limit=' + limit
    if (options) {
      if (parseInt(options.$offset, 10) !== 0) {
        url += '&%24offset=' + options.$offset
      } else {
        url += '&%24offset=0'
      }
    }

    let params = {
      $limit: options.$limit,
      $offset: options.$offset
    }

    return request
      .get(`${consts.API_URL}/v0.1/projects/${options.projectId}/version/${options.versionId}/task`)
      .query(params)
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
          dispatch(getUserInfos(res.body))
            // receiveProjectVersionTasks(res.body)
        } else {
          message(res, err)
        }
      })
  }
}

export function searchProjectNoVersionTasks(options, removeTask, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let offset = options.$offset || (options.$offset = 0)
    let limit = options.$limit ||
      (options.isSearch ? consts.PROJECT_MILESTONE_LIMIT
        : options.$limit = consts.PAGE_SIZE)
    let projectId = options.projectId
    options.$count = true
    let filter = options.$filter
    const url = '/v0.1/projects/' + projectId + '/version/0/task?%24offset=' + offset + '&%24limit=' +
      limit + '&%24count=true' + '&%24filter=' + encodeURIComponent(filter)
    let data = {
      $offset: offset,
      $limit: limit,
      $count: true,
      $filter: filter
    }
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/version/0/task`)
      .query(data)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveProjectNoVersionTasks({
            projectNoVersionTasks: res.body,
            isSearch: options.isSearch,
            projectId: options.projectId,
            removeTask: removeTask
          }))
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchTaskDetail(params, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + params.projectId + '/version/' + params.versionId + '/task/' + params.taskId
    let auth = utils.getAuthHybrid({host, method, url})

    return request
      .get(`${consts.API_URL}/v0.1/projects/${params.projectId}/version/${params.versionId}/task/${params.taskId}`)
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          // dispatch(getUserInfo(res.body, callback))
        } else {
          message(res, err)
        }
      })
  }
}


export function getUserInfo(task, callback) {
  return dispatch => {
    let ids = []
    if (task.designer) {
      ids.push({
        'user_id': task.designer
      })
    }
    if (task.receiver) {
      ids.push({
        'user_id': task.receiver
      })
    }
    const host = consts.UC_API_HOST
    const method = 'POST'
    const url = `/v0.93/users/actions/query`
    return request
      .post(`${consts.UC_API_ORIGIN}/v0.93/users/actions/query`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({
        host, method, url
      }))
      .send(ids)
      .end(function cb(err, res) {
        if (!err) {
          task.users = res.body
          dispatch(receiveProjectVersionTaskDetail(task))
          callback && callback(task)
        } else {
          message(res, err)
        }
      })
  }
}
