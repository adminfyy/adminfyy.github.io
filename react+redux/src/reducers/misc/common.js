import { actionTypes } from 'constants'
const initialState = {scrollTop: 0, scrollTopNotify: 0, filter: 0, filterNotify: 0, filterVersion: 0, filterWeeklyReport: 0}
export default function(state = initialState, action = null) {
  const { type, flag, isFocus, scrollTop, scrollTopNotify, filter, filterNotify, filterVersion, filterWeeklyReport } = action
  switch (type) {
    case actionTypes.MODIFY_VERSION_DETAIL_TABLE_CSS:
      return {...state, isActive: flag}

    case actionTypes.MODIFY_PROJECTS_SEARCH_CSS:
      return {...state, isFocus: isFocus}

    case actionTypes.MODIFY_PROJECTS_LIST_SCROLLTOP:
      return {...state, scrollTop: scrollTop}

    case actionTypes.MODIFY_NOTIFY_LIST_SCROLLTOP:
      return {...state, scrollTopNotify: scrollTopNotify}

    case actionTypes.UPDATE_FILTER:
      return {...state, filter: filter}

    case actionTypes.UPDATE_FILTER_NOTIFY:
      return {...state, filterNotify: filterNotify}

    case actionTypes.UPDATE_FILTER_VERSION:
      return {...state, filterVersion: filterVersion}

    case actionTypes.UPDATE_FILTER_WEEKLYREPORT:
      return {...state, filterWeeklyReport: filterWeeklyReport}

    default:
      return state
  }
}
