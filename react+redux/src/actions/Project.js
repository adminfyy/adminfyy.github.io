import request from 'superagent'
import {actionTypes, consts} from 'constants'
import utils from 'utils'
import {message} from '../msg/error'
import {updateProjectStatistics} from './Projects'

export function receiveProjectDetail(projectDetail) {
  return {
    type: actionTypes.RECEIVE_PROJECT_DETAIL,
    projectDetail
  }
}
export function updateProjectDetail(data) {
  return {
    type: actionTypes.UPDATE_PROJECT_DETAIL,
    data
  }
}
export function recieveProjectWeeklyReport(projectWeeklyReport, year, month) {
  return {
    type: actionTypes.RECEIVE_PROJECT_WEEKLY_REPORT,
    projectWeeklyReport,
    year,
    month
  }
}
/**
 *
 * @param month
 * @param year
 * @param isBack
 * @param reportId
 * @param isReport 周报列表上的待评价，是否要改待评价的状态
 * @returns {{type: *, month: *, year: *, isBack: *, reportId: *}}
 */
export function updateProjectWeeklyReport(month, year, isBack, reportId, isReport) {
  return {
    type: actionTypes.UPDATE_PROJECT_WEEKLY_REPORT,
    month,
    year,
    isBack,
    reportId,
    isReport
  }
}


export function clearProjectWeeklyReport() {
  return {
    type: actionTypes.CLEAR_PROJECT_WEEKLY_REPORT,
    projectWeeklyReport: {
      count: 0,
      items: []
    }
  }
}


function receiveProjectSummary(options) {
  return {
    type: actionTypes.RECEIVE_PROJECT_SUMMARY,
    projectSummary: options.projectSummary
  }
}

export function delSubProject(project) {
  return {
    type: actionTypes.DEL_SUB_PROJECT,
    project
  }
}
export function refreshSubProjects(flag) {
  return {
    type: actionTypes.REFRESH_SUB_PROJECTS,
    flag
  }
}

function receiveProjectPermission(permission) {
  return {
    type: actionTypes.RECEIVE_PROJECT_PERMISSION,
    permission
  }
}

function receiveProjectMembers(projectMembers) {
  return {
    type: actionTypes.RECEIVE_PROJECT_MEMBERS,
    projectMembers
  }
}

export function UpdateProjectMembers(updateMember) {
  return {
    type: actionTypes.UPDATE_PROJECT_MEMBERS,
    updateMember
  }
}

export function delProjectMembers(member) {
  return {
    type: actionTypes.DELETE_PROJECT_MEMBERS,
    member
  }
}

export function setSubMember(subMembers, duty) {
  return {
    type: actionTypes.SUB_ADMIN_MEMBERS,
    subMembers,
    duty
  }
}

function receiveMemberCost(memberCost) {
  return {
    type: actionTypes.RECEIVE_MEMBER_COST,
    memberCost
  }
}

function receiveProjectGoal(projectGoal) {
  return {
    type: actionTypes.RECEIVE_PROJECT_GOAL,
    projectGoal
  }
}


function delProjectGoal(delGoal) {
  return {
    type: actionTypes.DELETE_PROJECT_GOAL,
    delGoal
  }
}

function updateAllProject(project) {
  return {
    type: actionTypes.UPDATE_ALL_PROJECT,
    project
  }
}

function updateNormalProject(project) {
  return {
    type: actionTypes.UPDATE_NORMAL_PROJECT,
    project
  }
}

function updateWarnProject(project) {
  return {
    type: actionTypes.UPDATE_WARN_PROJECT,
    project
  }
}

function updateErrorProject(project) {
  return {
    type: actionTypes.UPDATE_ERROR_PROJECT,
    project
  }
}

export function clearProjectPermission() {
  return {
    type: actionTypes.RECEIVE_PROJECT_PERMISSION,
    permission: null
  }
}

export function clearProjectDetail() {
  return {
    type: actionTypes.RECEIVE_PROJECT_DETAIL,
    projectDetail: {}
  }
}

export function clearProjectVersionDetail() {
  return {
    type: actionTypes.CLEAR_PROJECT_VERSION_DETAIL,
    projectVersionDetail: {}
  }
}

