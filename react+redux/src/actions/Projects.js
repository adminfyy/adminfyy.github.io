import request from 'superagent'
import {actionTypes, consts} from 'constants'
import utils from 'utils'
import {message} from '../msg/error'
import * as Users from './Users'

export function updateProjectInfo(projectInfo) {
  return {
    type: actionTypes.UPDATE_PROJECTS,
    projectInfo: projectInfo
  }
}
// export function updateSearchProjectInfo(projectInfo) {
//   return {
//     type: actionTypes.UPDATE_SEARCH_PROJECTS,
//     projectInfo: projectInfo
//   }
// }
// export function updateSubProjectInfo(projectInfo) {
//   return {
//     type: actionTypes.UPDATE_SUB_PROJECTS,
//     projectInfo: projectInfo
//   }
// }
// export function updateNormalProjectInfo(projectInfo) {
//   return {
//     type: actionTypes.UPDATE_NORMAL_PROJECTS,
//     projectInfo: projectInfo
//   }
// }
// export function updateWarnProjectInfo(projectInfo) {
//   return {
//     type: actionTypes.UPDATE_WARN_PROJECTS,
//     projectInfo: projectInfo
//   }
// }
// export function updateErrorProjectInfo(projectInfo) {
//   return {
//     type: actionTypes.UPDATE_ERROR_PROJECTS,
//     projectInfo: projectInfo
//   }
// }

function receiveProjects(options) {
  return {
    type: actionTypes.RECEIVE_PROJECTS,
    projects: options.projects,
    isSearch: options.isSearch,
    keyword: options.keyword,
    director: options.director,
    init: options.init
  }
}

function receiveSearchProjects(options) {
  return {
    type: actionTypes.RECEIVE_SEARCH_PROJECTS,
    ...options
  }
}

export function clearSearchProjects() {
  return {
    type: actionTypes.CLEAR_SEARCH_PROJECTS,
    projects: {}
  }
}


function receiveSubProjects(options) {
  return {
    type: actionTypes.RECEIVE_SUB_PROJECTS,
    projects: options.projects,
    isSearch: options.isSearch,
    keyword: options.keyword,
    init: options.init
  }
}

function receiveNormalProjects(options) {
  return {
    type: actionTypes.RECEIVE_NORMAL_PROJECTS,
    projects: options.projects,
    isSearch: options.isSearch,
    keyword: options.keyword,
    init: options.init
  }
}

function receiveWarnProjects(options) {
  return {
    type: actionTypes.RECEIVE_WARN_PROJECTS,
    projects: options.projects,
    isSearch: options.isSearch,
    keyword: options.keyword,
    init: options.init
  }
}

function receiveErrorProjects(options) {
  return {
    type: actionTypes.RECEIVE_ERROR_PROJECTS,
    projects: options.projects,
    isSearch: options.isSearch,
    keyword: options.keyword,
    init: options.init
  }
}

function receiveProjectsAll(list, filter) {
  return {
    type: actionTypes.RECEIVE_PROJECTS_ALL,
    projects: list,
    keyword: filter
  }
}

export function clearProjectsAll() {
  return {
    type: actionTypes.CLEAR_PROJECTS_ALL,
    projects: {}
  }
}

export function clearProjects() {
  return {
    type: actionTypes.CLEAR_PROJECTS,
    projects: {}
  }
}

export function clearSubProjects() {
  return {
    type: actionTypes.CLEAR_SUB_PROJECTS,
    projects: {}
  }
}


export function clearNormalProjects() {
  return {
    type: actionTypes.CLEAR_NORMAL_PROJECTS,
    projects: {}
  }
}

export function clearWarnProjects() {
  return {
    type: actionTypes.CLEAR_WARN_PROJECTS,
    projects: {}
  }
}

export function clearErrorProjects() {
  return {
    type: actionTypes.CLEAR_ERROR_PROJECTS,
    projects: {}
  }
}

export function updateProjectsTab(tab, old) {
  return {
    type: actionTypes.UPDATE_PROJECTS_TAB,
    tab: tab,
    old: old
  }
}

export function getProjectStatistics(statistics) {
  return {
    type: actionTypes.GET_PROJECT_STATISTICS,
    statistics: statistics
  }
}

export function updateProjectStatistics(etype) {
  return {
    type: actionTypes.UPDATE_PROJECT_STATISTICS,
    etype
  }
}

export function updateProjectsAll(projectId, isSelected, filter) {
  return {
    type: actionTypes.UPDATE_PROJECTS_ALL,
    projectId,
    isSelected,
    keyword: filter
  }
}

