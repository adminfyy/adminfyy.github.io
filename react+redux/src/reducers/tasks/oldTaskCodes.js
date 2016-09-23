import { actionTypes } from 'constants'
const initialState = {tasks: []}

export default function (state = initialState, action = null) {
  const { type, tasks } = action
  switch (type) {
    case actionTypes.RESTORE_TASKS:
      return {tasks}
    default:
      return state
  }
}
