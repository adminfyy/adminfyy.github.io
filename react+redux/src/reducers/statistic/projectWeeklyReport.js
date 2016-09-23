import { actionTypes } from 'constants'

export default function (state = {}, action = null) {
  const { type, projectWeeklyReport, year, month, isBack, reportId, isReport } = action
  let monthArr = []
  let newObj = {}

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_WEEKLY_REPORT:
      if (typeof month !== 'undefined' && typeof projectWeeklyReport !== 'undefined'){
        for (let i = month; i >= 0; i--) {
          monthArr.push(i)
        }
        // 按月份提取数据
        if (typeof projectWeeklyReport.items !== 'undefined' && projectWeeklyReport.items.length) {
          monthArr.forEach((mitem, i) => {
            newObj[mitem] = []
            projectWeeklyReport.items.map(pitem => {
              if (mitem === (pitem.progress_end_time && +pitem.progress_end_time.substr(5, 2) - 1)) {
                newObj[mitem].push(pitem)
              }
            })
          })
        }

        projectWeeklyReport.results = newObj
      }

      return {
        ...projectWeeklyReport,
        currentMonth: month,
        currentYear: year
      }
    case actionTypes.UPDATE_PROJECT_WEEKLY_REPORT:

      if (reportId) {
        // 用来把未读标识成已读
        state.items = state.items.map(function (item) {
          if (+item.id === +reportId) {
            if (!item.is_read) {
              item['is_read'] = true
            }

            if (isReport) {
              // 评价完了，要改评价状态
              item['progress_status'] = isReport
            }
          }
          return item
        })
      }

      return {
        ...state,
        currentMonth: month,
        currentYear: year,
        isBack
      }

    case actionTypes.CLEAR_PROJECT_WEEKLY_REPORT:
      return {
        ...projectWeeklyReport
      }
    default:
      return state
  }
}
