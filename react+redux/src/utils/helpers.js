import {
  createHashHistory
} from 'history'
import {
  consts
}
from 'constants'
let utils = require('utils')
let Browser = require('nd-browser')
import MobileDetect from 'mobile-detect'

/**
 * [goPage 封装页面跳转方法，用请求img方法来判断是否有网络]
 * @method goPage
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
export function goPage(url) {
  let history = new createHashHistory()
  if (!url) {
    history.goBack()
  } else {
    let networkCallback = function(isOnline) {
      if (isOnline) {
        history.push(url)
      } else {
        window.toast.setProps({
          text: '网络异常，请检查您的网络',
          timeOut: 1000,
          isShow: true
        })
      }
    }
    this.getNetWork(networkCallback)
  }
  return false
}
/**
 * [goPage 封装页面重定位 方法]
 * @method goPage
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
export function replacePage(url) {
  let history = new createHashHistory()
  if (!url) {
    window.toast.setProps({
      text: '请填写跳转地址',
      timeOut: 1000,
      isShow: true
    })
  } else {
    let networkCallback = function(isOnline) {
      if (isOnline) {
        history.replace(url)
      } else {
        window.toast.setProps({
          text: '网络异常，请检查您的网络',
          timeOut: 1000,
          isShow: true
        })
      }
    }
    this.getNetWork(networkCallback)
  }
  return false
}
/**
 * [getImg 判断图片是否存在]
 * @method getImg
 * @param  {[type]}   imgUrl   [原始图片地址]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [null]
 */
export function getImg(imgUrl, callback) {
  let img = new Image()
  img.onload = function() {
    callback(true)
  }
  img.onerror = function() {
    callback(false)
  }
  img.src = imgUrl
}

/**
 * [getNetWork 判断网络状况]
 */
export function getNetWork(callback) {
  if (typeof Bridge === 'undefined') {
    callback(true)
    return
  }
  let result = Bridge.require('sdp.network') && Bridge.require('sdp.network').getStatus({})
  switch (result) {
    case 'WiFi':
    case 'WWAN':
      callback(true)
      break
    case 'undefined':
    case 'Unknown':
    case 'Unkonwn':
      callback(false)
      break
    default:
      callback(true)
  }
}

export function convertMoney(value, noUnit) {
  if (value === null) return '#'

  if (value > 100000000) {
    return ((value / 100000000).toFixed(2) * 1).toString() + '亿'
  } else if (value > 10000000) {
    return ((value / 10000000).toFixed(2) * 1).toString() + '千万'
  } else if (value > 1000000) {
    return ((value / 1000000).toFixed(2) * 1).toString() + '百万'
  } else if (value > 10000) {
    return ((value / 10000).toFixed(2) * 1).toString() + '万'
  } else {
    let v = value.toString()
    if (v.length > 4) {
      return value.toFixed(0).toString()
    }
    return v
  }
}

export function convertChartMoney(value) {
  return ((value / 10000).toFixed(2) * 1).toString()
}

export function getMonthCN(date) {
  let cn = [ '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二' ]
  return cn[parseInt((date + '').slice(-2), 10) - 1] + '月'
}

export function showValue(value, unit) {
  if (value === null) return '#'

  return value + (unit || '')
}

export function avatar(uid, realm, size) {
  let pageWidth = document.documentElement.clientWidth
  if (typeof realm === 'number') {
    size = realm
    realm = null
  }

  if (!size) {
    size = 80
    if (pageWidth >= 600) {
      size = 120
    }
  }

  if (realm) {
    return consts.CS_API_ORIGIN === 'http://betacs.101.com'
    ? consts.CS_API_ORIGIN + '/v0.1/static/preproduction_content_cscommon/avatar/' +
    uid + '/' + realm + '/' + uid + '.jpg?size=' + size
    : consts.CS_API_ORIGIN + '/v0.1/static/cscommon/avatar/' + uid +
     '/' + realm + '/' + uid + '.jpg?size=' + size
  }

  return consts.CS_API_ORIGIN === 'http://betacs.101.com'
   ? consts.CS_API_ORIGIN + '/v0.1/static/preproduction_content_cscommon/avatar/' +
   uid + '/' + uid + '.jpg?size=' + size
   : consts.CS_API_ORIGIN + '/v0.1/static/cscommon/avatar/' + uid + '/' + uid + '.jpg?size=' + size
}

