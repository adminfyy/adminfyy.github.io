import {
  actionTypes
}
from 'constants'

export default function(state = {}, action = null) {
  const {
    type, projectVersionDetail, goalItem, isFail
  } = action

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_VERSION_DETAIL:

      if(isFail){
        projectVersionDetail.isFail = isFail
      }

      return {...projectVersionDetail}


    case
    actionTypes.DELETE_PROJECT_VERSION_GOAL:

      let obj = {
        ...
        state,
        'goal_items':
          state.goal_items.map(item => {
            if (!item.isDel) {
              item.isDel = item.item_id + '' === goalItem.item_id
            }

            return item
          })

      }


      return obj
    case actionTypes.CLEAR_PROJECT_VERSION_DETAIL:

      return {...projectVersionDetail}
    default:
      return state
  }
}
