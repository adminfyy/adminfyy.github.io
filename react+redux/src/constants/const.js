// 开发
const DEVELOPMENT = 1
  // 测试
const DEBUG = 2
  // 生产
const PRODUCTION = 4
  // 预生产
const PREPRODUCTION = 8
  // 压测
const PRESSURE = 16

const LOC_HOSTNAME = location.hostname


const ENV = (function() {
  switch (LOC_HOSTNAME) {
    case '127.0.0.1':
    case '192.168.254.60':
    case '192.168.254.62':
    case '192.168.254.65':
    case '192.168.253.30':
    case '192.168.254.66':
    case '192.168.251.129':
    case 'localhost':
      return DEVELOPMENT
    default:
      if (/\.dev\.web\.nd$/.test(LOC_HOSTNAME)) {
        return DEVELOPMENT
      }
      if (/\.debug\.web\.nd$/.test(LOC_HOSTNAME)) {
        return DEBUG
      }
      if (/\.qa\.web\.sdp\.101\.com$/.test(LOC_HOSTNAME)) {
        return PRESSURE
      }
      if (/\.beta\.web\.sdp\.101\.com$/.test(LOC_HOSTNAME)) {
        return PREPRODUCTION
      }
      return PRODUCTION
  }
})()

export const API_HOST = (function() {
  switch (ENV) {
    case DEVELOPMENT:
    //  return 'nd-project-test.dev.web.nd'
      return 'nd-project.dev.web.nd'
    case DEBUG:
      return 'nd-project.debug.web.nd'
    case PRODUCTION:
      return 'nd-project.oth.web.sdp.101.com'
    case PREPRODUCTION:
      return 'nd-project.beta.web.sdp.101.com'
    case PRESSURE:
      return 'nd-project.qa.web.sdp.101.com'
    default:
      return 'nd-project.oth.web.sdp.101.com'
  }
})()

export const API_URL = (function() {
  switch (ENV) {
    case DEVELOPMENT:
    //  return 'http://nd-project-test.dev.web.nd'
      return 'http://nd-project.dev.web.nd'
    case DEBUG:
      return 'http://nd-project.debug.web.nd'
    case PRODUCTION:
      return 'http://nd-project.oth.web.sdp.101.com'
    case PREPRODUCTION:
      return 'http://nd-project.beta.web.sdp.101.com'
    case PRESSURE:
      return 'nd-project.qa.web.sdp.101.com'
    default:
      return 'http://nd-project.oth.web.sdp.101.com'
  }
})()

export const UC_API_HOST = (function() {
  switch (ENV) {
    case DEVELOPMENT:
      return '101uccenter.beta.web.sdp.101.com'
    case DEBUG:
      return '101uccenter.beta.web.sdp.101.com'
    case PRODUCTION:
      return 'aqapi.101.com'
    case PREPRODUCTION:
      return '101uccenter.beta.web.sdp.101.com'
    case PRESSURE:
      return '101uccenter.beta.web.sdp.101.com'
    default:
      return '101uccenter.beta.web.sdp.101.com'
  }
})()

export const UC_API_ORIGIN = (function() {
  switch (ENV) {
    case DEVELOPMENT:
      return 'http://101uccenter.beta.web.sdp.101.com'
    case DEBUG:
      return 'http://101uccenter.beta.web.sdp.101.com'
    case PRODUCTION:
      return 'https://aqapi.101.com'
    case PREPRODUCTION:
      return 'http://101uccenter.beta.web.sdp.101.com'
    case PRESSURE:
      return 'http://101uccenter.beta.web.sdp.101.com'
    default:
      return 'http://101uccenter.beta.web.sdp.101.com'
  }
})()

/**
 * @constant {string} CS_API_ORIGIN
 */
