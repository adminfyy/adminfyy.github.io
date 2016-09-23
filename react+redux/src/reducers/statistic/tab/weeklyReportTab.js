import { actionTypes } from 'constants'

export default function (state = {}, action = null) {
  const { type, weeklyReportTab } = action
  switch (type) {
    case actionTypes.UPDATE_PROJECTS_TAB:

      return weeklyReportTab
    default:
      return state
  }
}
