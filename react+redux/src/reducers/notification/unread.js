import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const {type, count} = action

  switch (type) {
    case actionTypes.RECEIVE_NOTICE_UNREAD_COUNT:
      return {
        ...count
      }
    default:
      return state
  }
}
