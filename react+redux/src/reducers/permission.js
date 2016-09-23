import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const {
    type,
    permission
  } = action

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_PERMISSION:
      return permission
    default:
      return state
  }
}
