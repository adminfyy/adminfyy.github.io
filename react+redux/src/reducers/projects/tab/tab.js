// 项目列表的标签页

import { actionTypes } from 'constants'
// import {data} from '../mock';


export default function (state = {}, action = null) {
  const { type, tab, old } = action
  switch (type) {
    case actionTypes.UPDATE_PROJECTS_TAB:

      return {
        curTab: tab,
        oldTab: old
      }
    default:
      return state
  }
}
