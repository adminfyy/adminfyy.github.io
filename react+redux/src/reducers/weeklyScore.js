import { actionTypes } from 'constants'

export default function (state = {}, action = null) {
  const { type, weeklyScore } = action

  switch (type) {
    case actionTypes.RECEIVE_WEEKLY_SCORE:
      return weeklyScore
    default:
      return state
  }
}
