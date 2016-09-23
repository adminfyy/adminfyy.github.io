import { actionTypes } from 'constants'
const initialState = {count: 0, data: [], selectedItems: [], selectedConfirmItems: [], isCache: true, isClickCheck: true, searchSelectedItems: [], isSearch: true}
export default function(state = initialState, action = null) {
  const {type, selectData, selectItem, isChecked, isAllChecked, selectItems, keyword} = action
  /**
   * [getSelectedItems 获取搜索后的选中数据]
   * @method getSelectedItems
   * @param  {[type]}         data          [description]
   * @param  {[type]}         selectedItems [description]
   * @return {[type]}                       [description]
   */
  function getSelectedItems(data, selectedItems) {
    let searchSelectedItems = []
    data.forEach(function (item) {
      selectedItems.forEach(function (selectedItem) {
        if (+item.id === +selectedItem.id) {
          searchSelectedItems.push(item)
          return
        }
      })
    })
    return searchSelectedItems
  }

  switch (type) {
    // 初始化数据
    case actionTypes.UNIT_SELECT_OPTIONS:
      return selectData
    // 默认获取所有成员
    case actionTypes.RECEIVE_SELECT_OPTIONS:
      let data = []
      selectData.selectedItems.forEach(function (selectedItem) {
        data.push(selectedItem)
      })
      selectData.data.forEach(function (item) {
        let flag = true
        selectData.selectedItems.forEach(function (selectedItem) {
          if (+item.id === +selectedItem.id) {
            flag = false
            return
          }
        })
        if(flag){
          data.push(item)
        }
      })
      return {
        ...selectData,
        total: data.length,
        data: data,
        isSearch: false
      }
    // 点击单行，更新state
    case actionTypes.RECEIVE_SELECT_CHECKED:
      let selectedItems = []
      state.selectedItems.forEach(function (selectedItem) {
        selectedItems.push(selectedItem)
      })
      if(isChecked){
        selectedItems.push(selectItem)
      } else{
        selectedItems = selectedItems && selectedItems.filter(item => {
          if (+item.id !== +selectItem.id) {
            return item
          }
        })
      }
      return {
        ...state,
        isClickCheck: true,
        selectedItems: selectedItems,
        searchSelectedItems: getSelectedItems(state.data, selectedItems)
      }
    // 点击全选，更新state
    case actionTypes.RECEIVE_SELECT_ALL_CHECKED:
      let selectedItemsAllTemp = []
      state.data.forEach(function (item) {
        if (isAllChecked) {
          selectedItemsAllTemp.push(item)
        }
      })
      let selectedItemsAll = selectedItemsAllTemp
      if(state.isSearch){
        state.selectedItems.forEach(function (item) {
          let flag = true
          selectedItemsAllTemp.forEach(function (selectedItem) {
            if (+item.id === +selectedItem.id) {
              flag = false
              return
            }
          })
          if(flag){
            selectedItemsAll.push(item)
          }
        })
      }
      return {
        ...state,
        isClickCheck: false,
        isSeachCheck: state.isSearch,
        selectedItems: selectedItemsAll,
        searchSelectedItems: isAllChecked ? getSelectedItems(state.data, selectedItemsAll) : []
      }
    // 点击确定，更新state
    case actionTypes.SELECTED_CONFIRM:
      return {
        ...state,
        selectedConfirmItems: selectItems
      }
    // 点击搜索后，更新state
    case actionTypes.SEARCH_SELECT_OPTIONS:
      let searchData = []
      selectData.data.forEach(function (item) {
        if(item.label.indexOf(keyword) > -1 || item.id.toString().indexOf(keyword) > -1 || item.pinyin.indexOf(keyword) > -1){
          searchData.push(item)
        }
      })
      return {
        ...state,
        total: searchData.length,
        data: searchData,
        isSearch: true,
        searchSelectedItems: getSelectedItems(searchData, state.selectedItems),
        selectData: selectData
      }
    default:
      return state
  }
}
