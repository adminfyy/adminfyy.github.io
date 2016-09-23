// UCUtil.js

import { actionTypes } from 'constants'
// import {data} from '../mock'

const initialState = {total: 0, items: [], init: true}

export default function(state = initialState, action = null) {
  const {
    type,
    Timestamp
  } = action
  switch (type) {
    case actionTypes.RECEIVE_SEVER_TIME:
      return Timestamp
    default:
      return state
  }
}
