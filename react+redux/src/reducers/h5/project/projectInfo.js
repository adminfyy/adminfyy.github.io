import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const { type, projectInfo } = action
  switch (type) {
    case actionTypes.H5_RECEIVE_PROJECT_INFO:
      return {
        ...projectInfo
      }
    default:
      return state
  }
}
