import request from 'superagent'
import { actionTypes, consts } from 'constants'
import utils from 'utils'
import { message } from '../../../msg/error'

export function receiveNoVersionTaskDetail(versionTask) {
  return {
    type: actionTypes.RECEIVE_PROJECT_NO_VERSION_TASK_DETAIL,
    versionTask
  }
}

export function receiveProjectNoVersionDetail(projectVersionDetail,isFail) {
  return {
    type: actionTypes.RECEIVE_PROJECT_VERSION_DETAIL,
    projectVersionDetail,
    isFail
  };
}




export function receiveApplicationStatus(applyStatus) {
  return {
    type: actionTypes.RECEIVE_APPLICATION_STATUS,
    applyStatus
  }
}

export function updateTaskState(taskStatus){
  return {
    type: actionTypes.UPDATE_TASK_STATUS,
    taskStatus
  }
}
/**
 * [taskApply 审批文档所属版本的变更]
 * @method taskApply
 * @param  {[type]}   options  [参数]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function taskApply(options, callback) {
  return dispatch => {
    let uid = options.uid
    let status = options.status
    let projectId = options.projectId
    let versionId = options.versionId
    let taskId = options.taskId
    const host = consts.API_HOST
    const method = 'POST'
    const url = '/v0.1/projects/' + projectId + '/version/' + versionId + '/task/' + taskId + '/apply?uid=' + uid + '&application_status=' + status
    return request
      .post(`${consts.API_URL}/v0.1/projects/${projectId}/version/${versionId}/task/${taskId}/apply?uid=${uid}&application_status=${status}`)
      .send({
        uid: uid,
        application_status: status
      })
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

export function fetchPersonalTaskApply(options, callback) {
  return dispatch => {
    let uid = options.uid
    let projectId = options.projectId
    let versionId = options.versionId
    let taskId = options.taskId
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + projectId + '/version/' + versionId + '/task/' + taskId + '/apply?uid=' + uid
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/version/${versionId}/task/${taskId}/apply?uid=${uid}`)
      .send({
        uid: uid
      })
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveApplicationStatus(res.body))
        } else {
          if (res.body.code !== 'PROJECT/ACCESS_DENIED'){
            message(res, err)
          }
        }
      })
  }
}

export function fetchNoVersionTaskDetail(params, callback) {
  return dispatch => {

    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + params.projectId + '/version/' + params.versionId + '/task/' + params.taskId
    return request
      .get(`${consts.API_URL}/v0.1/projects/${params.projectId}/version/${params.versionId}/task/${params.taskId}`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveNoVersionTaskDetail(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchProjectNoVersionDetail(options, callback) {
  return dispatch => {
    const host = consts.API_HOST;
    const method = 'GET';
    const url = '/v0.1/projects/' + options.projectId + '/version/' + options.versionId;

    return request
      .get(`${consts.API_URL}/v0.1/projects/${options.projectId}/version/${options.versionId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveProjectNoVersionDetail(res.body));
          callback && callback(res.body)
        } else {
          dispatch(receiveProjectNoVersionDetail({},true))
          message(res, err);
        }
      });
  };
}
