import { actionTypes } from 'constants'
// import {data} from '../mock'

// 从新建到添加文档列表页面上，是否选中文档
export default function (state = {}, action = null) {
  const { type, isInit } = action
  switch (type) {
    case actionTypes.INIT_SELECTED_VERSIONS:
      let obj = {isInitState: isInit}
      return {...obj}
    default:
      return state
  }
}
