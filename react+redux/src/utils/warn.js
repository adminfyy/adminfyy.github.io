/*
   项目异常的提示
 */
import {setStorage, getStorage} from './storage'
import {dateTime, getUid} from './helpers'

export default{
  get key(){
    return dateTime(new Date()).toString('yyyy-MM-dd').replace(/-/g, '') + '-' + getUid() + '-warn-key'
  },
  set warnKey (val) {
    setStorage(this.key, val)
  },
  get warnKey (){
    return getStorage(this.key)
  }
}
