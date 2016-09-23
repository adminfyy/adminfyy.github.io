import { actionTypes } from 'constants'

export default function (state = {}, action = null) {
  const { type, removeTask } = action
  switch (type) {
    case actionTypes.RESTORE_REMOVE_TASK:
      return removeTask.map(item => {
        item.isChecked = false
        return item
      })
    default:
      return state
  }
}
