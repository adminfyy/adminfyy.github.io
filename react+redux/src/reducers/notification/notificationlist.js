import { actionTypes } from 'constants'
import { objectArrayToMap } from 'utils/helpers'
const initialState = {page: 0, items: []}

export default function(state = initialState, action = null) {
  const {type, notifications, usernames, index, notification} = action
  switch (type) {
    case actionTypes.RECEIVE_NOTIFICATIONS:
      state.items = state.items || []
      return {
        ...notifications,
        items: state.items.concat(notifications.items),
        page: state.page + 1
      }
    case actionTypes.ClEAN_NOTIFICATIONS:
      state.items = []
      return {
        ...notifications,
        items: state.items,
        page: 0
      }
    case actionTypes.UPDATE_NOTIFICATIONS:
      let usernameMap = objectArrayToMap(usernames.items, 'user_id')
      return {
        ...state,
        items: state.items.map((item) => {
          if(!item.name){
            item.name = usernameMap[item.send_uid].org_exinfo.real_name
          }
          return item
        })
      }
    case actionTypes.UPDATE_NOTIFICATION:
      state.items[index] = notification
      return {
        ...state
      }
    default:
      return state
  }
}
