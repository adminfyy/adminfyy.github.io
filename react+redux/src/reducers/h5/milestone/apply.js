import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const {
    type,
    applyStatus
  } = action
  switch (type) {
    case actionTypes.RECEIVE_VERSION_STATUS:
      return {
        ...applyStatus
      }
    case actionTypes.UPDATE_VERSION_STATUS:
      return {
        'application_status': applyStatus
      }
    default:
      return state
  }
}
