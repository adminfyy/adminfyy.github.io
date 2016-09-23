import { actionTypes } from 'constants'
const initialState = {page: 0, items: []}

export default function(state = initialState, action = null) {
  const {type, checklist} = action

  checklist && checklist.items.length && checklist.items.map((checkItem, i) => {
    checklist.users.items.forEach((item, j) => {
      if (+checkItem.receive_uid === +item.user_id) {
        checkItem.user = item
      }
    })

    return checkItem
  })

  switch (type) {
    case actionTypes.RECEIVE_NOTICE_CHECKLIST:
      state.items = state.items || []

      return {
        ...checklist,
        items: state.items.concat(checklist.items),
        page: state.page + 1
      }
    case actionTypes.ClEAN_NOTICE_CHECKLIST:
      state.items = []
      return {
        ...checklist,
        items: state.items,
        page: 0
      }
    default:
      return state
  }
}
