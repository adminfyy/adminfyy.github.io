import request from 'superagent'
import {
  actionTypes,
  consts
} from 'constants'
import utils from 'utils'
import * as helpers from '../../utils/helpers'
import {
  message
} from '../../msg/error'

// 通知提醒相关
export function recieveNotifications(notifications) {
  return {
    type: actionTypes.RECEIVE_NOTIFICATIONS,
    notifications
  }
}

export function cleanNotifications() {
  return {
    type: actionTypes.ClEAN_NOTIFICATIONS,
    notifications: {}
  }
}

// 通知详情
export function receiveNotificationDetail(notification) {
  return {
    type: actionTypes.RECEIVE_NOTIFICATION,
    notification
  }
}

// 通知的回复列表
export function recieveNotificationReply(replys) {
  return {
    type: actionTypes.RECEIVE_NOTIFICATION_REPLYS,
    replys
  }
}
export function updateNotifications(usernames) {
  return {
    type: actionTypes.UPDATE_NOTIFICATIONS,
    usernames: usernames
  }
}

export function updateNotification(notification, index) {
  return {
    type: actionTypes.UPDATE_NOTIFICATION,
    notification: notification,
    index: index
  }
}

export function updateSentTime(sentTimeType, sentTime) {
  return {
    type: actionTypes.UPDATE_SENT_TIME,
    sentTimeType: sentTimeType,
    sentTime: sentTime
  }
}
export function addNotificationReply(reply) {
  return {
    type: actionTypes.ADD_NOTIFICATION_REPLY,
    reply
  }
}

export function cleanNotificationReply(reply) {
  return {
    type: actionTypes.CLEAN_NOTIFICATION_REPLY,
    reply
  }
}
export function updateNotificationReply(usernames) {
  return {
    type: actionTypes.UPDATE_NOTIFICATION_REPLY,
    usernames
  }
}

// 拼接用户名
export function fetchUserNames(result, type, uidPropertyName = 'send_uid') {
  return dispatch => {
    let ids = []
    result.items.forEach(item => ids.push({
      'user_id': item[uidPropertyName]
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
          if (type === 'detail') {
            // 详情页获取发送者名称
            result['send_uname'] = res.body.items[0]['nick_name']
            if (result.send_uid + '' === helpers.getUid() + '') {
              result['send_uname'] = '我'
            }
            delete result.items
            dispatch(receiveNotificationDetail(result))
          } else if (type === 'replylist') {
            dispatch(updateNotificationReply(res.body))
          } else {
            dispatch(updateNotifications(res.body))
          }
        } else {
          message(res, err)
        }
      })
  }
}

export function fetchNotifications(options, callback, isCleanFirst) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let projectId = options.projectId
    let url = `/v0.1/projects/${projectId}/notifications`
    delete options.projectId
    let querys = []
    Object.keys(options).forEach((key) => (
      querys.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    ))
    if (querys.length) {
      url = url + '?' + querys.join('&')
    }
    let auth = utils.getAuthHybrid({
      host,
      method,
      url
    })
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/notifications`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          if (callback) {
            callback(res.body)
          }
          if (isCleanFirst) {
            dispatch(cleanNotifications())
          }
          dispatch(recieveNotifications(res.body))
          dispatch(fetchUserNames(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

export function postNotice(options, callback) {
  return dispatch => {
    let projectId = options.project_id
    const host = consts.API_HOST
    const method = 'POST'
    const url = '/v0.1/projects/' + projectId + '/notifications'

    return request
      .post(`${consts.API_URL}/v0.1/projects/${projectId}/notifications`)
      .send(options)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
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

function recieveNoticeUnreadCount(count) {
  return {
    type: actionTypes.RECEIVE_NOTICE_UNREAD_COUNT,
    count
  }
}


export function fetchNoticeUnreadCount(projectId, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let url = `/v0.1/projects/${projectId}/notifications/unread_count`
    let auth = utils.getAuthHybrid({
      host,
      method,
      url
    })
    return request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/notifications/unread_count`)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          if (callback) {
            callback(res.body)
          }
          dispatch(recieveNoticeUnreadCount(res.body))
        } else {
          message(res, err)
        }
      })
  }
}

/*
 *通知详情页面相关的接口：
 * 1.获取通知详情
 * 2.获取通知的回复列表
 * 3.提交回复
 */

/*
 *1.获取通知详情
 */
export function getNotificationDetail(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    const url = `/v0.1/projects/${options.projectId}/notifications/${options.noticeId}`

    return request
      .get(`${consts.API_URL}${url}`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .end(function cb(err, res) {
        if (!err) {
          const result = res.body
          result.items = []
          result.items.push(result)
          dispatch(fetchUserNames(result, 'detail'))
          if (callback) {
            callback(res.body)
          }
        } else {
          message(res, err)
        }
      })
  }
}

/*
 *2.获取通知的回复列表
 */
export function getNotificationReply(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let url = `/v0.1/projects/${options.projectId}/notifications/${options.noticeId}/replys`

    delete options.projectId
    delete options.noticeId

    options.$limit = consts.PAGE_SIZE_MOBILE
    options.$count = true
    options.$orderby = 'reply_time DESC'

    let querys = []
    Object.keys(options).forEach((key) => (
      querys.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    ))

    if (querys.length) {
      url = url + '?' + querys.join('&')
    }

    let auth = utils.getAuthHybrid({
      host,
      method,
      url
    })
    return request
      .get(`${consts.API_URL}${url}`)
      // .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (!err) {
          if (callback) {
            callback(res.body)
          }
          dispatch(recieveNotificationReply(res.body))
          dispatch(fetchUserNames(res.body, 'replylist', 'reply_uid'))
        } else {
          message(res, err)
        }
      })
  }
}

/*
 *3.提交回复
 */
export function postReply(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'POST'
    const url = `/v0.1/projects/${options.projectId}/notifications/${options.noticeId}/replys`

    delete options.projectId
    delete options.noticeId
    return request
      .post(`${consts.API_URL}${url}`)
      .set('Authorization', utils.getAuthHybrid({
        host,
        method,
        url
      }))
      .send(options)
      .end(function cb(err, res) {
        if (!err) {
          if (callback) {
            callback(res.body)
          }
          dispatch(addNotificationReply({...res.body}))
        } else {
          message(res, err)
        }
      })
  }
}