export function getProjectIcon(dentryId = `eddaca36-2df1-4db2-b09a-8e632f26beba`) {
  let imgUrl = `${consts.CS_API}/v0.1/download?dentryId=${dentryId}&size=80`
  return imgUrl
}

/**
 * [onError img找不到图片，onerror调用系统默认图片]
 * @method onError
 * @param  {[type]} e [dom对象]
 * @return {[type]}   [description]
 */
export function onError(defaultSrc, e) {
  let $t = e.target
  $t.onerror = null
  $t.src = defaultSrc || consts.DEFAUT_USER
}

export function md5(value) {
  return utils.md5(value)
}

export function dateTime(timeStamp, pattern) {
  return utils.dateTime(timeStamp, pattern)
}

export function radioToInt(radio) {
  radio = radio < 0.01 ? 0.01 : radio
  radio = radio > 0.99 ? 0.99 : radio
  return radio
}

export function checkPermission(type, projectId, permission) {
  let adminRole = 'PROJECT_ADMIN_' + projectId
  let devAdmin = 'PROJECT_PIC_DEV_' + projectId
  let designAdmin = 'PROJECT_PIC_DESIGN_' + projectId
  let managerAdmin = 'PROJECT_PIC_MANAGER_' + projectId
    // 项目子负责人
  let subAdmin = /^PROJECT_PIC/
  if (permission && permission.length > 0) {
    let ret = permission.some(function(item) {
      // VP,CEO,项目负责人可以做大部分操作
      let roleName = item.role_name.toUpperCase()
      if (type === consts.PERMISSION_TYPE.editable) {
        if (roleName === 'CEO' ||
          roleName === 'VP' ||
          roleName === adminRole ||
          roleName === devAdmin ||
          roleName === designAdmin ||
          roleName === managerAdmin
        ) {
          return true
        }
      }
      // VP,CEO,项目负责人，项目子负责人也可以新增成员
      if (type === consts.PERMISSION_TYPE.editUsers) {
        let index = item.role_name.lastIndexOf('_') + 1
        if (roleName === 'CEO' ||
          roleName === 'VP' ||
          roleName === adminRole ||
          (subAdmin.test(roleName) && item.role_name.substr(index) === projectId + '')
        ) {
          return true
        }
      }

      // 项目负责人才可以设置子负责人 3-18修改：DJ、Vp也可以
      if (type === consts.PERMISSION_TYPE.subadmin) {
        if (roleName === adminRole ||
          roleName === 'CEO' ||
          roleName === 'VP') {
          return true
        }
      }

      // 开发子负责人或者策划子负责人或者项目负责人可以创建群
      if (type === (consts.PERMISSION_TYPE.devadmin ^ consts.PERMISSION_TYPE.designadmin ^ consts.PERMISSION_TYPE.subadmin)) {
        if (roleName === adminRole ||
          roleName === devAdmin ||
          roleName === designAdmin ||
          roleName === 'CEO' ||
          roleName === 'VP'
        ) {
          return true
        }
      }

      // CEO VP
      if (type === (consts.PERMISSION_TYPE.editVersion)) {
        if (roleName === 'CEO' ||
          roleName === 'VP'
        ) {
          return true
        }
      }

      return false
    })
    return ret
  } else {
    return false
  }
}


export function isEmpty(obj) {
  if (!obj) {
    return true
  }
  return Object.keys(obj).length === 0
}
/**
 * [scrollLoading 图片滚动]
 * @method scrollLoading
 * @param  {[type]}      $scrollPanel [滚动区域dom]
 * @param  {[type]}      $content     [滚动块]
 * @param  {[type]}      $box         [description]
 * @return {[type]}                   [description]
 */
