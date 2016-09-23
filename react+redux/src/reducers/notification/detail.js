// 通知详情
import { actionTypes } from 'constants'
export default function(state = {}, action = null) {
  const {type, notification} = action
  switch (type) {
    case actionTypes.RECEIVE_NOTIFICATION:
      return notification
    default:
      return state
  }
}
