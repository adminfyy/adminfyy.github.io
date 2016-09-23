import {
  actionTypes
}
  from 'constants'
const initialState = {page: 0}

export default function (state = initialState, action = null) {
  const {
    type, versionTasks
    } = action


  switch (type) {
    case actionTypes.H5_RECEIVE_VERSION_TASKS:
      return {
        ...versionTasks,
        items: state.items && state.items.concat(versionTasks.items) || versionTasks.items,
        page: state.page + 1
      }
    case actionTypes.H5_CLEAR_VERSION_TASKS:

      return {
        ...versionTasks,
        items: versionTasks.items,
        page: 1
      }

    default:
      return state
  }
}
