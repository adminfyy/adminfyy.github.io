import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const { type, projectVersionGroupGoals } = action

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_VERSION_GROUP_GOALS:
      return projectVersionGroupGoals
    default:
      return state
  }
}
