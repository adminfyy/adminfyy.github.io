import { actionTypes } from 'constants'
import { convertScoreToLevel } from 'utils/helpers'
const initialState = {page: 0, items: []}

export default function(state = initialState, action = null) {
  const {type, weeklyReport} = action
  switch (type) {
    case actionTypes.RECEIVE_WEEKLYREPORT:
      state.items = state.items || []
      if(typeof weeklyReport !== 'undefined'){
        weeklyReport.items.map((report) => (report.performLevel = convertScoreToLevel(report.progress_score)))
      }
      return {
        ...weeklyReport,
        items: state.items.concat(weeklyReport.items),
        page: state.page + 1
      }
    case actionTypes.ClEAN_WEEKLYREPORT:
      state.items = []
      return {
        ...weeklyReport,
        items: state.items,
        page: 0
      }
    case actionTypes.UPDATE_RECEIVE_WEEKLYREPORT_RANKING:
      let index = 1

      state.items.map(function(item){
        if(parseFloat(item.ranking) === index){
          item.isFirst = true
        }
        index = index + 1
      })
      return {
        ...state
      }
    default:
      return state
  }
}
