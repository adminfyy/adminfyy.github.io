import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const {
    type,
    histories
  } = action

  switch (type) {
    case actionTypes.RECEIVE_HISTORIES:
      histories.items.reverse()
      return histories
    default:
      return state
  }
}
