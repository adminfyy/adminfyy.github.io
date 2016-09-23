// roles.js

import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const {
    type,
    roles
  } = action
  switch (type) {
    case actionTypes.RECEIVE_USER_ROLES:
      return roles
    default:
      return state
  }
}
