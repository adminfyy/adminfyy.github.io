import { actionTypes } from 'constants'
// import {data} from '../mock'

const initialState = {total: 0, items: [], init: true}

export default function(state = initialState, action = null) {
  const { type, users, isSearch } = action
  switch (type) {
    case actionTypes.RECEIVE_USERS:
      if (isSearch) {
        return {...users, isSearch}
      }

      return {...users, items: state.items.concat(users.items), init: false}
    case actionTypes.CLEAR_USERS:
      return {...users, items: [], init: true}
    default:
      return state
  }
}
