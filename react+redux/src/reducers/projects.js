import { actionTypes } from 'constants'
// import {data} from '../mock'

const initialState = {page: 0, spage: 0, items: []}

export default function(state = initialState, action = null) {
  const {
    type,
    projects,
    isSearch,
    keyword
  } = action
  switch (type) {
    case actionTypes.RECEIVE_PROJECTS:
      if (isSearch) {
        return {
          ...projects,
          isSearch,
          keyword,
          spage: state.spage + 1,
          page: state.page
        }
      }
      return {
        ...projects,
        items: state.items.concat(projects.items),
        isSearch,
        keyword,
        page: state.page + 1,
        spage: state.spage
      }
  /*  case actionTypes.GET_PROJECT_STATISTICS:
      return {
        statistics: statistics
      }*/
    default:
      return state
  }
}
