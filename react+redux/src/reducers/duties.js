import { actionTypes } from 'constants'
// import {data} from '../mock'

const initialState = {count: 0, items: []}

export default function(state = initialState, action = null) {
  const {
    type,
    duties
  } = action
  switch (type) {
    case actionTypes.RECEIVE_DUTIES:
      return {...duties,
        items: state.items.concat(duties.items)
      }
    default:
      return state
  }
}
