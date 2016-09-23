import { actionTypes } from 'constants'
import * as helpers from 'utils/helpers'

export default function (state = {}, action = null) {
  const { type, projectWeeklyReport, month, year } = action
  let monthArr = []
  let newObj = {}
  let currentYear = state.currentYear || helpers.getCurrentDate().year
  let currentMonth = state.currentMonth || helpers.getCurrentDate().month
  let months

  if (state.currentYear < helpers.getCurrentDate().year) {
    months = 11
  } else {
    months = helpers.getCurrentDate().month
  }

  if(typeof projectWeeklyReport !== 'undefined'){
    for (let i = months; i >= 0; i--) {
      monthArr.push(i)
    }

    // 按月份提取数据
    if (typeof projectWeeklyReport.items !== 'undefined' && projectWeeklyReport.items.length) {
      monthArr.forEach((mitem, i) => {
        newObj[mitem] = []
        projectWeeklyReport.items.map(pitem => {
          if (mitem === (pitem.progress_end_time && +pitem.progress_end_time.substr(6, 1) - 1)) {
            newObj[mitem].push(pitem)
          }
        })
      })
    }

    projectWeeklyReport.results = newObj
  }

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_WEEKLY_REPORT:

      return {
        ...projectWeeklyReport,
        currentMonth,
        currentYear
      }
    case actionTypes.UPDATE_PROJECT_WEEKLY_REPORT:

      return {
        ...state,
        currentMonth: month,
        currentYear: year
      }
    case actionTypes.CLEAR_PROJECT_WEEKLY_REPORT:
      return {
        ...projectWeeklyReport
      }
    default:
      return state
  }
}