export function getManagerInfo(projectDetail) {
  return dispatch => {
    let ids = [ {
      'user_id': projectDetail.project_info.manager_uid
    } ]

    const host = consts.UC_API_HOST
    const method = 'POST'
    const url = `/v0.93/users/actions/query`

    return request
      .post(`${consts.UC_API_ORIGIN}/v0.93/users/actions/query`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .send(ids)
      .end(function cb(err, res) {
        if (!err) {
          projectDetail.users = res.body
          dispatch(receiveProjectDetail(projectDetail))
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchProjectDetail(projectId, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + projectId

    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(getManagerInfo(res.body))
          callback && callback(res.body)
        } else {
          message(res, err)
        }
      })
  }
}

export function updateProjectVision(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'PUT'
    const url = '/v0.1/projects/' + options.projectId
    let projectId = options.projectId
    return request
      .put(`${consts.API_URL}/v0.1/projects/${projectId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .send(options.data)
      .end(function cb(err, res) {
        if (!err) {
          callback && callback(res)
        } else {
          message(res, err)
        }
      })
  }
}

export function unSubProject(projectId, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'POST'
    const url = `/v0.1/projects/${projectId}/actions/unsubscribe`

    return request
      .post(`${consts.API_URL}/v0.1/projects/${projectId}/actions/unsubscribe`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(delSubProject({
            'project_id': projectId
          }))
          dispatch(updateProjectStatistics(false))
          dispatch(updateAllProject({
            'project_id': projectId,
            subscribe: false
          }))
          dispatch(updateNormalProject({
            'project_id': projectId,
            subscribe: false
          }))
          dispatch(updateWarnProject({
            'project_id': projectId,
            subscribe: false
          }))
          dispatch(updateErrorProject({
            'project_id': projectId,
            subscribe: false
          }))
          callback && callback(res)
        } else {
          message(res, err)
        }
      })
  }
}

export function subProject(projectId, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'POST'
    const url = `/v0.1/projects/${projectId}/actions/subscribe`

    return request
      .post(`${consts.API_URL}/v0.1/projects/${projectId}/actions/subscribe`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(updateAllProject({
            'project_id': projectId,
            subscribe: true
          }))
          dispatch(updateProjectStatistics(true))
          dispatch(updateNormalProject({
            'project_id': projectId,
            subscribe: true
          }))
          dispatch(updateWarnProject({
            'project_id': projectId,
            subscribe: true
          }))
          dispatch(updateErrorProject({
            'project_id': projectId,
            subscribe: true
          }))
          dispatch(refreshSubProjects(true))
          callback && callback(res)
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchProjectSummary(options) {
  return dispatch => {
    const host = consts.API_HOST
    const projectId = options.projectId
    const method = 'GET'
    const url = `/v0.1/projects/${projectId}/summary`

    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/summary`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveProjectSummary({
            projectSummary: res.body
          }))
        } else {
          message(res, err)
        }
      })
  }
}

