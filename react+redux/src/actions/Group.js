import request from 'superagent'
import {actionTypes, consts} from 'constants'
import utils from 'utils'
import {message} from '../msg/error'


export function receiveProjectVersionGroupDetail(projectVersionGroupDetail) {
  return {
    type: actionTypes.RECEIVE_PROJECT_VERSION_GROUP_DETAIL,
    projectVersionGroupDetail
  }
}

export function fetchProjectVersionGroupDetail(params, callback){
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.4/projects/' + params.projectId + '/version/' + params.versionId + '/goal_group/' + params.groupId
    return request
      .get(`${consts.API_URL}/v0.4/projects/${params.projectId}/version/${params.versionId}/goal_group/${params.groupId}`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if(!err){
          callback && callback(err, res)
        } else {
          message(res, err)
        }
      })
  }
}

export function postGroup(options, callback){
  return dispatch => {
    const host = consts.API_HOST
    const method = 'POST'
    const url = '/v0.4/projects/' + options.projectId + '/version/' + options.versionId + '/goal_group'
    let data = {
      'group_name': options.groupName,
      'template_id': options.templateId
    }
    return request
      .post(`${consts.API_URL}/v0.4/projects/${options.projectId}/version/${options.versionId}/goal_group`)
      .send(data)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if(res.ok){
          callback && callback(res.body)
        } else{
          message(res, err)
        }
      })
  }
}

export function patchGroup(options, callback){
  return dispatch => {
    const host = consts.API_HOST
    const method = 'PATCH'
    const url = '/v0.4/projects/' + options.projectId + '/version/' + options.versionId + '/goal_group/' + options.groupId

    let data = {
      'group_name': options.groupName
    }

    return request
      .patch(`${consts.API_URL}/v0.4/projects/${options.projectId}/version/${options.versionId}/goal_group/${options.groupId}`)
      .send(data)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if(!err){
          callback && callback(res.body)
        } else{
          message(res, err)
        }
      })
  }
}

export function delGroup(options, callback){
  return dispatch => {
    const host = consts.API_HOST
    const method = 'DELETE'
    const url = '/v0.4/projects/' + options.projectId + '/version/' + options.versionId + '/goal_group/' + options.groupId


    return request
      .del(`${consts.API_URL}/v0.4/projects/${options.projectId}/version/${options.versionId}/goal_group/${options.groupId}`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if(!err){
          callback && callback(res.body)
        } else{
          message(res, err)
        }
      })
  }
}
