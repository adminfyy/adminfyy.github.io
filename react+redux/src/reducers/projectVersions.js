import { actionTypes } from 'constants'

const initialState = {page: 0, items: []}

export default function (state = initialState, action = null) {
  const { type, projectVersions, isSearch, updateObj, versionId } = action

  function reData(item) {
    projectVersions.users.items.forEach(user => {
      if (item.creator_uid + '' === user.user_id + '') {
        item['nick_name'] = user.org_exinfo.real_name
        return false
      }
    })
  }

  function mapData(items) {
    return items.map(item => {
      reData(item)
      return item
    })
  }

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_VERSIONS:

      let items = []

      if (isSearch) {
        projectVersions.items = projectVersions.items.filter(item => {
          return item.version_application_status === 0
        })
        if (versionId) {
          items = projectVersions.items.filter(item => {
            return item.project_version_id !== versionId
          })
          items = mapData(items)
          return {
            ...projectVersions,
            items: state.items.concat(items),
            isSearch,
            page: state.page + 1
          }
        }
        items = mapData(items)
        return {
          ...projectVersions,
          isSearch,
          page: 1
        }
      }
      items = mapData(projectVersions.items)
      return {
        ...projectVersions,
        items: state.items.concat(items),
        isSearch,
        page: state.page + 1
      }
    case actionTypes.CLEAR_PROJECT_VERSIONS:
      return {
        ...projectVersions,
        items: [],
        page: 0
      }
    case actionTypes.UPDATE_VERSION:


      let obj = {
        ...projectVersions,
        items: state.items.map(item => {
          if (item.project_version_id === updateObj.version_id) {
            item.selected = true
          } else {
            item.selected = false
          }
          return item
        }),
        isSearch,
        page: state.page
      }

      return obj
    default:
      return state
  }
}
