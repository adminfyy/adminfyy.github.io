// groupUser.js
import { actionTypes } from 'constants'

export default function (state = {}, action = null) {
  const { type, groupUser } = action

  switch (type) {
    case actionTypes.RECEIVE_GROUP_USER:
    case actionTypes.CLEAR_GROUP_USER:
      return groupUser

    default:
      return state
  }
}
