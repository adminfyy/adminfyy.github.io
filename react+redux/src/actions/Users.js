import request from 'superagent'
import {actionTypes, consts} from 'constants'
import utils from 'utils'
import {message} from '../msg/error'

function receiveUsers(options) {
  return {
    type: actionTypes.RECEIVE_USERS,
    users: options.users,
    isSearch: options.isSearch
  }
}

export function clearUsers(options) {
  return {
    type: actionTypes.CLEAR_USERS,
    users: {}
  }
}

function receiveDuties(options) {
  return {
    type: actionTypes.RECEIVE_DUTIES,
    duties: options.duties
  }
}

function receiveUCUserRoles(options) {
  return {
    type: actionTypes.RECEIVE_USER_ROLES,
    roles: options.items
  }
}

export function getOrgId() {
  return dispatch => {
    const userId = require('utils').getToken().user_id
      // host不带http://
    const host = consts.UC_API_HOST
    const method = 'GET'
    let url = `/v0.93/users/${userId}?realm=sdp.nd`
    return request
      .get(`${consts.UC_API_ORIGIN}/v0.93/users/${userId}?realm=sdp.nd`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          utils.setStorage('userInfo', JSON.stringify(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchUsers(options, callback) {
  return dispatch => {
    const host = consts.UC_API_HOST
    const method = 'GET'
    const orgId = JSON.parse(utils.getStorage('userInfo')).org_exinfo.org_id || 491036501742
    let url = `/v0.93/organizations/${orgId}/orgnodes/0/users/actions/search`
    const isSearch = options && options.isSearch

    if (options) {
      url += '?name=' + encodeURIComponent(options.name) + '&%24offset=' + options.$offset + '&%24limit=' + options.$limit
    }

    if (options) {
      delete options.isSearch
    }

    return request
      .get(`${consts.UC_API_ORIGIN}/v0.93/organizations/${orgId}/orgnodes/0/users/actions/search`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveUsers({
            users: res.body,
            isSearch: isSearch
          }))
        } else {
          message(res, err)
        }
        callback && callback(res.body)
      })
  }
}

export function fetchDuties(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let url = '/v0.1/permissions/duty'

    return request
      .get(`${consts.API_URL}/v0.1/permissions/duty`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveDuties({
            duties: res.body
          }))
          callback && callback()
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchUCUserRoles1(callback) {
  return dispatch => {
    const userInfo = JSON.parse(require('utils').getStorage('userInfo'))
    const orgId = userInfo.org_exinfo.org_id
    const userId = require('utils').getToken().user_id
    const host = consts.UC_API_HOST
    const method = 'GET'
    let realm = orgId + '.nd.projectmanage.com'
    let url = '/v0.93/users/' + userId + '/roles?realm=' + realm

    return request
      .get(`${consts.UC_API_ORIGIN}/v0.93/users/${userId}/roles`)
      .query({
        'realm': realm
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveUCUserRoles(res.body))
        } else {
          message(res, err)
        }
        callback && callback()
      })
  }
}


export function fetchUCUserRoles(callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
     // let url = '/v0.93/users/'+user_id+'/roles?realm=' + realm
    let url = '/v0.1/permissions/roles'
    return request
      .get(`${consts.API_URL}/v0.1/permissions/roles`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if(!err) {
          dispatch(receiveUCUserRoles(res.body))
        } else {
          message(res, err)
        }
        callback && callback()
      })
  }
}

export function selectDuty(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'POST'
    let url = `/v0.1/projects/${options.projectid}/members`

    return request
      .post(`${consts.API_URL}/v0.1/projects/${options.projectid}/members`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .send(options.data)
      .end(function cb(err, res) {
        if(!err) {
          dispatch(receiveDuties({
            duties: res.body
          }))
          callback && callback()
        } else{
          message(res, err)
        }
      })
  }
}

export function getUserInfos (ids, callback){
  const host = consts.UC_API_HOST
  const method = 'POST'
  const url = `/v0.93/users/actions/query`

  return request
  .post(`${consts.UC_API_ORIGIN}/v0.93/users/actions/query`)
  .set('Content-Type', 'application/json')
  .set('Authorization', utils.getAuthHybrid({ host, method, url }))
  .send(ids)
  .end(function cb(err, res) {
    if (!err) {
      callback && callback(res.body)
    } else {
      message(res, err)
    }
  })
}
