import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectHeader from 'components/widget/header'
import ProjectVision from 'components/project/vision/ProjectVision'
import ProjectGoal from 'components/project/goal/ProjectGoal'
import ProjectWeeklyReport from 'components/project/report/ProjectWeeklyReport'
import Blank from 'components/widget/tab/blank/index'
import {tabNormal, checkPermission} from 'utils/helpers'
import utils from 'utils'
import * as actionCreators from 'actions'
import { is } from 'immutable'
import * as consts from 'constants/const'
import * as helpers from 'utils/helpers'
@connect(state => ({
  roles: state.roles,
  projectDetail: state.projectDetail,
  members: state.members,
  projectGoal: state.projectGoal,
  projectWeeklyReport: state.projectWeeklyReport
}), actionCreators)
export default class ProjectDetailPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props === nextProps || is(this.props, nextProps)) || !(this.state === nextState || is(this.state, nextState))
  }

  componentDidMount() {
    const that = this
    let callback = function(){
      let options = {
        projectId: that.props.params.id,
        $orderby: 'progress_end_time DESC',
        $count: true,
        $limit: 3
      }
      that.props.fetchProjectDetail(that.props.params.id)
      that.props.fetchUCUserRoles()
      that.props.fetchProjectGoal(that.props.params.id)
      // that.props.fecthProjectWeeklyReport(options)
    }
    callback && callback()
    helpers.refresh(callback)
    let $el = document.querySelector('.overflow-y')
    helpers.refreshTouch($el)
  }
  // componentWillUnmount(){
  //   tabNormal()
  // }

  render() {
    utils.setStorage('memberListBackUrl', '/menu/4/project/' + this.props.params.id)
    const {
      projectDetail,
      updateProjectVision,
      updateProjectGoalSummary,
      projectGoal,
      fetchProjectDetail,
      fetchProjectGoal,
      putProjectGoal,
      addProjectGoal,
      deleteProjectGoal,
      roles
    } = this.props
    let isIconEditable = checkPermission(consts.PERMISSION_TYPE.editable, this.props.params.id, roles)
    if (projectDetail && projectDetail.project_info) {
      const state = this.state
      const projectInfo = projectDetail.project_info
      const backUrl = `menu/5/project/${this.props.params.id}/index`
      // return (
      //   <div className="overflow-y">
      //     <div className="project-page">
      //       <ProjectHeader {...this.props}
      //       state={state}
      //       projectTitle={'说明'}
      //       backUrl={backUrl}
      //       isIconEditable={isIconEditable}
      //       projectDetail={projectDetail}
      //       />
      //       <ProjectVision projectInfo={projectInfo}
      //         updateProjectVision={updateProjectVision}
      //         projectId={this.props.params.id}
      //         permission={roles} />
      //
      //       <ProjectGoal projectInfo={projectInfo}
      //         fetchProjectGoal={fetchProjectGoal}
      //         fetchProjectDetail={fetchProjectDetail}
      //         updateProjectGoalSummary={updateProjectGoalSummary}
      //         projectGoal={projectGoal}
      //         putProjectGoal={putProjectGoal}
      //         addProjectGoal={addProjectGoal}
      //         deleteProjectGoal={deleteProjectGoal}
      //         projectId={this.props.params.id}
      //         permission={roles} />
      //
      //       <ProjectWeeklyReport projectInfo={projectInfo} {...this.props} />
      //
      //       <Blank />
      //     </div>
      //   </div>
      // )
      return (
        <div className="overflow-y">
          <div className="project-page">
            <ProjectHeader {...this.props}
            state={state}
            projectTitle={'说明'}
            backUrl={backUrl}
            isIconEditable={isIconEditable}
            projectDetail={projectDetail}
            />
            <ProjectVision projectInfo={projectInfo}
              updateProjectVision={updateProjectVision}
              projectId={this.props.params.id}
              permission={roles} />

            <ProjectGoal projectInfo={projectInfo}
              fetchProjectGoal={fetchProjectGoal}
              fetchProjectDetail={fetchProjectDetail}
              updateProjectGoalSummary={updateProjectGoalSummary}
              projectGoal={projectGoal}
              putProjectGoal={putProjectGoal}
              addProjectGoal={addProjectGoal}
              deleteProjectGoal={deleteProjectGoal}
              projectId={this.props.params.id}
              permission={roles} />
            <Blank />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="page-loading"></div>
        </div>
      )
    }
  }

  gotoMonthView() {
    const oldState = this.state || {}
    this.setState({
      ...oldState,
      costData: this.props.projectDetail.cost_month_summaries,
      activeTab: 'month'
    })
  }

  gotoTotalView() {
    const oldState = this.state || {}
    this.setState({
      ...oldState,
      costData: this.props.projectDetail.cost_summary,
      activeTab: 'total'
    })
  }
}
