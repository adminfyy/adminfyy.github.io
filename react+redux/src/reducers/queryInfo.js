import { actionTypes } from 'constants'

const initialData = {
  keyword: '',
  $offset: 0
}

export default function(state = initialData, action = null) {
  const {
    type,
    queryInfo
  } = action
  switch (type) {
    case actionTypes.UPDATE_QUERY_INFO:
      return queryInfo
    default:
      return state
  }
}
