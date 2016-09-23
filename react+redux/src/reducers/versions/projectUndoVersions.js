import { actionTypes } from 'constants'

const initialState = { page: 0, 'items': [] }

export default function (state = initialState, action = null) {
  const { type, projectUndoVersions, updateObj, isCut, isSearch, isCancel, versionId } = action

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_UNDO_VERSIONS:
      let items = []
      if (isSearch || isCancel) {
        return {
          ...projectUndoVersions,
          isSearch,
          page: 1
        }
      }
      if (isCut) {
        items = projectUndoVersions.items.length &&
        projectUndoVersions.items ||
        state.items &&
        state.items.slice(0, 20)
        state.page = 1
      } else {
        items = state.items && state.items.concat(projectUndoVersions.items) || projectUndoVersions.items
        state.page = state.page + 1
      }
      return {
        ...projectUndoVersions,
        'items': items,
        'cur_items': projectUndoVersions.items,
        page: state.page
      }
    case actionTypes.CLEAR_PROJECT_UNDO_VERSIONS:
      return {
        ...projectUndoVersions,
        'items': null,
        page: 0
      }
    case actionTypes.REMOVE_UNDO_VERSION:
      let undoItems = []
      undoItems = state.items.filter(item => {
        if (+item.project_version_id !== +versionId) {
          return item
        }
      })
      return {
        ...projectUndoVersions,
        'items': undoItems,
        page: state.page
      }
    case actionTypes.UPDATE_UNDO_VERSIONS:
      let obj = {
        ...projectUndoVersions,
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