export const CS_API_ORIGIN = (function() {
  switch (ENV) {
    case DEBUG:
    case PREPRODUCTION:
    case PRESSURE:
      return 'http://betacs.101.com'
    case PRODUCTION:
    case DEVELOPMENT:
      return 'http://cs.101.com'
    default:
      return 'http://betacs.101.com'
  }
})()

/**
 * @constant {string} CS_API_ORIGIN
 */
export const CS_API = (function() {
  switch (ENV) {
    case DEBUG:
    case PREPRODUCTION:
    case PRESSURE:
    case DEVELOPMENT:
      return 'http://sdpcs.beta.web.sdp.101.com'
    case PRODUCTION:
      return 'http://cs.101.com'
    default:
      return 'http://betacs.101.com'
  }
})()

/**
 * @constant {string} FORUM_API_HOST
 */
export const FORUM_API_HOST = (function() {
  switch (ENV) {
    case DEVELOPMENT:
      return 'forum.dev.web.nd'
    case DEBUG:
      return 'forum.debug.web.nd'
    case PRODUCTION:
      return 'forum.web.sdp.101.com'
    case PREPRODUCTION:
      return 'forum.beta.web.sdp.101.com'
    case PRESSURE:
      return 'forum.beta.web.sdp.101.com'
    default:
      return 'forum.beta.web.sdp.101.com'
  }
})()

/**
 * @constant {string} FORUM_API_ORIGIN
 */
export const FORUM_API_ORIGIN = (function() {
  switch (ENV) {
    case DEVELOPMENT:
      return 'http://forum.dev.web.nd'
    case DEBUG:
      return 'http://forum.debug.web.nd'
    case PRODUCTION:
      return 'http://forum.web.sdp.101.com'
    case PREPRODUCTION:
      return 'http://forum.beta.web.sdp.101.com'
    case PRESSURE:
      return 'http://forum.beta.web.sdp.101.com'
    default:
      return 'http://forum.beta.web.sdp.101.com'
  }
})()

/**
 * @constant {string} GROUP_API_HOST
 */
export const GROUP_API_HOST = (function() {
  switch (ENV) {
    case DEVELOPMENT:
      return 'im-group.dev.web.nd'
    case DEBUG:
      return 'im-group.debug.web.nd'
    case PRODUCTION:
      return 'im-group.web.sdp.101.com'
    case PREPRODUCTION:
      return 'im-group.beta.web.sdp.101.com'
    case PRESSURE:
      return 'im-group.qa.web.sdp.101.com'
    default:
      return 'im-group.beta.web.sdp.101.com'
  }
})()

/**
 * @constant {string} GROUP_API_ORIGIN
 */
export const GROUP_API_ORIGIN = (function() {
  switch (ENV) {
    case DEVELOPMENT:
      return 'http://im-group.dev.web.nd'
    case DEBUG:
      return 'http://im-group.debug.web.nd'
    case PRODUCTION:
      return 'http://im-group.web.sdp.101.com'
    case PREPRODUCTION:
      return 'http://im-group.beta.web.sdp.101.com'
    case PRESSURE:
      return 'http://im-group.qa.web.sdp.101.com'
    default:
      return 'http://im-group.beta.web.sdp.101.com'
  }
})()

/**
 * @constant {string} SERVICE_ID
 */
export const SERVICE_ID = (function() {
  switch (ENV) {
    case DEVELOPMENT:
      return 'c797e2a4-3c38-43fe-b5f2-154eecfcceaa'
    case DEBUG:
      return '11e35ecb-a257-40a0-badb-3e76e7bba526'
    case PRODUCTION:
      return '2eb03a6f-97ca-4cee-8b7a-906be1745927'
    case PREPRODUCTION:
      return '8360e4f0-346e-42d0-81ca-59b5633b7019'
    default:
      return '2eb03a6f-97ca-4cee-8b7a-906be1745927'
  }
})()

/**
 * @constant {string} SERVICE_NAME
 */
