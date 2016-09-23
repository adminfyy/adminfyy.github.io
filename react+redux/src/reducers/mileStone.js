import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const { type, lastTime } = action

  switch (type) {
    case actionTypes.RECEIVE_LAST_FINISH_TIME:
      return lastTime
    default:
      return state
  }
}
