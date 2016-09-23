import React, {Component} from 'react'
import ProjectReportList from 'components/project/report/ProjectReportList'
import * as helpers from 'utils/helpers'
export default class ProjectWeeklyReport extends Component {
  render() {
    const {projectInfo} = this.props
    let projectId = projectInfo.project_id

    return (
      <div className="project-vision">
        <div className="header-bar">
          <span className="title">项目周报</span>
          <div className="header-actions edit-button report-more"
            onClick={this.gotoPage.bind(this, projectId)}>
            查看更多
          </div>
        </div>

        <ProjectReportList projectInfo={projectInfo} {...this.props} />
      </div>
    )
  }

  gotoPage(id) {
    helpers.goPage(`/project/${id}/weeklyreport`)
  }
}
