import { actionTypes } from 'constants'

export default function (state = {}, action = null) {
  const { type, projectVersionGroupDetail } = action

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_VERSION_GROUP_DETAIL:
      return projectVersionGroupDetail
    default:
      return state
  }
}
