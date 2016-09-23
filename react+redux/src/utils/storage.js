const setStorage = (key, value) => {
  // 适配安卓
  if (typeof AndroidLocalSave !== 'undefined') {
    AndroidLocalSave.setItem(key, value)
  } else if (typeof Bridge !== 'undefined') {
    let mafUtils = Bridge.require('Maf-Utils')
    let ret = mafUtils.setLocalValue({
      'component': 'store',
      'key': key,
      'value': value
    })

    if (ret.result === true) {

      //  console.log("保存值到本地成功")
    }
  } else if (window.localStorage) {
    localStorage.setItem(key, value)
  }
}


const removeStorage = key => {
  // 适配安卓
  if (typeof AndroidLocalSave !== 'undefined') {
    AndroidLocalSave.removeItem(key)
  } else if (window.localStorage) {
    localStorage.removeItem(key)
  }
}

const getStorage = key => {
  let jsonString = ''
    // 适配安卓
  if (typeof AndroidLocalSave !== 'undefined') {
    jsonString = AndroidLocalSave.getItem(key)
  } else if (typeof Bridge !== 'undefined') {
    let mafUtils = Bridge.require('Maf-Utils')
    let ret = mafUtils.getLocalValue({
      'component': 'store',
      'key': key
    })
    if (ret.result === true) {
      jsonString = ret.value
    }
  } else if (window.localStorage) {
    jsonString = localStorage.getItem(key)
  }
  return jsonString
}

export default {
  setStorage: setStorage,
  getStorage: getStorage,
  removeStorage: removeStorage
}
