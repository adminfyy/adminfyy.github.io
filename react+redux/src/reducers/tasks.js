import { actionTypes } from 'constants'
const initialState = {page: 0, curitem: {}}

export default function (state = initialState, action = null) {
  const { type, versionTask, versionTasks } = action

/*  function reData(item) {
    versionTasks.users.items.forEach(user => {
      if (item.receiver + '' === user.user_id + '') {
        item['nick_name'] = user.org_exinfo.real_name
        return false
      }
    })
  }
*/
  switch (type) {
    case actionTypes.DEL_VERSION_TASK:
      let items = state.items && state.items.filter(item => {
        if (item.taskcode !== versionTask.taskId && item.version_id === parseInt(versionTask.versionId, 10)) {
          return item
        }
      })
      let obj = {
        ...state,
        items: items,
        count: items.length
      }
      return obj
    case actionTypes.RECEIVE_PROJECT_VERSION_Tasks:
      // let items=versionTasks.items.map(item => {
      //   reData(item)
      //   return item
      // })
      return {
        ...versionTasks,
        items: state.items && state.items.concat(versionTasks.items) || versionTasks.items,
        page: state.page + 1
      }
    case actionTypes.REPLACE_PROJECT_VERSION_Tasks:
      return versionTasks
    case actionTypes.CLEAR_PROJECT_VERSION_Tasks:
      return {
        ...versionTasks,
        curitem: {},
        items: null,
        page: 0
      }
    default:
      return state
  }
}
