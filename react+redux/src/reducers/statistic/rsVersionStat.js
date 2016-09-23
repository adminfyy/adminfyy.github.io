import { actionTypes } from 'constants'
// import { convertScoreToLevel } from 'utils/helpers'
const initialState = {page: 0}

export default function(state = initialState, action = null) {
  const {type, rsVersionStat} = action
  switch (type) {
    case actionTypes.RECEIVE_RS_VERSION_STAT:
      state.items = state.items || []
      return {
        ...rsVersionStat,
        items: state.items.concat(rsVersionStat.items),
        page: state.page + 1
      }
    case actionTypes.ClEAN_RS_VERSION_STAT:
      state.items = []
      return {
        ...rsVersionStat,
        items: state.items,
        page: 0
      }
    default:
      return state
  }
}
