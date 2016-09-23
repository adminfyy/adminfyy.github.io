import { actionTypes } from 'constants'

export function unitSelectOptions(selectData) {
  return {
    type: actionTypes.UNIT_SELECT_OPTIONS,
    selectData
  }
}

export function receiveSelectOptions(selectData) {
  return {
    type: actionTypes.RECEIVE_SELECT_OPTIONS,
    selectData
  }
}
export function searchSelectOptions(selectData, keyword) {
  return {
    type: actionTypes.SEARCH_SELECT_OPTIONS,
    selectData,
    keyword
  }
}

export function receiveSelectChecked(selectItem, isChecked) {
  return {
    type: actionTypes.RECEIVE_SELECT_CHECKED,
    selectItem,
    isChecked
  }
}

export function receiveSelectAllChecked(itemId, isAllChecked) {
  return {
    type: actionTypes.RECEIVE_SELECT_ALL_CHECKED,
    itemId,
    isAllChecked
  }
}

export function selectedConfirm(selectItems) {
  return {
    type: actionTypes.SELECTED_CONFIRM,
    selectItems
  }
}
