// roles.js

import { actionTypes } from 'constants'

export default function(state = {items: [], empty: true}, action = null) {
  const { milepost, type } = action
  switch (type) {
    case actionTypes.RECEIVE_CURRENT_MILEPOST:
      return {
        ...state,
        items: state.items.concat(milepost.items || []),
        empty: milepost.empty || false
      }
    case actionTypes.CLEAR_CURRENT_MILEPOST:
      return {
        items: [],
        empty: true
      }
    default:
      return state
  }
}
