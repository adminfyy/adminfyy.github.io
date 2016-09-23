import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const {
    type,
    addmember
  } = action

  switch (type) {
    case actionTypes.RECEIVE_ADDMEMBER:
      return addmember
    default:
      return state
  }
}