export function scrollLoading($scrollPanel, $content) {
  if (!$content.querySelector('.js-scroll-load')) {
    return
  }
  let $box = $content.querySelector('.js-scroll-load')
  let scrollTop = $scrollPanel.scrollTop
  let height = document.body.clientHeight
  let nowTop = parseInt(scrollTop, 10) + parseInt(height, 10)
  let cOffsetTop = $content.offsetTop
  let boxClass = $box.classList
  if (nowTop >= cOffsetTop && boxClass.contains('js-scroll-load')) {
    (function(img, url) {
      img.onload = function() {
        boxClass.remove('js-scroll-load')
        boxClass.add('img-show')
        $box.style.cssText = 'background-image:url(' + url + ')'
      }
      img.onerror = function() {
        boxClass.remove('js-scroll-load')
        boxClass.add('img-err')
      }
      img.src = url
    })(new Image(), $box.getAttribute('data-url'))
  }
}
/**
 * [getQueryString 获取url参数]
 * @method getSearchString
 * @param  {[type]}       name [参数名]
 * @return {[type]}            [string]
 */
export function getSearchString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return decodeURI(r[2])
  }
  return null
}
/**
 * [refreshTouch 局部滚动阻止下拉刷新]
 * @method refreshTouch
 * @param  {[type]}     $el [description]
 * @return {[type]}         [description]
 */
export function refreshTouch($el) {
  if (typeof Bridge !== 'undefined' && $el) {
    $el.addEventListener('touchstart', function(e) {
      let webContainer = Bridge.require('webcontainer')
      let scrollTop = $el.scrollTop
      if (scrollTop > 0) {
        // 如果当前区域存在滚动，则通知webview接管后续touch事件
        webContainer.handleTouchEvent()
      }
    }, false)
  }
}
/**
 * [Scroll 滚动加载]
 * @method Scroll
 * @param  {[type]} $el     [dom对象绑定scroll事件]
 * @param  {[type]} options [回调参数]
 */
export function Scroll(options) {
  let [ rsTop ] = [ 0 ]
  let $el = document.querySelector('.js-scroll')
  let fnScroll = function() {
    let [ winHeight, elHeight ] = [ 0, 0 ]
    winHeight = $el.scrollHeight
    elHeight = +getComputedStyle($el).height.slice(0, -2)
    let scrollTop = $el.scrollTop
      // 1.data-scroll阻止重复滚动
      // 2.当滚动到底部剩余10px时，开始加载内容
      // 3.向上滚动时，不做滚动加载
    if (!$el.classList.contains('data-scroll') && (winHeight - elHeight - scrollTop) <= 10 && (scrollTop - rsTop) > 0) {
      $el.classList.add('data-scroll')
      setTimeout(function() {
        options.fnCallback()
      }, 500)
    }
    rsTop = scrollTop
  }
  if ($el) {
    fnScroll()
      /* $el.addEventListener('scroll', function (e) {
      fnScroll()
    }, false)*/
    refreshTouch($el)
  }
}
/**
 * [keyInput 输入时计算可输入字符数，等到10个字符时，字体颜色变红]
 * @method keyInput
 * @param  {[type]} $input [输入框dom]
 * @param  {[type]} $num   [剩余可输入字符数]
 * @param  {[type]} limit  [最大可输入字符数]
 * @return {[type]}        [description]
 */
export function keyInput($input, $num, limit) {
  let length = $input.value.length
  let num = limit - length
  if (+num < 0) {
    $input.value = $input.value.substring(0, limit)
    return false
  } else if (num < 10) {
    $num.classList.add('red')
  } else {
    $num.classList.remove('red')
  }
  $num.innerHTML = length
}
/**
 * [onResize 点击虚拟键盘，触发onresize，计算滚动距离]
 * @method onResize
 * @param  {[type]} winHeight [原来窗口高度]
 * @param  {[type]} eHeight   [input/textarea文本高度]
 * @return {[type]}           [description]
 */
