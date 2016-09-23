import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const { type, reportVersions } = action
  switch (type) {
    case actionTypes.H5_RECEIVE_PROJECT_VERSION:
      return {
        ...reportVersions
      }
    default:
      return state
  }
}
