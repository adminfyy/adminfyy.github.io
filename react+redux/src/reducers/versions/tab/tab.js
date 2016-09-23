// 版本列表的标签页

import { actionTypes } from 'constants'
// import {data} from '../mock';


export default function (state = {}, action = null) {
  const { type, tab } = action
  switch (type) {
    case actionTypes.UPDATE_VERSIONS_TAB:
      return {
        activeTab: tab
      }
    case actionTypes.CLEAR_VERSIONS_TAB:
      return {
        activeTab: tab
      }
    default:
      return state
  }
}
