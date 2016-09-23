import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const { type, reportDetail } = action
  switch (type) {
    case actionTypes.H5_RECEIVE_REPORT_DETAIL:
      return {
        ...reportDetail
      }
    default:
      return state
  }
}
