import React, { Component } from 'react'
import {consts} from 'constants'
import * as helpers from '../../../utils/helpers'

export default class ProjectVision extends Component {

  componentDidMount() {
    if(navigator.userAgent.indexOf('Mobile') !== -1){
      this.setState({
        mobile: true
      })
    } else {
      this.setState({
        mobile: false
      })
    }
  }

  componentDidUpdate() {
    let visionText = this.refs.visionText.getDOMNode()
    let visionArrow = this.refs.visionArrow.getDOMNode()
    if (visionText.scrollHeight > 85) {
      visionArrow.classList.remove('hidden')
    } else {
      visionArrow.classList.add('hidden')
    }
  }

  render() {
    const {projectInfo, permission} = this.props
    // let canEdit = permission &&(permission.duty === '项目负责人'||permission.duty === '董事长'||permission.duty === 'VP')
    let projectId = projectInfo.project_id
    let canEdit = helpers.checkPermission(consts.PERMISSION_TYPE.editable, projectId, permission)

    let expand = this.state && this.state.expand
    let arr = [
      <div className="edit-button" key="edit" ref="btnEdit" onClick={this.editHandler.bind(this)}>编辑</div>,
      <div className="edit-button hidden" key="complete" ref="btnComplete" onClick={this.completeHandler.bind(this)}>保存</div>
    ]

    let arrowTopArr = [
      <div key="in" className="vision-arrow-top-in" ></div>,
      <div key="out" className="vision-arrow-top-out"></div>
    ]

    let arrowBottomArr = [
      <div key="in" className="vision-arrow-bottom-in" ></div>,
      <div key="out" className="vision-arrow-bottom-out"></div>
    ]


    return (
      <div className="project-vision">
        <div className="header-bar">
          <span className="title">愿景</span>
          <div className="header-actions">
          {canEdit ? arr : ''}
          </div>
        </div>
        <div ref="visionPlain" >
          <div className="vision-text" dangerouslySetInnerHTML={{__html: projectInfo.vision}} ref="visionText" >
          </div>
          <button className="vision-arrow" ref="visionArrow" onClick={this.expandCollapse.bind(this)}>
          {expand ? arrowBottomArr : arrowTopArr}
          </button>

        </div>
        <textarea className="vision-edit hidden"
        defaultValue={projectInfo.vision}
        key={projectId}
        ref="visionEdit">
        </textarea>
      </div>
    )
  }
  editHandler() {
    let plainNode = this.refs.visionPlain.getDOMNode()
    let editNode = this.refs.visionEdit.getDOMNode()
    let btnEdit = this.refs.btnEdit.getDOMNode()
    let btnComplete = this.refs.btnComplete.getDOMNode()
    let width = plainNode.scrollWidth
    let height = plainNode.scrollHeight

    btnEdit.style.display = 'none'
    plainNode.style.display = 'none'
    editNode.style.display = 'block'
    btnComplete.style.display = 'block'

    editNode.style.width = (width - 20) + 'px'
    if (this.state && this.state.expand) {
      editNode.style.height = height * 0.848 + 'px'
    } else if (width > 479) {
      editNode.style.height = '48px'
    } else {
      editNode.style.height = '43px'
    }
  }
  completeHandler() {
    const {projectId, updateProjectVision, projectInfo} = this.props

    let plainNode = this.refs.visionPlain.getDOMNode()
    let editNode = this.refs.visionEdit.getDOMNode()
    let PlainText = this.refs.visionText.getDOMNode()
    let btnEdit = this.refs.btnEdit.getDOMNode()
    let btnComplete = this.refs.btnComplete.getDOMNode()

    let options = {}
    options.projectId = projectId
    options.data = {
      vision: editNode.value
    }
    const that = this
    updateProjectVision(options, function () {
      PlainText.innerHTML = projectInfo.vision = editNode.value
      btnEdit.style.display = 'block'
      plainNode.style.display = 'block'
      editNode.style.display = 'none'
      btnComplete.style.display = 'none'
      that.forceUpdate()
    })
  }

  expandCollapse() {
    this.setState({hasArrow: true})
    let node = this.refs.visionText.getDOMNode()
    if (this.state && this.state.expand) {
      this.setState({
        expand: false
      })
      node.style.height = '3rem'
    } else {
      this.setState({
        expand: true
      })
      node.style.height = 'auto'
    }
  }

}
