// forumUser.js
import { actionTypes } from 'constants'

export default function (state = {}, action = null) {
  const { type, forumUser } = action

  switch (type) {
    case actionTypes.RECEIVE_FORUM_USER:
    case actionTypes.CLEAR_FORUM_USER:
      return forumUser
    default:
      return state
  }
}
