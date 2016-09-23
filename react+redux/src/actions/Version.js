import request from 'superagent'
import { actionTypes, consts } from 'constants'
import utils from 'utils'
import { message } from '../msg/error'
import * as Users from './Users'

export function receiveVersionsTotal(versionsTotal) {
  return {
    type: actionTypes.RECEIVE_VERSIONS_TOTAL,
    versionsTotal
  }
}

export function receiveWeeklyScore(weeklyScore) {
  return {
    type: actionTypes.RECEIVE_WEEKLY_SCORE,
    weeklyScore
  }
}

export function receiveProjectVersions(options) {
  switch (options.versionTimeType) {
    case consts.Milestone.cur:
      return {
        type: actionTypes.RECEIVE_PROJECT_CUR_VERSIONS,
        projectCurVersions: options.projectVersions,
        isSearch: options.isSearch,
        isCancel: options.isCancel
      }
    case consts.Milestone.undo:
      return {
        type: actionTypes.RECEIVE_PROJECT_UNDO_VERSIONS,
        projectUndoVersions: options.projectVersions,
        isCut: options.isCut,
        isSearch: options.isSearch,
        isCancel: options.isCancel
      }
    case consts.Milestone.done:
      return {
        type: actionTypes.RECEIVE_PROJECT_DONE_VERSIONS,
        projectDoneVersions: options.projectVersions,
        isCut: options.isCut,
        isSearch: options.isSearch,
        isCancel: options.isCancel
      }
    default:
      return {
        type: actionTypes.RECEIVE_PROJECT_VERSIONS,
        projectVersions: options.projectVersions
      }
  }
}

export function receiveProjectUnActiveVersions(options) {
  return {
    type: actionTypes.RECEIVE_PROJECT_UNACTIVE_VERSIONS,
    projectVersions: options.projectVersions,
    isSearch: options.isSearch
  }
}

export function receiveProjectVersionDetail(projectVersionDetail) {
  return {
    type: actionTypes.RECEIVE_PROJECT_VERSION_DETAIL,
    projectVersionDetail
  }
}

export function delGoalItem(goalItem) {
  return {
    type: actionTypes.DELETE_PROJECT_VERSION_GOAL,
    goalItem
  }
}

export function receiveProjectVersionLOG(projectVersionLog) {
  return {
    type: actionTypes.RECEIVE_PROJECT_VERSION_LOG,
    projectVersionLog
  }
}

export function selectedVersions(selectedVersions) {
  return {
    type: actionTypes.SELECTED_VERSIONS,
    selectedVersions
  }
}
export function removeVersions(selectedVersions) {
  return {
    type: actionTypes.REMOVE_VERSIONS,
    selectedVersions
  }
}
export function restoreRemoveTasks(removeTask) {
  return {
    type: actionTypes.RESTORE_REMOVE_TASK,
    removeTask
  }
}

export function copySelectedVersions(copyVersions) {
  return {
    type: actionTypes.COPY_SELECTED_VERSIONS,
    copyVersions
  }
}

export function updateSelectedVersion(taskcode, isChecked, isAllChecked) {
  return {
    type: actionTypes.UPDATE_SELECTED_VERSIONS,
    taskcode,
    isChecked,
    isAllChecked
  }
}


export function clearSelectedVersions() {
  return {
    type: actionTypes.CLEAR_SELECTED_VERSIONS,
    selectedVersions: []
  }
}

export function updateInitSelectedState(isInit){
  return {
    type: actionTypes.INIT_SELECTED_VERSIONS,
    isInit
  }
}
export function restoreTasks(tasks){
  return {
    type: actionTypes.RESTORE_TASKS,
    tasks
  }
}
export function updateVersion(updateObj, type) {
  if (!type) {
    return {
      type: actionTypes.UPDATE_VERSION,
      updateObj
    }
  }
  switch (type) {
    case 'cur':
      return {
        type: actionTypes.UPDATE_CUR_VERSIONS,
        updateObj
      }
    case 'undo':
      return {
        type: actionTypes.UPDATE_UNDO_VERSIONS,
        updateObj
      }
    case 'done':
      return {
        type: actionTypes.UPDATE_DONE_VERSIONS,
        updateObj
      }
    default:
      return {
        type: actionTypes.UPDATE_VERSION,
        updateObj
      }
  }
}
export function receiveProjectVersionGoalDetail(projectVersionGoalDetail) {
  return {
    type: actionTypes.RECEIVE_PROJECT_VERSION_GOAL,
    projectVersionGoalDetail
  }
}

export function receiveProjectVersionGroupGoals(projectVersionGroupGoals) {
  return {
    type: actionTypes.RECEIVE_PROJECT_VERSION_GROUP_GOALS,
    projectVersionGroupGoals
  }
}

export function clearProjectVersions() {
  return {
    type: actionTypes.CLEAR_PROJECT_VERSIONS,
    projectVersions: {}
  }
}

