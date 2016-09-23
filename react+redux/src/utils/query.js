'use strict'

export function parseQuery(key) {
  let search = window.location.search
  let result = {}
  if (search) {
    search = search.sub(1)
    let arr = search.split('&')
    arr.forEeach((item, i) => {
      let keyVal = item.split('=')
      result[keyVal[0]] = keyVal[1]
    })
  }
  if (key) {
    if (result.hasOwnProperty(key)) {
      return result[key]
    } else {
      return result
    }
  }
  return result
}
