import {actionTypes} from 'constants'

export function updateQueryInfo(queryInfo) {
  return {
    type: actionTypes.UPDATE_QUERY_INFO,
    queryInfo
  }
}