export function clearProjectCurVersions() {
  return {
    type: actionTypes.CLEAR_PROJECT_CUR_VERSIONS,
    projectVersions: {}
  }
}

export function clearProjectUndoVersions() {
  return {
    type: actionTypes.CLEAR_PROJECT_UNDO_VERSIONS,
    projectVersions: {}
  }
}

export function clearProjectDoneVersions() {
  return {
    type: actionTypes.CLEAR_PROJECT_DONE_VERSIONS,
    projectVersions: {}
  }
}

export function clearProjectUnActiveVersions() {
  return {
    type: actionTypes.CLEAR_PROJECT_UNACTIVE_VERSIONS,
    projectVersions: {}
  }
}

export function getVersionsUserInfos(versions, options, callback) {
  return dispatch => {
    let ids = []
    if (versions.items && versions.items.length > 0) {
      versions.items.forEach(version => {
        if (version.creator_uid) {
          ids.push({
            'user_id': version.creator_uid
          })
        }
      })
      Users.getUserInfos(ids, function cb(data) {
        versions.users = data
        let option = {
          projectVersions: versions,
          type: options.versionTimeType,
          versionId: options.versionId
        }
        dispatch(receiveProjectVersions(option))

        callback && callback(versions)
      })
    } else {
      let option = {
        projectVersions: versions,
        type: options.versionTimeType,
        versionId: options.versionId
      }
      versions.users = []
      dispatch(receiveProjectVersions(option))

      callback && callback(versions)
    }
  }
}

export function fetchProjectVersions(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let filter = ''
    let offset = options.$offset || (options.$offset = 0)
    let limit = options.$limit ||
      (options.isSearch ? consts.PAGE_SEARCH_SIZE : options.$limit = consts.PAGE_SIZE)
      // 默认获取审批完毕的里程碑列表
    let versionApplicationAtatus = options && options['version_application_status'] || null
    if (options.key) {
      filter += 'version_title like ' + options.key
      if (versionApplicationAtatus) {
        filter += 'and version_application_status eq ' + versionApplicationAtatus
      }
    } else if (versionApplicationAtatus) {
      filter += 'version_application_status eq ' + versionApplicationAtatus
    }
    let projectId = options.projectId
    let versionTimeType = options.versionTimeType

    options.$count = true
    let isCut = options.isCut || false
    let url = '/v0.1/projects/' + options.projectId + '/version?%24filter=' +
      encodeURIComponent(filter) + '&version_time_type=' + versionTimeType +
      '&%24offset=' + offset + '&%24limit=' +
      limit + '&%24count=true' + '&%24orderby=' + encodeURIComponent('version_code desc')

    let data = {
      $filter: filter,
      'version_time_type': versionTimeType,
      $offset: offset,
      $limit: limit,
      $count: true,
      $orderby: 'version_code desc'
    }

    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/version`)
      .query(data)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          let op1 = {
            projectVersions: res.body,
            versionTimeType: options.versionTimeType,
            isCut: isCut,
            isSearch: options.isSearch,
            isCancel: options.isCancel
          }

          dispatch(receiveProjectVersions(op1))
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}

export function isProjectMember (options, callback){
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = `/v0.1/projects/${options.project_id}/members/${options.creator_uid}`

    return request
    .get(`${consts.API_URL}/v0.1/projects/${options.project_id}/members/${options.creator_uid}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', utils.getAuthHybrid({ host, method, url }))
    .end(function cb(err, res) {
      if (!err) {
        dispatch(receiveProjectVersionDetail({...options, isCreatorInProject: true}))
      } else {
        dispatch(receiveProjectVersionDetail({...options, isCreatorInProject: false}))
      }
    })
  }
}


export function fetchProjectVersionDetail(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + options.projectId + '/version/' + options.versionId
    let auth = utils.getAuthHybrid({host, method, url})
    return request
      .get(`${consts.API_URL}/v0.1/projects/${options.projectId}/version/${options.versionId}`)
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
          dispatch(isProjectMember(res.body))
        } else {
          callback && callback(res.body)
          dispatch(receiveProjectVersionDetail({
            'project_id': 'error'
          }))
          message(res, err)
        }
      })
  }
}

export function fetchProjectVersionLog(params) {
  return dispatch => {
    const limit = consts.PROJECT_VERSION_LOG_LIMIT
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + params.projectId + '/version/' + params.versionId + '/log?%24offset=0&%24limit=' + limit + '&%24count=true'

    let options = {
      $offset: 0,
      $limit: limit,
      $count: true
    }

    return request
      .get(`${consts.API_URL}/v0.1/projects/${params.projectId}/version/${params.versionId}/log`)
      .query(options)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveProjectVersionLOG(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchProjectVersionGroupGoals(params, callback) {
  return dispatch => {
    const limit = 100
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.4/projects/' + params.projectId + '/version/' + params.versionId + '/goal_group/' + params.groupId + '/goal?%24offset=0&%24limit=' + limit + '&%24count=true'

    let options = {
      $offset: 0,
      $limit: limit,
      $count: true
    }

    return request
      .get(`${consts.API_URL}/v0.4/projects/${params.projectId}/version/${params.versionId}/goal_group/${params.groupId}/goal`)
      .query(options)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(err, res)
        } else {
          message(res, err)
        }
        // dispatch(receiveProjectVersionGroupGoals(res.body))
      })
  }
}