export const SERVICE_NAME = (function() {
  switch (ENV) {
    case DEVELOPMENT:
      return 'dev_content_nd_project'
    case DEBUG:
      return 'qa_content_nd_project'
    case PRODUCTION:
      return 'nd_project'
    case PREPRODUCTION:
      return 'preproduction_content_nd_project'
    default:
      return 'nd_project'
  }
})()
  /*
   * @constant {string}  透明图片
   */
export const BLANK = 'data:image/gifbase64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
/* eslint max-len: 0 */
export const DEFAUT_USER = require('../styles/img/user_default.jpg')

export const DEFAULT_PROJECT = require('../styles/img/project-default.png')

export const PAGE_SIZE = 20
export const PAGE_SIZE_MOBILE = 10
export const PAGE_SEARCH_SIZE = 10

export const PROJECT_VERSIONS_LIMIT = 10

// 搜索里程碑的条数
export const PROJECT_MILESTONE_LIMIT = 10

export const PROJECT_VERSION_LOG_LIMIT = 10

export const DATE_FORMAT = 'yyyy/MM/dd'
export const DATE_FORMAT_MD = 'MM/dd'


export const PERMISSION_TYPE = {
  'editable': 1,
  'subadmin': 2,
  'devadmin': 4,
  'designadmin': 8,
  'editUsers': 16,
  'editVersion': 32
}

// 论坛，群组，云盘，个人,TODO,视频会议,通知
export const [ FORUM, GROUP, SHARE, USER, TODO, VIDEO, NOTICE ] = [ 2, 1, 3, 4, 5, 6, 7 ]
export const [ PHONE, PC ] = [ 1, 2 ]

// 项目列表
export const [ SUBSCRIBE, PROJECTS, PROJECT_NORMAL, PROJECT_WARN, PROJECT_ERROR ] = [ 'subscribe', 'projects', 1, 2, 3 ]

// H5的审核页面
export const [ NONE_PERMISSION, HAS_PERMISSION ] = [ 0, 1 ]
export const [ WAIT, CHECKED, UNCHECKED ] = [ 0, 1, 2 ]
export const StatusTxt = {
  0: '未审核',
  1: '同意',
  2: '拒绝'
}
export const StatusResult = {
  0: '待审核',
  1: '审核通过',
  2: '审核被拒绝'
}
export const statusCss = [ 'status-tag-apply', 'status-tag-normal', 'status-tag-warn', 'status-tag-delay' ]
export const statusCssNew = [ '', 'normal', 'warn', 'error' ]
export const statusText = [ '', '正常', '警告', '异常' ]
export const [ NORMAL, WARN, DELAY ] = [ 0, 1, 2 ]

export const [ CREATE, MODIFY ] = [ 'CREATE', 'MODIFY' ]

// 版本列表状态 1.待审核   2.审核中   4.审核完毕
export const [ ACTIVE, UNACTIVE, WAITING, CHECKING ] = [ 4, 3, 1, 2 ]
export const [ cur, undo, done ] = [ 1, 2, 3 ]
// 项目版本列表的tab标签页
export const [ ACTIVEPROJECTS, UNACTIVEPROJECTS ] = [ 'activeprojects', 'unactiveprojects' ]

// tab-keys
export const [ COLLABORATION, MILESTONE, REPORT, EXPLAIN, INDEX ] = [ 1, 2, 3, 4, 5 ]


// project score
export const ScoreLevel = [ 'S', 'A', 'B', 'C', 'D', '待评价' ]
export const MileStoneLabels = [ '未结束里程碑=0', '未结束里程碑=1', '未结束里程碑≥2' ]

export const Milestone = {
  'cur': 1,
  'undo': 2,
  'undo_done': 3,
  'done': 4
}

// notify relative

export const [ READ, UNREAD ] = [ '已读', '未读' ]
export const AUDIT_STATUS = [ '审核中', '已审核' ]

// 从不同的平台跳转过来的
