// 项目列表的标签页

import { actionTypes } from 'constants'
// import {data} from '../mock';


export default function (state = {}, action = null) {
  const { type, flag} = action
  switch (type) {
    case actionTypes.REFRESH_SUB_PROJECTS:

      return {
        refresh: flag
      }
    default:
      return state
  }
}
