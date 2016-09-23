import { actionTypes } from 'constants'
// import {data} from '../mock'

const initialState = {count: 0, items: [], selectedVersions: []}

export default function (state = initialState, action = null) {
  const { type, selectedVersions, taskcode, isChecked, isAllChecked } = action
  switch (type) {
    case actionTypes.SELECTED_VERSIONS:
      return {
        selectedVersions: state.selectedVersions && state.selectedVersions.concat(selectedVersions)
      }
    case actionTypes.REMOVE_VERSIONS:
      return {
        selectedVersions: state.selectedVersions && state.selectedVersions.filter(item => {
          if (item.taskcode !== selectedVersions.taskcode) {
            return item
          }
        })
      }
    case actionTypes.CLEAR_SELECTED_VERSIONS:
      return {selectedVersions}
    case actionTypes.UPDATE_SELECTED_VERSIONS:

      return {
        ...state,
        selectedVersions: state.selectedVersions && state.selectedVersions.map(function (item) {
          if (isAllChecked) {
            item.isChecked = isChecked
          } else if (item.taskcode === taskcode) {
            item.isChecked = isChecked
          }
          return item
        })
      }

    default:
      return state
  }
}
