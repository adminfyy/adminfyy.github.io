import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const {type, checkNum} = action

  switch (type) {
    case actionTypes.RECEIVE_NOTICE_CHECK_NUM:
      return {
        ...checkNum
      }
    default:
      return state
  }
}