export function getMembersInfo(projectMembers, callback) {
  return dispatch => {
    let ids = []

    projectMembers.items.forEach(item => ids.push({
      'user_id': item.user_id
    }))

    const host = consts.UC_API_HOST
    const method = 'POST'
    const url = `/v0.93/users/actions/query`

    return request
      .post(`${consts.UC_API_ORIGIN}/v0.93/users/actions/query`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .send(ids)
      .end(function cb(err, res) {
        if (!err) {
          projectMembers.users = res.body
          callback && callback(projectMembers)
          if (!callback) {
            dispatch(receiveProjectMembers(projectMembers))
          }
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchProjectMembers(projectId, uid, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let url = `/v0.1/projects/${projectId}/members`
    let params
    if (uid) {
      params = {
        $filter: 'user_id nin ' + uid
      }
      url += '?%24filter=' + encodeURIComponent('user_id nin ' + uid)
    }
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/members`)
      .query(params)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          // dispatch(receiveProjectMembers(res.body))
          dispatch(getMembersInfo(res.body, callback))
        } else {
          message(res, err)
        }
      })
  }
}


export function setProjectSubAdminMember(options, callback, fail404Callback) {
  return dispatch => {
    const projectId = options[0].projectId

    const host = consts.API_HOST
    const method = 'POST'
    const url = `/v0.1/projects/${projectId}/members/subadmin`

    // delete options.projectId

    return request
      .post(`${consts.API_URL}/v0.1/projects/${projectId}/members/subadmin`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .send(options)
      .end(function cb(err, res) {
        if (!err) {
          // dispatch(receiveProjectMembers(res.body))
          if (res.body && res.body.length) {
            // 有成员被删除了，才有这个值
            callback && callback(res.body)
          } else {
            callback && callback()
            window.toast.setTxt('设置成功')
          }
        } else {
          message(res, err, fail404Callback)
        }
      })
  }
}

export function fetchProjectPermission(projectId) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = `/v0.1/permissions/projects/${projectId}`
    return request
      .get(`${consts.API_URL}/v0.1/permissions/projects/${projectId}`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveProjectPermission(res.body))
        } else {
          message(res, err)
        }
      })
  }
}


export function delMember(options, callback, fail404Callback) {
  return dispatch => {
    let projectId = options.projectId
    let uid = options.uid

    const host = consts.API_HOST
    const method = 'DELETE'
    const url = `/v0.1/projects/${projectId}/members/${uid}`

    return request
      .del(`${consts.API_URL}/v0.1/projects/${projectId}/members/${uid}`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          callback()
        } else {
          message(res, err, fail404Callback)
        }
      })
  }
}

export function fetchMemberCost(projectId) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + projectId + '/members/statistics'
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/members/statistics`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if(!err){
          dispatch(receiveMemberCost(res.body))
        }
      })
  }
}

export function updateProjectGoalSummary(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'PUT'
    const url = '/v0.1/projects/' + options.projectId
    let projectId = options.projectId
    return request
      .put(`${consts.API_URL}/v0.1/projects/${projectId}`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .send(options.goalSummary)
      .end(function cb(err, res) {
        if (!err) {
          callback(res)
        } else {
          window.toast.setTxt(res.body.message)
        }
      })
  }
}

export function fetchProjectGoal(projectId, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + projectId + '/goal?$count=true'
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/goal?$count=true`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if(!err){
          callback && callback(res.body)
          dispatch(receiveProjectGoal(res.body))
        }
      })
  }
}

export function putProjectGoal(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'PUT'
    const url = '/v0.1/projects/' + options.projectId + '/goal'
    let projectId = options.projectId
    return request
      .put(`${consts.API_URL}/v0.1/projects/${projectId}/goal`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .send(options.newGoal)
      .end(function cb(err, res) {
        if (!err) {
          callback(res)
        } else {
          window.toast.setTxt(res.body.message)
        }
      })
  }
}

export function addProjectGoal(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'POST'
    const url = '/v0.1/projects/' + options.projectId + '/goal'
    let projectId = options.projectId
    return request
      .post(`${consts.API_URL}/v0.1/projects/${projectId}/goal`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .send(options.newGoal)
      .end(function cb(err, res) {
        if (!err) {
          callback(res.body)
        } else {
          window.toast.setTxt(res.body.message)
        }
      })
  }
}

export function deleteProjectGoal(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'DELETE'
    const url = '/v0.1/projects/' + options.projectId + '/goal?month=' + options.month
    let projectId = options.projectId
    let month = options.month
    return request
      .del(`${consts.API_URL}/v0.1/projects/${projectId}/goal?month=${month}`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(delProjectGoal(options))
        } else {
          window.toast.setTxt(res.body.message)
        }
      })
  }
}

export function fecthProjectWeeklyReport(options, year, month, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let projectId = options.projectId
    let url = '/v0.1/projects/' + projectId + '/weekly_report'
    let querys = []
    delete options.projectId
    Object.keys(options).forEach((key) => (
      querys.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    ))
    if (querys.length) {
      url = url + ('?' + querys.join('&'))
    }
    let auth = utils.getAuthHybrid({
      host,
      method,
      url
    })

    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/weekly_report`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          if (callback) {
            callback(res.body)
          }
          dispatch(recieveProjectWeeklyReport(res.body, year, month))
        } else {
          message(res, err)
        }
      })
  }
}
