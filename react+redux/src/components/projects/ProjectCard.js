import React, { Component } from 'react'
import * as helpers from '../../utils/helpers'
import utils from 'utils'
import { consts } from 'constants'

import SubscribeButton from 'components/widget/button/SubscribeButton'

class ProjectCard extends Component {
  // componentDidMount() {
  //   let that = this
  //   setTimeout(function () {
  //     that.props.backToListAnimate && that.props.backToListAnimate()
  //     helpers.Scroll({ fnCallback: that.props.onUpload })
  //   }, 150)
  // }
// noAction----有传表示不显示后面的关注和正常异常标识
  render () {
    const { project, noAction } = this.props
    let cssClass = consts.statusCssNew[project.project_info.status]
    let statusText = consts.statusText[project.project_info.status]
    let projectId = project.project_info.project_id
    let isSub = project.project_info.subscribed
    let iconDentryId = project.project_info.icon_dentry_id
    return (
      <div id={`project-card-${projectId}`} className="project-card"
        data-role="panel" ref="panelBody"
           onClick={this.handlePanelBodyClick.bind(this)}>
        <img className="icon" src={helpers.getProjectIcon(iconDentryId || `default.jpg`)} onError={helpers.onError.bind(this, consts.DEFAULT_PROJECT)}/>
        <div className="info">
          <div className="title"><span>{project.project_info.name}</span></div>
          <div className="director">{`负责人:  ${project.project_info.manager_name || '' }`}</div>
        </div>
        { !noAction &&
          <div className="projectAction">
              <div className="status">
                <div className={cssClass}><span>{statusText}</span></div>
                <div className={`status-img-${cssClass}`}></div>
              </div>
              <SubscribeButton className="panel-row" projectId={projectId} isSub={isSub}/>
          </div>
        }
      </div>
    )

    // return (
    //   <div id={"project-card-" + projectId} className={"panel project-card " + cssClass}
    //     data-role="panel" onClick={this.stopProgate.bind(this)}>
    //     <div className="icon"></div>
    //     <div className="panel-caption" ref="panelBody" onClick={this.handlePanelBodyClick.bind(this)}>
    //       <div className="panel-title">{project.project_info.name}</div>
    //       <div className="panel-row">
    //         <SubscribeButton className="panel-row" projectId={projectId} isSub={isSub}/>
    //       </div>
    //     </div>
    //   </div>
    // )
  }

  handlePanelBodyClick() {
    const { project } = this.props
    let node = this.refs.panelBody.getDOMNode()
    node.classList.add('active')
    utils.setStorage('project', JSON.stringify(project))
    // let url = `/menu/1/project/${project.project_info.project_id}/dashboard`
    let url = `/menu/5/project/${project.project_info.project_id}/index`
    helpers.goPage(url)
  }

  stopProgate (event) {
    event.stopPropagation()
  }


}

export default ProjectCard
