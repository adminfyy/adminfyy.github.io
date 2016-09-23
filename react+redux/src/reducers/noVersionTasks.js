// versionTasks.js
import { actionTypes } from 'constants'

const initialState = {page: 0, items: []}

export default function (state = initialState, action = null) {
  const { type, projectNoVersionTasks, isSearch, isAllChecked, taskcode, isChecked, removeTask } = action
  switch (type) {
    case actionTypes.RECEIVE_PROJECT_NOVERSIONS_TASKS:
      if (isSearch) {
        return {
          ...projectNoVersionTasks,
          isSearch,
          count: projectNoVersionTasks.count + removeTask.length,
          items: removeTask.concat(projectNoVersionTasks.items),
          page: 1
        }
      }
      let items = state.items
      if(state.page === 0){
        items = removeTask.concat(state.items)
      }
      return {
        ...projectNoVersionTasks,
        count: projectNoVersionTasks.count + removeTask.length,
        items: items.concat(projectNoVersionTasks.items),
        isSearch,
        page: state.page + 1
      }

    case actionTypes.UPDATE_PROJECT_NOVERSIONS_TASKS:
      return {
        ...state,
        items: state.items && state.items.map(item => {
          if (isAllChecked) {
            item.isChecked = isChecked
          } else if (item.taskcode === taskcode) {
            item.isChecked = isChecked
          }
          return item
        })
      }
    case actionTypes.CLEAR_PROJECT_NOVERSIONS_TASKS:
      return {
        ...projectNoVersionTasks,
        items: [],
        page: 0
      }
    default:
      return state
  }
}
