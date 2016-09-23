import {actionTypes} from 'constants'

export function modifyVersionDetailTableCss(flag){
  'use strict'
  return {
    type: actionTypes.MODIFY_VERSION_DETAIL_TABLE_CSS,
    flag
  }
}

export function modifyProjectsSearchCss(isFocus){
  'use strict'
  return {
    type: actionTypes.MODIFY_PROJECTS_SEARCH_CSS,
    isFocus
  }
}

export function modifyProjectsListScrollTop(scrollTop){
  'use strict'
  return {
    type: actionTypes.MODIFY_PROJECTS_LIST_SCROLLTOP,
    scrollTop
  }
}

export function modifyNotifyListScrollTop(scrollTopNotify){
  'use strict'
  return {
    type: actionTypes.MODIFY_NOTIFY_LIST_SCROLLTOP,
    scrollTopNotify
  }
}

export function modifyMenuTab(isTabVisable){
  'use strict'
  return {
    type: actionTypes.MODIFY_TAB_VISIBILITY,
    isTabVisable
  }
}
export function updateFilter(filter){
  'use strict'
  return {
    type: actionTypes.UPDATE_FILTER,
    filter
  }
}

export function updateFilterNotify(filterNotify){
  'use strict'
  return {
    type: actionTypes.UPDATE_FILTER_NOTIFY,
    filterNotify
  }
}


export function updateFilterWeeklyReport(filterWeeklyReport){
  'use strict'
  return {
    type: actionTypes.UPDATE_FILTER_WEEKLYREPORT,
    filterWeeklyReport
  }
}


export function updateFilterVersion(filterVersion){
  'use strict'
  return {
    type: actionTypes.UPDATE_FILTER_VERSION,
    filterVersion
  }
}
