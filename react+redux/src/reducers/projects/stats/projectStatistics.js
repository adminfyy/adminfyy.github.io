import { actionTypes } from 'constants'


export default function (state = {}, action = null) {
  const {statistics, type, etype} = action

  switch (type) {
    case actionTypes.GET_PROJECT_STATISTICS:

      return {
        ...statistics
      }
    case actionTypes.UPDATE_PROJECT_STATISTICS:
      if (etype) {
        state['subscribed_count'] = ++state.subscribed_count
      } else {
        state['subscribed_count'] = --state.subscribed_count
        if(state.subscribed_count <= 0){
          state['subscribed_count'] = 0
        }
      }
      return {
        ...state
      }
    default:
      return state
  }
}