export function onResize(winHeight, eHeight) {
  window.onresize = function() {
    let $scroll = document.querySelector('.overflow-y')
      /* let viewTop = $scroll.scrollTop              //  可视区域顶部
      let viewBottom = viewTop + $scroll.scrollHeight     //  可视区域底部*/
    $scroll.scrollTop = winHeight - eHeight
  }
}
export function getTop(e) {
  let offset = e.offsetTop
  if (e.offsetParent !== null) {
    offset += getTop(e.offsetParent)
  }
  return offset
}
/**
 * 设置placeholder
 * @method im
 * @param  {[$nodeDiv]}      $nodeDiv [搜索div的顶级元素]
 * @param  {[$input]}      $input [搜索输入框]
 * @param  {[errorTxt]}      errorTxt [错误时候的placeholder]
 * @return {[normalTxt]}               [正常时候的placeholder]
 */
export function placeholderShow(...args) {
  args[0].$nodeDiv.classList.add('input-error')
  args[0].$input.placeholder = args[0].errorTxt
  setTimeout(function() {
    args[0].$nodeDiv.classList.remove('input-error')
    args[0].$input.placeholder = args[0].normalTxt || args[0].errorTxt
  }, 1000)
}
export function imStr(type, id, fromId) {
  switch (type) {
    case consts.GROUP:
      if (!Browser.mobile) {
        return 'im://msg/?uin=' + id + '&myuin=' + fromId + '&type=1&remarks='
      }
      return 'cmp://com.nd.social.im/chat?id=' + id + '&type=2'
    case consts.SHARE:
      return 'cmp://com.nd.social.im/group_share?groupId=' + id
    case consts.FORUM:
      return 'cmp://com.nd.social.forum/forumSectionHomePage?sectionId=' + id
    case consts.USER:
      if (!Browser.mobile) {
        return 'im://msg/?uin=' + id + '&myuin=' + fromId + '&type=0&remarks='
      }
      return 'cmp://com.nd.social.im/chat?id=' + id
    case consts.TODO:
      return 'cmp://com.nd.social.ERP/todo'
    case consts.VIDEO:
      return 'cmp://com.nd.social.videoconference/create?gid=' + id
    default:
      return ''
  }
}
/**
 * [getStrLeng 计算字符长度]
 * @method getStrLeng
 * @param  {[type]}   str [description]
 * @return {[type]}       [description]
 */
export function getStrLeng(max, str) {
  let realLength = 0
  let len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 0.5
    } else {
      // 如果是中文则长度加1
      realLength += 1
    }
  }
  return (max - Math.floor(realLength))
}
// 取用户id用这个方法获取
export function getUid() {
  let token = utils.getToken()
  return token ? token['user_id'] : ''
}

export function getMaxEndDate(items, key) {
  if (!items || items.length === 0) {
    return null
  }
  if (items && items.length === 1) {
    if (items[0] && items[0][key] !== null) {
      return items[0][key]
    } else {
      return null
    }
  }
  let array = []
  items.forEach(function(item) {
    array.push(item[key])
  })

  function compare(v1, v2) {
    return v1 > v2 ? -1 : (v1 < v2 ? 1 : 0)
  }

  return array.sort(compare)[0]
}

export function makeArray(array, key, type) {
  if (!array || !array instanceof Array || array.length === 0) {
    return []
  }
  let ret = []
  array.forEach(function(item) {
    if (item.hasOwnProperty(key)) {
      if (type) {
        ret.push(item)
      } else {
        ret.push(item[key])
      }
    }
  })
  return ret
}

export function gotoPageLink(url) {
  let appFactory = Bridge.require('AppFactory')
  let ret = appFactory.goPage({
    'page': url
  })
  if (ret.result === false) {
    console.log('goPage failed' + ret.message)
  }
}

