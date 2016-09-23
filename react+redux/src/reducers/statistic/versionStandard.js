import { actionTypes } from 'constants'
export default function (state = {}, action = null) {
  const {type, versionStandard} = action

  switch (type) {
    case actionTypes.RECEIVE_VERSION_STANDARD:
      return {
        ...versionStandard
      }
    default:
      return state
  }
}
