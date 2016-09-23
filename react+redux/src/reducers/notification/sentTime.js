import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const {type, sentTimeType, sentTime} = action

  switch (type) {
    case actionTypes.UPDATE_SENT_TIME:
      return {
        sentTimeType,
        sentTime
      }
    default:
      return state
  }
}
