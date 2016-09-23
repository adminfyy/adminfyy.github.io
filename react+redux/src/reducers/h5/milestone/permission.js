import { actionTypes } from 'constants'

export default function (state = {}, action = null) {
  const { type, versionPermission } = action

  switch (type) {
    case actionTypes.RECEIVE_VERSION_PERMISSION:
    case actionTypes.CLEAR_VERSION_PERMISSION:
      return {
        versionPermission: versionPermission
      }
    default:
      return state
  }
}
