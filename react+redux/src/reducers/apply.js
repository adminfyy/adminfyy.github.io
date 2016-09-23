import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const { type, applyStatus, taskStatus } = action
  switch (type) {
    case actionTypes.RECEIVE_APPLICATION_STATUS:
      return {
        ...applyStatus
      }
    case actionTypes.UPDATE_TASK_STATUS:
      return {
        'application_status': taskStatus
      }
    default:
      return state
  }
}
