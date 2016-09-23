import { actionTypes } from 'constants'


export default function (state = {}, action = null) {
  const { type, projectMembers, member, updateMember, subMembers, duty } = action

  let items = []

  function addItem(item, items) {
    for (let i = 0, l = items.length; i < l; i++) {
      let m = items[i]
      if (m.duty === item.duty) {
        m.users = m.users || []
        m.users.push(item)
        return false
      }
    }
    items.push({duty: item.duty, users: [ item ]})
  }

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_MEMBERS:

      projectMembers.items.forEach(item => {
        // projectMembers.users是去uc那边取name返回的数组
        projectMembers.users.items.forEach(user => {
          if (user.user_id + '' === item.user_id + '') {
            item['nick_name'] = user.org_exinfo.real_name
          }
        })
        addItem(item, items)
      })

      projectMembers.items = items

      return projectMembers

    case actionTypes.DELETE_PROJECT_MEMBERS:

      let itemMembers = state.items.map(item => {
        item.users = item.users.filter(user => {
          return member.indexOf(user.user_id) === -1 && user
        })
        return item
      })

      itemMembers = itemMembers.filter(item => {
        return item.users.length > 0
      })


      return {
        ...
          state,
        items: itemMembers,
        total: state.total - 1

      }

    case actionTypes.UPDATE_PROJECT_MEMBERS:
      return {
        ...
          state,
        items: state.items.map(item => {
          item.expend = updateMember ? item.duty === updateMember : false
          return item
        })

      }

    case actionTypes.SUB_ADMIN_MEMBERS:

      state.items.map((item, i) => {
        if (item.duty === duty) {
          item.users.map((v, j) => {
            for (let n = 0; n < subMembers.length; n++) {
              if (subMembers[n]['user_id'] === v['user_id']) {
                v['is_subadmin'] = subMembers[n]['is_subadmin']
                break
              }
            }
          })
        }
      })

      return {
        ...state
      }

    default:
      return state
  }
}
