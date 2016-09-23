import {
  actionTypes
} from 'constants'

export default function(state = {}, action = null) {
  const {
    type,
    applyHistory,
    operateId
  } = action

  function reSetData(result, applyItem) {
    result[applyItem.duty].items.push(applyItem)
    if (!applyItem.disabled && applyItem.display && applyItem.application_status) {
      /* 同一个duty下，只要有一个审批了（application_status不为0，disabled为0，display为1），
       前端显示该条记录（审批通过或拒绝），其他的都不显示*/
      // 表示有被审批了
      result[applyItem.duty].isApply = true
      result[applyItem.duty].applyData = []
        // 这条就是审批的数据
      result[applyItem.duty].applyData.push(applyItem)
        // 某个角色的整体的一个审批状态
      result[applyItem.duty].status = applyItem.status
      result[applyItem.duty].statusTxt = applyItem.statusTxt
    }
  }

  /**
   * [getApplyStatus 某一个人的审批状态]
   * @param  {[type]} item [description]
   * @return {[type]}      [返回1表示“通过”，2表示”拒绝”,3表示“职位变更”,4表示“待确认”]
   */
  function getApplyStatus(item) {
    if (item.application_status) {
      // 评价过的
      if (!item.disabled && item.display) {
        item.statusTxt = +item.application_status === 1 ? '通过' : '拒绝'
        item.status = item.application_status
        return
      }
    } else if (item.disabled && item.display) {
      // 待评价的---职位变更的情况
      item.statusTxt = '职位变更'
      item.status = 3
      return
    } else if (!item.disabled && item.display) {
      // 待评价的---待确认的情况
      item.statusTxt = '待确认'
      item.status = 4
      return
    }
  }

  let resultArr = []
  applyHistory && applyHistory.items.length && applyHistory.items.map(applyList => {
    applyList.applications = applyList.applications.map(applyItem => {
      applyHistory.users.items.forEach(item => {
        if (+applyItem.reviewer_uid === +item.user_id) {
          applyItem.user = item
        }
      })
      return applyItem
    })
    return applyList
  }).forEach(applyList => {
    let result = {}
    applyList.applications.forEach(applyItem => {
      if (applyItem.duty.indexOf('负责人') === -1) {
        applyItem.duty += '负责人'
      }
      getApplyStatus(applyItem)
      if (result[applyItem.duty] && result[applyItem.duty].items) {
        reSetData(result, applyItem)
      } else {
        result[applyItem.duty] = {}
        result[applyItem.duty].items = []
        reSetData(result, applyItem)
      }
    })
    resultArr.push({
      'application_time': applyList.application_time,
      'apply_operate_id': applyList.apply_operate_id,
      'result': result
    })
  }
)

  /* 设置某个角色的整体的审批状态
   *1.待审批的情况：
   *（1）同一个角色下，所有负责人都是职位变更的--->整体状态是拒绝
   *（2）同一个角色下，部分人是职位变更的，部分人带审批的---->整体状态是待确认
   *2.审批过的情况：
   * （1）审批过的状态---->代表整体状态（拒绝||同意）
   */
  resultArr.forEach(resultItem => {
    Object.keys(resultItem.result).map(key => {
      if (!resultItem.result[key].status) {
        for (let j = 0, len = resultItem.result[key].items.length; j < len; j++) {
          if (+resultItem.result[key].items[j].status === 4) {
            // 待确认
            resultItem.result[key].status = 4
            resultItem.result[key].statusTxt = '待确认'
            break
          } else {
            // 拒绝
            resultItem.result[key].status = 2
            resultItem.result[key].statusTxt = '拒绝'
          }
        }
      }
    })
  })
  switch (type) {
    case actionTypes.RECEIVE_VERSION_APPLY__HISTORY_LIST:
      return {applyList: resultArr}
    case actionTypes.CLEAR_VERSION_APPLY__HISTORY_LIST:
      return {applyList: []}
    case actionTypes.UPDATE_APPLY_HISTORY:
      return {
        ...state,
        operateId
      }
    default:
      return state
  }
}
