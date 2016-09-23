import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const {
    type,
    history
  } = action

  switch (type) {
    case actionTypes.RECEIVE_HISTORY:
      return history
    default:
      return state
  }
}
