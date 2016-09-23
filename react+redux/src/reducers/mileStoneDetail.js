// mileStoneDetail.js
import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const { type, targetTemplateDetail } = action

  switch (type) {
    case actionTypes.RECEIVE_TARGET_TEMPLATE_DETAIL:
      return targetTemplateDetail
    default:
      return state
  }
}
