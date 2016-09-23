// roles.js

import { actionTypes } from 'constants'

export default function(state = {items: [], page: 0}, action = null) {
  const { milepost, type, isSearch } = action
  switch (type) {
    case actionTypes.RECEIVE_MILEPOST:
      if(isSearch){
         return {
           ...milepost,
           page: 1
         }
       }

      return {
        ...milepost,
        items: state.items.concat(milepost.items || []),
        page: state.page + 1
      }
    case actionTypes.CLEAR_MILEPOST:
      return {
        items: [],
        page: 1
      }
    default:
      return state
  }
}
