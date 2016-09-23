// 通知回复列表
import { actionTypes } from 'constants'
import { objectArrayToMap } from 'utils/helpers'
const initialState = {page: 0, items: []}

export default function(state = initialState, action = null) {
  const {type, replys, reply, usernames} = action
  switch (type) {
    case actionTypes.RECEIVE_NOTIFICATION_REPLYS:
      state.items = state.items || []
      return {
        ...replys,
        items: state.items.concat(replys.items),
        page: state.page + 1
      }
    case actionTypes.ADD_NOTIFICATION_REPLY:
      state.items.unshift(reply)
      return {
        ...state,
        empty: false,
        count: state.count > state.items.length ? state.count + 1 : state.items.length
      }
    case actionTypes.CLEAN_NOTIFICATION_REPLY:
      return {
        ...state,
        items: [],
        page: 0
      }
    case actionTypes.UPDATE_NOTIFICATION_REPLY:
      let usernameMap = objectArrayToMap(usernames.items, 'user_id')
      state.items.map((item) => (
        !item.name ? item.name = usernameMap[item.reply_uid].org_exinfo.real_name : ''
      ))
      return {
        ...state
      }
    default:
      return state
  }
}
