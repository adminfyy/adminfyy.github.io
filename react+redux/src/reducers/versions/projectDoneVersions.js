import { actionTypes } from 'constants'

const initialState = { page: 0, 'items': [] }

export default function (state = initialState, action = null) {
  const { type, projectDoneVersions, updateObj, isCut, isSearch, isCancel } = action

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_DONE_VERSIONS:
      let items = []
      if (isSearch || isCancel) {
        return {
          ...projectDoneVersions,
          isSearch,
          page: 1
        }
      }
      if (isCut) {
        items = projectDoneVersions.items.length &&
        projectDoneVersions.items ||
        state.items &&
        state.items.slice(0, 20)
        state.page = 1
      } else {
        items = state.items && state.items.concat(projectDoneVersions.items) || projectDoneVersions.items
        state.page = state.page + 1
      }
      return {
        ...projectDoneVersions,
        'items': items,
        'cur_items': projectDoneVersions.items,
        page: state.page
      }
    case actionTypes.CLEAR_PROJECT_DONE_VERSIONS:
      return {
        ...projectDoneVersions,
        'items': null,
        page: 0
      }
    case actionTypes.UPDATE_DONE_VERSIONS:
      let obj = {
        ...projectDoneVersions,
        'items': state.items.map(item => {
          if (item.project_version_id === updateObj.version_id) {
            item.selected = true
          } else {
            item.selected = false
          }
          return item
        }),
        page: state.page
      }
      return obj
    default:
      return state
  }
}