export function easeInOut(t, b, c, d) {
  let condition = (t /= d / 2) < 1
  let result

  if (condition) {
    result = c / 2 * t * t * t + b
  } else {
    result = c / 2 * ((t -= 2) * t * t + 2) + b
  }
  return result
}
/**
 * [checkRegex 正则表达式]
 * @method checkRegex
 * @param  {[type]}   value [description]
 * @return {[type]}         [description]
 */
export function checkRegex(value, type) {
  let reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
  switch (type) {
    case 'date':
      reg = /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/
      break
    case 'datetime':
      reg = /^(2\d{3})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01]) (0\d{1}|1\d{1}|2[0-3]):(0\d{1}|[1-5]\d{1})$/
      break
    default:
      reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
  }
  return reg.test(value)
}


export function tabStatic() {
  let $elList = document.querySelectorAll('.tabs-card')
  let $menu = document.querySelector('.menu')

  for (let i = 0; i < $elList.length; i++) {
    let cl = $elList[i].classList
    if (cl) {
      cl.add('position-static')
    }
  }
  $menu.classList.add('position-static')
}

export function tabNormal() {
  let $elList = document.querySelectorAll('.tabs-card')
  let $menu = document.querySelector('.menu')

  for (let i = 0; i < $elList.length; i++) {
    let cl = $elList[i].classList
    if (cl) {
      cl.remove('position-static')
    }
  }
  $menu.classList.remove('position-static')
}

export function ScrollResize(buttomAreaHeight = 0, $el = document.querySelector('.js-scroll')) {
  let height = document.documentElement.clientHeight
  if ($el) {
    let offsetTop = $el.offsetTop
    $el.style.height = (height - offsetTop - buttomAreaHeight) + 'px'
  } else {
    setTimeout(ScrollResize.bind(this, ...arguments), 300)
  }
}

export function addProjectBtnStatic() {
  let $btn = document.querySelector('.navbar')
  let $btnAdd = document.querySelector('.add-project-action')

  $btn.classList.add('position-relative')
  $btnAdd.classList.add('position-relative')
  ScrollResize()
}

export function addProjectBtnNormal() {
  let $btn = document.querySelector('.navbar')
  let $btnAdd = document.querySelector('.add-project-action')
  $btn.classList.remove('position-relative')
  $btnAdd.classList.remove('position-relative')
  ScrollResize()
}

export function tabHandlePosition(mHeight) {
  if (+document.body.clientHeight < +mHeight) {
    tabStatic()
  } else {
    tabNormal()
  }
}
/**
 * [imgReady 图片预加载]
 * @method imgReady
 * @param  {[type]}   url      [图片地址]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function imgReady(url, callback) {
  let img = new Image()
  if (img.complete) {
    callback(img)
  } else {
    img.onload = function() {
      callback(img)
      img.onload = null
    }
  }
  img.src = url
}
export function convertScoreToLevel(score) {
  let intScore = parseInt(score, 10)
  let performLevel

  if (intScore && intScore <= 60) {
    performLevel = 'D'
  } else
  if (intScore <= 90) {
    performLevel = 'C'
  } else
  if (intScore <= 100) {
    performLevel = 'B'
  } else
  if (intScore <= 110) {
    performLevel = 'A'
  } else
  if (intScore <= 120) {
    performLevel = 'S'
  } else {
    performLevel = '待评价'
  }

  return performLevel
}

export function getCurrentDate() {
  return {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  }
}

/**
 * @method getDaysInMonth 获取月份的天数
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * @method getTimeStamp 获取起始时间戳
 */
export function getTimeStamp(year, month, date) {
  return new Date(year + '/' + (month + 1) + '/' + date).getTime()
}

export function convertDecimal(value, num) {
  value = value + ''
  let isFloat = value.indexOf('.') >= 0

  if (isFloat) {
    return (+value).toFixed(num)
  } else {
    return value
  }
}
export function objectArrayToMap(array = [], key) {
  let map = {}
  array.map((item) => (map[item[key]] = item))
  return map
}

