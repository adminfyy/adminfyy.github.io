import request from 'superagent';
import {actionTypes, consts} from 'constants';
import utils from 'utils';
import {message} from '../msg/error';

function receiveHistories(options) {
  return {
    type: actionTypes.RECEIVE_HISTORIES,
    histories: options.histories
  };
}

function receiveHistory(options) {
  return {
    type: actionTypes.RECEIVE_HISTORY,
    history: options.history
  };
}

export function clearHistoryDetail() {
  return receiveHistory({history: {}});
}

export function fetchHistories(options, callback) {
  return dispatch => {

    const host = consts.API_HOST;
    const projectId = options.projectId;
    const method = 'GET';
    let url = `/v0.1/projects/${projectId}/months`;

    if (options.month) {
      url += '?month=' + options.month;
    }

    delete options.projectId;

    request
      .get(`${consts.API_URL}/v0.1/projects/${projectId}/months`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          dispatch(receiveHistories({
            histories: res.body
          }));
          callback && callback();
        }else{
          message(res, err);
        }
      });
  };
}

export function fetchHistory(options) {
  return dispatch => {

    const host = consts.API_HOST;
    const method = 'GET';
    let url = `/v0.1/projects/${options.projectId}/months/${options.month}`;

    return request
      .get(`${consts.API_URL}/v0.1/projects/${options.projectId}/months/${options.month}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', utils.getAuthHybrid({host, method, url}))
      .end(function cb(err, res) {
        if (!err) {
          let history = res.body;
          history.currentMonth = options.currentMonth;

          dispatch(receiveHistory({
            history: history
          }));
        }else{
          message(res, err);
        }
      });
  };
}
