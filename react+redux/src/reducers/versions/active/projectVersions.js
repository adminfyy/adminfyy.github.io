import { actionTypes } from 'constants'

const initialState = { page: 0, 'items': [] }

export default function (state = initialState, action = null) {
  const { type, projectVersions, isSearch, updateObj } = action

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_VERSIONS:
      return {
        ...projectVersions,
        'items': state.items && state.items.concat(projectVersions.items) || projectVersions.items,
        isSearch,
        page: state.page + 1
      }
    case actionTypes.CLEAR_PROJECT_VERSIONS:
      return {
        ...projectVersions,
        'items': null,
        page: 0
      }
    case actionTypes.UPDATE_VERSION:
      let obj = {
        ...projectVersions,
        'items': state.items.map(item => {
          if (item.project_version_id === updateObj.version_id) {
            item.selected = true
          } else {
            item.selected = false
          }
          return item
        }),
        isSearch,
        page: state.page
      }
      return obj
    default:
      return state
  }
}
