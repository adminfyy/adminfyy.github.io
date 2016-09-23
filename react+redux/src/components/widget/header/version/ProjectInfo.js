import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from 'actions'
import * as helpers from 'utils/helpers'
@connect(state => ({
  projectInfo: state.h5ProjectInfo}), actionCreators)
export default class ProjectInfo extends Component {
  constructor(){
    super()
  }
  componentDidMount() {
    const {projectInfo} = this.props
    const {pid} = this.props.params
    let options = {
      projectId: pid
    }
    // projectInfo为空 或者 项目id不一致时，重新请求
    if(helpers.isEmpty(projectInfo) || +projectInfo.project_id !== +pid){
      this.props.fetchH5ProjectInfo(options)
    }
  }
  render () {
    let {projectInfo} = this.props
    let projectName = projectInfo ? projectInfo.name : ''
    return (
      <div className="detail-info-wrap iconfont-project">
        项目：{projectName}
      </div>
    )
  }
}
