import { actionTypes } from 'constants'
// import { convertScoreToLevel } from 'utils/helpers'
const initialState = {page: 0}
export default function(state = initialState, action = null) {
  const {type, versionStat} = action
  switch (type) {
    case actionTypes.RECEIVE_VERSION_STAT:
      state.items = state.items || []
      // if(weeklyReport !== undefined && !weeklyReport.empty){
      //   weeklyReport.items.map((report)=>(report.performLevel = convertScoreToLevel(report.progress_score)))
      // }
      return {
        ...versionStat,
        items: state.items.concat(versionStat.items),
        page: state.page + 1
      }
    case actionTypes.ClEAN_VERSION_STAT:
      state.items = []
      return {
        ...versionStat,
        items: state.items,
        page: 0
      }
    default:
      return state
  }
}
