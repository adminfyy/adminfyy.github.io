import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const {
    type,
    memberCost
  } = action

  switch (type) {
    case actionTypes.RECEIVE_MEMBER_COST:
      return {...memberCost
      }
    default:
      return state
  }
}
