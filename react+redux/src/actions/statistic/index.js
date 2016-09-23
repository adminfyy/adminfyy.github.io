import request from 'superagent'
import {actionTypes, consts} from 'constants'
import utils from 'utils'
import {message} from '../../msg/error'

// 周报相关 正常
export function recieveWeeklyReport(weeklyReport) {
  return {
    type: actionTypes.RECEIVE_WEEKLYREPORT,
    weeklyReport
  }
}

export function getVersionStandard(versionStandard) {
  return {
    type: actionTypes.RECEIVE_VERSION_STANDARD,
    versionStandard
  }
}

export function cleanWeeklyReport(){
  return {
    type: actionTypes.ClEAN_WEEKLYREPORT,
    weeklyReport: {}
  }
}

export function updateRanking() {
  return {
    type: actionTypes.UPDATE_RECEIVE_WEEKLYREPORT_RANKING,
    weeklyReport: {}
  }
}
// 默认按照评分降序排列
export function fetchWeeklyReport(options, callback, isCleanFirst, updateranking){
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let url = '/v0.1/projects/weekly_report'
    let querys = []
    Object.keys(options).forEach((key) => (
      querys.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    ))
    if(querys.length){
      url = url + '?' + querys.join('&')
    }
    let auth = utils.getAuthHybrid({host, method, url})
    return request
      .get(`${consts.API_URL}/v0.1/projects/weekly_report`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          if(callback){
            callback(res.body)
          }
          if(isCleanFirst){
            dispatch(cleanWeeklyReport())
          }
          dispatch(recieveWeeklyReport(res.body))
          if(updateranking){
            dispatch(updateRanking())
          }
        } else {
          message(res, err)
        }
      })
  }
}
//  周报相关获取用户相关周报
export function recieveMineWeeklyReport(mineWeeklyReport) {
  return {
    type: actionTypes.RECEIVE_MINE_WEEKLYREPORT,
    mineWeeklyReport
  }
}
export function cleanMineWeeklyReport(){
  return {
    type: actionTypes.ClEAN_MINE_WEEKLYREPORT,
    mineWeeklyReport: {}
  }
}

export function fetchMineWeeklyReport(options, callback, isCleanFirst){
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let url = '/v0.1/projects/weekly_report'
    let querys = []
    Object.keys(options).forEach((key) => (
      querys.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    ))
    if(querys.length){
      url = url + '?' + querys.join('&')
    }
    let auth = utils.getAuthHybrid({host, method, url})
    return request
      .get(`${consts.API_URL}/v0.1/projects/weekly_report`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          if(callback){
            callback(res.body)
          }
          if(isCleanFirst){
            dispatch(cleanMineWeeklyReport())
          }
          dispatch(recieveMineWeeklyReport(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

// update milte stone
export function recieveVersionStatistic(versionStat) {
  return {
    type: actionTypes.RECEIVE_VERSION_STAT,
    versionStat
  }
}


export function cleanVersionStatistic(){
  return {
    type: actionTypes.ClEAN_VERSION_STAT,
    versionStat: {}
  }
}

// 默认按照评分降序排列
export function fetchVersionStatistic(options, callback, isCleanFirst){
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let url = '/v0.1/projects/version'
    let querys = []
    Object.keys(options).forEach((key) => (
      querys.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    ))
    if(querys.length){
      url = url + ('?' + querys.join('&'))
    }
    let auth = utils.getAuthHybrid({host, method, url})
    return request
      .get(`${consts.API_URL}/v0.1/projects/version`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          if(callback){
            callback(res.body)
          }
          if(isCleanFirst){
            dispatch(cleanVersionStatistic())
          }
          dispatch(recieveVersionStatistic(res.body))
        } else {
          message(res, err)
        }
      })
  }
}


// update milte stone

export function recieveReachStandardVersionStatistic(rsVersionStat) {
  return {
    type: actionTypes.RECEIVE_RS_VERSION_STAT,
    rsVersionStat
  }
}


export function cleanReachStandardVersionStatistic(){
  return {
    type: actionTypes.ClEAN_RS_VERSION_STAT,
    rsVersionStat: {}
  }
}

// 默认按照评分降序排列
export function fetchReachStandardVersionStatistic(options, callback, isCleanFirst){
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let url = '/v0.1/projects/version/standards'
    let querys = []
    Object.keys(options).forEach((key) => (
      querys.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    ))
    if(querys.length){
      url = url + ('?' + querys.join('&'))
    }
    let auth = utils.getAuthHybrid({host, method, url})
    return request
      .get(`${consts.API_URL}/v0.1/projects/version/standards`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          if(callback){
            callback(res.body)
          }
          if(isCleanFirst){
            dispatch(cleanReachStandardVersionStatistic())
          }
          dispatch(recieveReachStandardVersionStatistic(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchVersionStandard(callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let url = '/v0.1/projects/version/standards_count'
    let auth = utils.getAuthHybrid({host, method, url})

    return request
      .get(`${consts.API_URL}/v0.1/projects/version/standards_count`)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (err) {
          message(res, err)
        } else {
          dispatch(getVersionStandard(res.body))
          callback && callback(res.body)
        }
      })
  }
}
