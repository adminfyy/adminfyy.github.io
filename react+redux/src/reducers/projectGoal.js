import { actionTypes } from 'constants'

export default function (state = {}, action = null) {
  const { type, projectGoal, delGoal } = action
  switch (type) {
    case actionTypes.RECEIVE_PROJECT_GOAL:
      return projectGoal

    case actionTypes.DELETE_PROJECT_GOAL:
      let obj = {
        ...
          state,
        items: state.items.filter(item => {
          return '' + item.month !== '' + delGoal.month
        })
      }
      return obj
    default:
      return state
  }
}
