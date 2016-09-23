import { actionTypes } from 'constants'

const initialState = { page: 0, 'items': [] }

export default function (state = initialState, action = null) {
  const { type, projectCurVersions, updateObj, isSearch, isCancel } = action

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_CUR_VERSIONS:
      if (isSearch || isCancel) {
        return {
          ...projectCurVersions,
          isSearch,
          page: 1
        }
      }
      return {
        ...projectCurVersions,
        'cur_items': projectCurVersions.items,
        'items': state.items && state.items.concat(projectCurVersions.items) || projectCurVersions.items,
        page: state.page + 1
      }
    case actionTypes.CLEAR_PROJECT_CUR_VERSIONS:
      return {
        ...projectCurVersions,
        'items': null,
        page: 0
      }
    case actionTypes.UPDATE_CUR_VERSIONS:
      let obj = {
        ...projectCurVersions,
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
