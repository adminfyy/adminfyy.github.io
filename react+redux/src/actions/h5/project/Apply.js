import request from 'superagent'
import { actionTypes, consts } from 'constants'
import utils from 'utils'
import { message } from '../../../msg/error'


export function receiveH5ProjectVersion(reportVersions) {
  return {
    type: actionTypes.H5_RECEIVE_PROJECT_VERSION,
    reportVersions
  }
}

export function receiveH5ProjectInfo(projectInfo) {
  return {
    type: actionTypes.H5_RECEIVE_PROJECT_INFO,
    projectInfo
  }
}

export function receiveH5WeeklyReportDetail(reportDetail) {
  return {
    type: actionTypes.H5_RECEIVE_REPORT_DETAIL,
    reportDetail
  }
}

export function fetchH5ProjectVersions(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let offset = options.$offset || 0
    let limit = 100 ||
      (options.isSearch ? consts.PAGE_SEARCH_SIZE : options.$limit = consts.PAGE_SIZE)
    let projectId = options.projectId
    //默认获取审批完毕的里程碑列表
    let version_time_type = options && options.version_time_type || 1
    options.$count = true


    const url = '/v0.1/projects/' + options.projectId + '/version?' + 'version_time_type=' + version_time_type +
      '&%24offset=' + offset + '&%24limit=' +
      limit + '&%24count=true'


    let data = {
      version_time_type: version_time_type,
      $offset: offset,
      $limit: limit,
      $count: true
    }

    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/version`)
      .query(data)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveH5ProjectVersion(res.body, options))

        } else {
          message(res, err)
        }
      })
  }
}

export function fetchH5WeeklyReportDetail(options, callback) {
  return dispatch => {
    let projectId = options.projectId
    let reportId = options.reportId
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + projectId + '/weekly_report/' + reportId
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/weekly_report/${reportId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveH5WeeklyReportDetail(res.body, options))
        } else {
          message(res, err)
        }
      })
  }
}

export function applyReport(options, callback) {
  return dispatch => {
    let uid = options.uid
    let status = options.status
    let projectId = options.projectId
    let reportId = options.reportId
    let score = options.score
    const host = consts.API_HOST
    const method = 'PATCH'
    const url = '/v0.1/projects/' + projectId + '/weekly_report/' + reportId
    return request
      .patch(`${consts.API_URL}/v0.1/projects/${projectId}/weekly_report/${reportId}`)
      .send({
        reporter_uid: uid,
        progress_status: status,
        progress_description: options.comment,
        progress_score: score
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


export function fetchH5ProjectInfo(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = '/v0.1/projects/' + options.projectId + '/info'
    let projectId = options.projectId
    let auth = utils.getAuthHybrid({host, method, url})
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/info`)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveH5ProjectInfo(res.body, options))
        } else {
          message(res, err)
        }
      })
  }
}
