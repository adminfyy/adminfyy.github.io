import { actionTypes } from 'constants'
const initialState = {page: 0}

export default function(state = initialState, action = null) {
  const {type, mineWeeklyReport} = action
  switch (type) {
    case actionTypes.RECEIVE_MINE_WEEKLYREPORT:
      state.items = state.items || []
      return {
        ...mineWeeklyReport,
        items: state.items.concat(mineWeeklyReport.items),
        page: state.page + 1
      }
    case actionTypes.ClEAN_MINE_WEEKLYREPORT:
      state.items = []
      return {
        ...mineWeeklyReport,
        items: state.items,
        page: 0
      }
    default:
      return state
  }
}
