import React, {Component} from 'react'
import ProjectReportItem from 'components/project/report/ProjectWeeklyReportItem'

export default class WeeklyReportList extends Component {
  render() {
    const {projectWeeklyReport} = this.props
    let len = Object.keys(projectWeeklyReport.results).length - 1

    let monthArr = []
    for (let i = len; i >= 0; i--) {
      monthArr.push(i)
    }

    return (
      <div className="project-wr-list">
        {
          monthArr.map(item =>
            <ProjectReportItem {...this.props} currentMonth={item} />
          )
        }
      </div>
    )
  }
}