export function getProjectsUserInfos(projects, options) {
  return dispatch => {
    let ids = []
    projects.items.forEach(project => {
      if (project.project_info && project.project_info.manager_uid) {
        ids.push({
          'user_id': project.project_info.manager_uid
        })
      }
    })
    Users.getUserInfos(ids, function cb(data) {
      if (data) {
        projects.users = data
      }
      let o = {
        projects: projects,
        isSearch: options.isSearch,
        keyword: options.keyword,
        init: options.init
      }

      if (options.isSearch) {
        // 项目的搜索独立了
        dispatch(receiveSearchProjects(o))
      } else if (options.tab === consts.SUBSCRIBE) {
        dispatch(receiveSubProjects(o))
      } else if (options.tab === consts.PROJECT_NORMAL) {
        dispatch(receiveNormalProjects(o))
      } else if (options.tab === consts.PROJECT_WARN) {
        dispatch(receiveWarnProjects(o))
      } else if (options.tab === consts.PROJECT_ERROR) {
        dispatch(receiveErrorProjects(o))
      } else {
        dispatch(receiveProjects(o))
      }
    })
  }
}

export function fetchProjects(options, callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let url = '/v0.1/projects'
    const isSearch = options && options.isSearch
    const keyword = options && options.keyword
    const tab = options && options.tab || consts.PROJECTS
    const init = options && options.init
    const isDispatch = options && options.isDispatch || 'yes'
    let status = 0

    delete options.isDispatch
    if (!isNaN(tab)) {
      // 正常，警告，异常是数字
      status = tab
    }

    if (options) {
      if (typeof options.subscribe === 'undefined') {
        options.subscribe = 0
      }
      delete options.isSearch
      delete options.tab
      delete options.init
      let querys = []


      if (options.keyword && options.keyword !== '') {
        querys.push('keyword=' + encodeURIComponent(options.keyword))
      } else {
        delete options.keyword
      }

      if (parseInt(options.$offset, 10)) {
        querys.push('%24offset=' + options.$offset)
      } else {
        delete options.$offset
      }

      if (parseInt(options.$limit, 10)) {
        querys.push('%24limit=' + options.$limit)
      } else {
        delete options.$limit
      }

      if (options.subscribe) {
        querys.push('subscribe=' + options.subscribe)
      } else {
        delete options.subscribe
      }
      if (options.$filter) {
        querys.push(`%24filter=${encodeURIComponent(options.$filter)}`)
      } else {
        delete options.$filter
      }

      if (status) {
        querys.push('status=' + status)
        options.status = status
      } else {
        delete options.status
      }

      options.$count = true
      if (options.$count) {
        querys.push('%24count=' + options.$count)
      } else {
        delete options.$count
      }

      url += '?' + querys.join('&')
    } else {
      options = {}
      options.subscribe = 0
      url += '?subscribe=0'
    }

    let auth = utils.getAuthHybrid({host, method, url})
    return request
      .get(`${consts.API_URL}/v0.1/projects`)
      .query(options)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (err) {
          message(res, err)
        } else {
          let o = {
            isSearch: isSearch,
            keyword: keyword,
            init: init,
            tab: tab
          }
          isDispatch === 'yes' && dispatch(getProjectsUserInfos(res.body, o))
          callback && callback(res.body)
        }
      })
  }
}

export function fetchProjectsAll(options, callback) {
  return dispatch => {
    let filter = options && encodeURIComponent(options.filter)
    let offset = options && options.offset || 0
    let limit = options && options.limit || 20
    const host = consts.API_HOST
    const method = 'GET'
    let url = '/v0.1/projects/all?%24count=true&%24limit=' + limit + '&%24offset=' + offset + '&%24filter=name%20like%20' + filter
    let auth = utils.getAuthHybrid({host, method, url})

    return request
      .get(`${consts.API_URL}/v0.1/projects/all?%24count=true&%24limit=${limit}&%24offset=${offset}&%24filter=name%20like%20${filter}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (err) {
          message(res, err)
        } else {
          dispatch(receiveProjectsAll(res.body, filter))
          callback && callback(res.body)
        }
      })
  }
}


export function fetchProjectsStatistic(callback) {
  return dispatch => {
    const host = consts.API_HOST
    const method = 'GET'
    let url = '/v0.1/projects/count'
    let auth = utils.getAuthHybrid({host, method, url})

    return request
      .get(`${consts.API_URL}/v0.1/projects/count`)
      .set('Content-Type', 'application/json')
      .set('Authorization', auth)
      .end(function cb(err, res) {
        if (err) {
          message(res, err)
        } else {
          dispatch(getProjectStatistics(res.body))
          callback && callback(res.body)
        }
      })
  }
}
