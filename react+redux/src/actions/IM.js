// IM.js
import request from 'superagent';
import {actionTypes, consts} from 'constants';
import utils from 'utils';
import {message} from '../msg/error';

export function recieveGroupUser(data) {
  return {
    type: actionTypes.RECEIVE_GROUP_USER,
    groupUser: data
  };
}


export function recieveForumUser(data) {
  return {
    type: actionTypes.RECEIVE_FORUM_USER,
    forumUser: data
  };
}

export function clearGroupUser() {
  return {
    type: actionTypes.CLEAR_GROUP_USER,
    groupUser: {}
  };
}

export function clearForumUser() {
  return {
    type: actionTypes.CLEAR_FORUM_USER,
    forumUser: {}
  };
}

export function checkGroupUser(options, callback) {
  return dispatch => {
    let uid = require('utils').getToken().user_id;
    const host = consts.GROUP_API_HOST;
    const method = 'GET';
    const url = '/v0.2/groups/' + options.groupId + '/members/' + uid;

    return request
      .get(`${consts.GROUP_API_ORIGIN}/v0.2/groups/${options.groupId}/members/${uid}`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (res.ok) {
          //说明是群成员
          dispatch(recieveGroupUser(res.body));
        }else{
          dispatch(recieveGroupUser({}));
          message(res, err, true);
        }

        callback && callback(res.body);
      });
  };
}

export function createGroup(options, callback) {
  return dispatch => {

    const host = consts.API_HOST;
    const method = 'POST';
    const url = '/v0.1/projects/' + options.projectId + '/groups';

    return request
      .post(`${consts.API_URL}/v0.1/projects/${options.projectId}/groups`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (res.ok) {
          callback && callback(res.body);
        } else {
          message(res, err, true);
        }
      });
  };
}

export function joinGroup(options, callback) {
  return dispatch => {
    const host = consts.API_HOST;
    const method = 'POST';
    const url = '/v0.1/projects/' + options.projectId + '/groups/requests';

    return request
      .post(`${consts.API_URL}/v0.1/projects/${options.projectId}/groups/requests`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (res.ok) {
          callback && callback(res.body);
        } else {
          message(res, err, true);
        }
      });
  };
}

export function checkForumUser(options, callback) {
  return dispatch => {
    let uid = require('utils').getToken().user_id;
    const host = consts.FORUM_API_HOST;
    const method = 'GET';
    const url = '/v0.1/subscribers/' + options.forumId + '/' + uid;

    return request
      .get(`${consts.FORUM_API_ORIGIN}/v0.1/subscribers/${options.forumId}/${uid}`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (res.ok) {
          dispatch(recieveForumUser(res.body));
        } else {
          dispatch(recieveForumUser({}));
          message(res, err, true);
        }
        callback && callback();
      });
  };
}

export function createForum(options, callback) {
  return dispatch => {

    const host = consts.API_HOST;
    const method = 'POST';
    const url = '/v0.1/projects/' + options.projectId + '/forums';

    return request
      .post(`${consts.API_URL}/v0.1/projects/${options.projectId}/forums`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (res.ok) {
          callback && callback(res.body);
        } else {
          message(res, err);
        }
      });
  };
}

export function joinForum(options, callback) {
  return dispatch => {
    const host = consts.API_HOST;
    const method = 'POST';
    const url = '/v0.1/projects/' + options.projectId + '/forums/subscribers';

    return request
      .post(`${consts.API_URL}/v0.1/projects/${options.projectId}/forums/subscribers`)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (res.ok) {
          callback && callback(res.body);
        } else {
          message(res, err);
        }
      });
  };
}


export function selfNotice(options, callback) {
  return dispatch => {
    let uid = require('utils').getToken().user_id
    const host = consts.API_HOST
    const method = 'POST'
    const url = '/v0.1/notice/im_notice'

    if(!callback){
      callback = options
      options = {
        'user_id': uid,
        'content':'http://nderp.99.com/Report/K0_frmUserApp.aspx?pageCode=692'
      }
    }
    // http://bpm.ndea.99.com/MyForm/FormDetail.aspx?action=ApplyForm&id=300
    // http://nderp.99.com/Report/K0_frmUserApp.aspx?pageCode=421
    // http://nderp.99.com/Report/K0_frmUserApp.aspx?pageCode=692

    return request
      .post(`${consts.API_URL}/v0.1/notice/im_notice`)
      .send(options)
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (res.ok) {
          callback && callback(res.body)
        } else{
          message(res, err)
        }
      })
  }
}
