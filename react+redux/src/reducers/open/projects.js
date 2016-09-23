// 所有项目列表
import { actionTypes } from 'constants'

const initialState = {page: 0, spage: 0, items: []}

export default function (state = initialState, action = null) {
  const { type, projects, keyword, projectId, isSelected } = action

  switch (type) {
    case actionTypes.RECEIVE_PROJECTS_ALL:
      state.items = state.items || []

      return {
        ...projects,
        items: state.items.concat(projects.items),
        keyword,
        page: state.page + 1,
        spage: state.spage
      }
    case actionTypes.UPDATE_PROJECTS_ALL:
      return {
        ...state,
        projects: state.items && state.items.map(function(item) {
          if (item.project_id === projectId) {
            item.isSelected = isSelected
          } else{
            item.isSelected = 0
          }

          return item
        }),
        keyword,
        page: state.page,
        spage: state.spage
      }
    case actionTypes.CLEAR_PROJECTS_ALL:
      return {
        ...projects,
        page: 0,
        spage: 0
      }
    default:
      return state
  }
}