export function backToTop(isAnimate, callback) {
  let $el = document.querySelector('.js-scroll')
  if (!$el) {
    return
  }
  if ($el.scrollTop === 0) {
    callback && callback()
    return
  }
  // normal backToTop
  if (!isAnimate) {
    $el.scrollTop = 0
    callback && callback()
    return
  }

  // annimatie backToTop
  // 起点
  let b = $el.scrollTop
    // 终点
  let c = -b
    // direction and distance
  let d = 80
  let t = 0
  let speed = 1

  function pageSroll() {
    $el.scrollTop = easeInOut(t, b, c, d)
    if (t < d) {
      t = t + speed
      setTimeout(pageSroll, 20)
    } else {
      callback && callback()
    }
  }
  if (isAnimate) {
    pageSroll()
  }
}

export function ScrollToPrePosition(position, isAnimate, callback) {
  let $el = document.querySelector('.js-scroll')
  if (!$el) {
    setTimeout(ScrollToPrePosition.bind(this, ...arguments), 200)
    return
  }
  if ($el.scrollTop === position) {
    callback && callback()
    return
  }
  // normal backToTop
  if (!isAnimate) {
    $el.scrollTop = position
    callback && callback()
    return
  }

  // annimatie backToTop
  // 起点
  let b = $el.scrollTop
    // 终点
  let c = position
    // direction and distance
  let d = 80
  let t = 0
  let speed = 1

  function pageSroll() {
    $el.scrollTop = easeInOut(t, b, c, d)
    if (t < d) {
      t = t + speed
      setTimeout(pageSroll, 20)
    } else {
      callback && callback()
    }
  }
  if (isAnimate) {
    pageSroll()
  }
}
/**
 * [refresh 下拉刷新]
 * @method refresh
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export function refresh(callback) {
  if (typeof Bridge !== 'undefined') {
    let webContainer = Bridge.require('webcontainer').promise()
    let enable = true
    if (!callback) {
      enable = false
    }
    let md = new MobileDetect(window.navigator.userAgent)
    if (md.os() === 'AndroidOS') {
      webContainer.setWebViewContainerRefreshEnable({
        'enable': enable
      })
    }
    webContainer.setWebViewContainerRefreshListener({}).progress(function() {
      callback && callback()
      webContainer.stopWebViewContainerRefresh()
    })
  }
}
export function isRefresh(enable) {
  if (typeof Bridge !== 'undefined') {
    let webContainer = Bridge.require('webcontainer').promise()
    let md = new MobileDetect(window.navigator.userAgent)
    if (md.os() === 'AndroidOS') {
      webContainer.setWebViewContainerRefreshEnable({
        'enable': enable
      })
    }
  }
}
/**
 * [virKeybord 虚拟键盘弹出，自动把页面往上顶]
 * @method virKeybord
 * @param  {[type]}   inputHeight [默认滚动高度]
 * @return {[type]}               [description]
 */
export function virKeybord(inputHeight) {
  let $virKeybord = document.querySelector('.js-virKeybord')
  let SCROLLY = 100
  let TIMER_NAME = 300
  let MAX_SCROLL = inputHeight || $virKeybord.scrollHeight
  setTimeout(function() {
    if (window.scrollY < SCROLLY) {
      // ios
      window.scroll(0, MAX_SCROLL)
        // android
      if ($virKeybord) {
        $virKeybord.style.overflowY = 'auto'
        $virKeybord.scrollTop = MAX_SCROLL
      }
    }
  }, TIMER_NAME)
}

export function platForm(plat) {
  // 判断如果是从pc版的99u那边的应用盒子过来，给提示，调用回调
  if (plat === 'pc99u') {
    window.toast.setProps({
      text: '99U暂不支持webIM',
      timeOut: 1000,
      isShow: true
    })
    return true
  }
  return null
}
