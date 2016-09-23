import { actionTypes } from 'constants'

export default function(state = {}, action = null) {
  const { type, versionTask } = action
  /* eslint camelcase:0*/
  function reData_Designer(item) {
    versionTask.users.items.forEach(user => {
      if (item.designer + '' === user.user_id + '') {
        item['designer_name'] = user.org_exinfo.real_name
        return false
      }
    })
  }
  function reData_Receiver(item){
    versionTask.users.items.forEach(user => {
      if (item.receiver + '' === user.user_id + '') {
        item['receiver_name'] = user.org_exinfo.real_name
        return false
      }
    })
  }
  switch (type) {
    case actionTypes.RECEIVE_PROJECT_VERSION_TASK_DETAIL:
      reData_Designer(versionTask)
      reData_Receiver(versionTask)
      return {
        ...versionTask
      }
    case actionTypes.RECEIVE_PROJECT_NO_VERSION_TASK_DETAIL:

      return {
        ...versionTask
      }
    default:
      return state
  }
}
