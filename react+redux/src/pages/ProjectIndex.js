import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from 'actions'
import CurrentRoadmapContainer from 'components/projectIndex/container'
import CurrentRoadmapCard from 'components/projectIndex/card'
import ProjectHeader from 'components/widget/header'
import ViolentHint from 'components/widget/toast/toastStatic'
import * as helpers from 'utils/helpers'
@connect(state => ({
  currentRoadmaps: state.currentRoadmaps,
  currentMilestones: state.currentMilestones,
  projectDetail: state.projectDetail
}), actionCreators)
export default class ProjectIndex extends Component {

  fetchCurrentData() {
    const {fetchProjectDetail, fetchCurrentProjectRoadMaps, fetchCurrentProjectMilestones} = this.props
    let projectId = this.props.params.id
    fetchProjectDetail(projectId)
    fetchCurrentProjectRoadMaps({projectId: projectId})
    fetchCurrentProjectMilestones({projectId: projectId})
  }
  componentDidMount(){
    this.fetchCurrentData()
    helpers.refresh(this.fetchCurrentData.bind(this))
  }
  componentWillUnmount(){
    this.props.clearCurrentProjectRoadmaps()
    this.props.clearCurrentProjectMilestone()
  }
  render() {
    let projectId = this.props.params.id
    const {currentRoadmaps, currentMilestones, projectDetail} = this.props
    if(!projectDetail.hasOwnProperty('project_info') || currentRoadmaps.unloaded || currentMilestones.unloaded){
      return <div className="page-loading"></div>
    }
    // let hints = currentRoadmaps.hints.concat(currentMilestones.hints)
    let hints = [ currentRoadmaps.hint, currentMilestones.hint ].filter((hint) => !!hint)
    return (
      <div className="project-index" onLoad={(e) => {
        helpers.ScrollResize(54, document.querySelector('.project-index'))
        helpers.refreshTouch(document.querySelector('.project-index'))
      }}>
        <ViolentHint hints={hints} key={`violenthint-project-${projectId}-${'' + hints.length + currentRoadmaps.timeout + currentMilestones.timeout}`}/>
        <ProjectHeader projectTitle={'首页'} projectDetail={projectDetail} isMilestone="true" backUrl="/"/>
        <CurrentRoadmapContainer projectId={projectId} title={`路线图`} data={currentRoadmaps} type={'roadmap'} Card={CurrentRoadmapCard} href={`project/${projectId}/roadmap`}/>
        <CurrentRoadmapContainer projectId={projectId} title={`里程碑`} data={currentMilestones} type={'mile-stone'} Card={CurrentRoadmapCard} href={`project/${projectId}/milepost`}/>
      </div>
    )
  }
}
