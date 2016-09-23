// roles.js

import { actionTypes } from 'constants'

export default function(state = {items: [], page: 0}, action = null) {
  const { roadmaps, type, isSearch } = action
  switch (type) {
    case actionTypes.RECEIVE_ROADMAP:
      if(isSearch){
        return {
          ...roadmaps,
          page: 1
        }
      }
      return {
        ...roadmaps,
        items: state.items.concat(roadmaps.items || []),
        page: state.page + 1
      }
    case actionTypes.CLEAR_ROADMAP:
      return {
        items: [],
        page: 1
      }
    default:
      return state
  }
}
