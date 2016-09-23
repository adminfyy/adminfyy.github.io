// 所有项目列表

import { actionTypes } from 'constants'

const initialState = {page: 0, spage: 0}

export default function (state = initialState, action = null) {
  const {type, projects, init, keyword, projectInfo} = action

  function reData(item) {
    if(projects.users){
      projects.users.items.forEach(user => {
        if (item.project_info.manager_uid + '' === user.user_id + '') {
          item['project_info']['manager_name'] = user.org_exinfo.real_name
          return
        }
      })
    }
  }

  function mapData(items) {
    return items.map(item => {
      reData(item)
      return item
    })
  }

  switch (type) {
    case actionTypes.RECEIVE_SEARCH_PROJECTS:
      projects.items = mapData(projects.items)
      if (init) {
        return {
          ...projects,
          keyword,
          spage: init ? 0 : state.spage + 1,
          page: 1
        }
      }
      state.items = state.items || []
      return {
        ...projects,
        items: state.items.concat(projects.items),
        keyword,
        page: state.page + 1,
        spage: state.spage
      }
    case actionTypes.CLEAR_SEARCH_PROJECTS:
      return {
        ...projects,
        page: 0,
        spage: 0
      }

    case actionTypes.UPDATE_PROJECTS:
      state.items.map((item) => {
        if(+item.project_info.project_id === +projectInfo.project_id){
          item.project_info = {
            ...item.project_info,
            ...projectInfo
          }
        }
        return item
      })
      return {
        ...state
      }
    default:
      return state
  }
}
