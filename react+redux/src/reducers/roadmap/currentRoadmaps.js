// roles.js

import { actionTypes } from 'constants'

export default function(state = {items: [], hints: [], unloaded: true}, action = null) {
  const { roadmaps, type } = action
  switch (type) {
    case actionTypes.RECEIVE_CURRENT_ROADMAP:
      let hint
      if(roadmaps.timeout > -14 && roadmaps.timeout <= 0){
        // roadmap deadline hint
        hint = {
          title: '路线图即将到期',
          info: Math.abs(roadmaps.timeout) !== 0 ? `离到期还剩${Math.abs(roadmaps.timeout)}天，请尽快提交路线图` : '路线图今天到期，请尽快提交或确认审核状态',
          icon: 'danger',
          isShow: 'true'
        }
      } else if (roadmaps.timeout > 0 || typeof roadmaps.timeout === 'undefined') {
        // roadmap empty hint
        hint = {
          title: '无当前路线图',
          info: typeof roadmaps.timeout !== 'undefined' && `已超期${Math.abs(roadmaps.timeout) || 0}天，超期90天将强制释放开发人员` || '无当前路线图，请尽快提交或确认审核状态',
          icon: 'alert',
          isShow: 'true'
        }
      }
      return {
        ...roadmaps,
        unloaded: false,
        hint: hint
      }
    case actionTypes.CLEAR_CURRENT_ROADMAP:
      return {
        items: [],
        unloaded: true,
        hint: {}
      }
    default:
      return state
  }
}
