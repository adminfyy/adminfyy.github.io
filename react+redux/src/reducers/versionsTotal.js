import { actionTypes } from 'constants'

export default function (state = {}, action = null) {
  const { type, versionsTotal } = action

  switch (type) {
    case actionTypes.RECEIVE_VERSIONS_TOTAL:
      return versionsTotal
    default:
      return state
  }
}
