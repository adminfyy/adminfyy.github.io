import {actionTypes} from 'constants'

export function updateVersionsTab(tab){
  return {
    type: actionTypes.UPDATE_VERSIONS_TAB,
    tab
  }
}

export function clearVersionsTab(tab){
  return {
    type: actionTypes.UPDATE_VERSIONS_TAB,
    tab
  }
}