export function postProjectVersion(options, callback) {
  return dispatch => {
    let projectId = options.project_id
    const host = consts.API_HOST
    const method = 'POST'
    const url = '/v0.1/projects/' + projectId + '/version'

    return request
      .post(`${consts.API_URL}/v0.1/projects/${projectId}/version`)
      .send(options)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}

export function patchProjectVersion(options, callback) {
  return dispatch => {
    let projectId = options.project_id
    let versionId = options.version_id
    const host = consts.API_HOST
    const method = 'PATCH'
    const url = '/v0.1/projects/' + projectId + '/version/' + versionId

    return request
      .patch(`${consts.API_URL}/v0.1/projects/${projectId}/version/${versionId}`)
      .send(options)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
        } else {
          message(res, err)
          callback && callback(res.body)
        }
      })
  }
}

export function deleteProjectVersion(options, callback) {
  return dispatch => {
    let projectId = options.project_id
    let versionId = options.version_id
    const host = consts.API_HOST
    const method = 'DELETE'
    const url = '/v0.1/projects/' + projectId + '/version/' + versionId

    return request
      .del(`${consts.API_URL}/v0.1/projects/${projectId}/version/${versionId}`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchVersionsTotal(callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/version/count'

    return request
      .get(`${consts.API_URL}/v0.1/projects/version/count`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveVersionsTotal(res.body))
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchWeeklyScore(callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/weekly_report/count'

    return request
      .get(`${consts.API_URL}/v0.1/projects/weekly_report/count`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveWeeklyScore(res.body))
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchProjectVersionGoalDetail(options, callback) {
  return dispatch => {
    let projectId = options.projectId
    let versionId = options.versionId
    let groupId = options.groupId
    let goalId = options.goalId
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.4/projects/' + projectId + '/version/' + versionId + '/goal_group/' + groupId + '/goal/' + goalId

    return request
      .get(`${consts.API_URL}/v0.4/projects/${projectId}/version/${versionId}/goal_group/${groupId}/goal/${goalId}`)
      .send(options)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          callback(res.body)
          dispatch(receiveProjectVersionGoalDetail(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

export function postProjectVersionGoal(options, callback) {
  return dispatch => {
    let projectId = options.projectId
    let versionId = options.versionId
    let groupId = options.groupId
    const host = consts.API_HOST
    const method = 'POST'
    const url = '/v0.4/projects/' + projectId + '/version/' + versionId + '/goal_group/' + groupId + '/goal'

    return request
      .post(`${consts.API_URL}/v0.4/projects/${projectId}/version/${versionId}/goal_group/${groupId}/goal`)
      .send(options)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
        } else {
          message(res, err)
          callback && callback(res.body)
        }
      })
  }
}

export function patchProjectVersionGoal(options, callback) {
  return dispatch => {
    let projectId = options.projectId
    let versionId = options.versionId
    let groupId = options.groupId
    let goalId = options.goalId
    const host = consts.API_HOST
    const method = 'PATCH'
    const url = '/v0.4/projects/' + projectId + '/version/' + versionId + '/goal_group/' + groupId + '/goal/' + goalId

    return request
      .patch(`${consts.API_URL}/v0.4/projects/${projectId}/version/${versionId}/goal_group/${groupId}/goal/${goalId}`)
      .send(options)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}

export function deleteProjectVersionGoal(options, callback) {
  return dispatch => {
    let projectId = options.projectId
    let versionId = options.versionId
    let groupId = options.groupId
    let goalId = options.goalId
    const host = consts.API_HOST
    const method = 'DELETE'
    const url = '/v0.4/projects/' + projectId + '/version/' + versionId + '/goal_group/' + groupId + '/goal/' + goalId

    return request
      .del(`${consts.API_URL}/v0.4/projects/${projectId}/version/${versionId}/goal_group/${groupId}/goal/${goalId}`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}

/**
 * [postVersionApply 发起版本审批]
 * @method postVersionApply
 * @param  {[type]}         options  [description]
 * @param  {Function}       callback [description]
 * @return {[type]}                  [description]
 */
export function postVersionApply(options, callback) {
  return dispatch => {
    let projectId = options.projectId
    let versionId = options.versionId
    const host = consts.API_HOST
    const method = 'POST'
    const url = '/v0.1/projects/' + projectId + '/version/' + versionId + '/goto_apply'
    return request
      .post(`${consts.API_URL}/v0.1/projects/${projectId}/version/${versionId}/goto_apply`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}
