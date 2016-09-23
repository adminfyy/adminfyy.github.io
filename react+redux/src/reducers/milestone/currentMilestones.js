// roles.js

import { actionTypes } from 'constants'

export default function(state = {items: [], hints: [], unloaded: true}, action = null) {
  const { milestones, type } = action
  switch (type) {
    case actionTypes.RECEIVE_CURRENT_MILESTONE:
      let hint
      if(milestones.timeout > -14 && milestones.timeout <= 0){
        // milestone deadline hint
        hint = {
          title: '里程碑即将到期',
          info: Math.abs(milestones.timeout) !== 0
          ? `里程碑离到期还剩${Math.abs(milestones.timeout)}天，请尽快提交或确认审核状态` : `里程碑今天到期，请尽快提交或确认审核状态`,
          icon: 'danger',
          isShow: 'true'
        }
      } else if (milestones.timeout > 0 || typeof milestones.timeout === 'undefined') {
        // milestone empty hint
        hint = {
          title: '无当前里程碑',
          info: '无当前里程碑，请尽快提交或确认审核状态',
          icon: 'alert',
          isShow: 'true'
        }
      }
      return {
        ...milestones,
        unloaded: false,
        hint: hint
      }
    case actionTypes.CLEAR_CURRENT_MILESTONE:
      return {
        items: [],
        unloaded: true,
        hint: {}
      }
    default:
      return state
  }
}
