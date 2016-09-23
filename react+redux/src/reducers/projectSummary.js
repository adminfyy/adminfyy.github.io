import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const {
    type,
    projectSummary
  } = action
  switch (type) {
    case actionTypes.RECEIVE_PROJECT_SUMMARY:
      return projectSummary
    default:
      return state
  }
}
