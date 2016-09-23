import React, { Component } from 'react'
import * as helpers from '../../../utils/helpers'
import { consts } from 'constants'

export default class ProjectGoal extends Component {
  constructor () {
    super()
    this.state = {
      goalSummary: false
    }
  }
  componentDidMount() {
    let goalText = this.refs.goalText.getDOMNode()
    let goalArrow = this.refs.goalArrow.getDOMNode()
    if (goalText.scrollHeight > 85) {
      goalArrow.classList.remove('hidden')
    } else {
      goalArrow.classList.add('hidden')
    }
  }
  componentDidUpdate() {
    let goalText = this.refs.goalText.getDOMNode()
    let goalArrow = this.refs.goalArrow.getDOMNode()
    if (goalText.scrollHeight > 85) {
      goalArrow.classList.remove('hidden')
    } else {
      goalArrow.classList.add('hidden')
    }
  }
  render() {
    const {projectId, projectInfo, permission} = this.props
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
      <div className="project-goal">
        <div className="header-bar">
          <span className="title">目标</span>
          <div className="header-actions">
          {canEdit ? arr : ''}
          </div>
        </div>
        <div className="goalSummaryWrap">
          <div ref="goalSummary" >
            <div className="vision-text" dangerouslySetInnerHTML={{__html: projectInfo.goal}} ref="goalText" >
            </div>
            <button className="vision-arrow" ref="goalArrow" onClick={this.expandCollapse.bind(this)}>
            {expand ? arrowBottomArr : arrowTopArr}
            </button>
          </div>
          <textarea className="goalSummary-edit hidden"
            defaultValue={projectInfo.goal}
            ref="goalSummaryEdit"
            key={projectInfo.project_id + projectInfo.goal + ''}>
          </textarea>
        </div>

      </div>
    )
  }
  editHandler() {
    let plainNode = this.refs.goalSummary.getDOMNode()
    let editNode = this.refs.goalSummaryEdit.getDOMNode()
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
      editNode.style.height = '14rem'
    } else {
      editNode.style.height = '50px'
    }
  }

  completeHandler() {
//    helpers.tabNormal()
    const {projectId, updateProjectGoalSummary} = this.props
    let editNode = this.refs.goalSummaryEdit.getDOMNode()
    let options = {}
    options.projectId = projectId
    options.goalSummary = {
      goal: editNode.value
    }
    let that = this
    updateProjectGoalSummary(options, function () {
      that.setState({
        goalSummary: true
      })
      // 给goalSummaryText赋值
      let PlainText = that.refs.goalText.getDOMNode()
      PlainText.innerHTML = editNode.value
      // 更新或者新增都需要更新页面
      that.completeRefresh()
      that.forceUpdate()
    })
  }


  completeRefresh() {
    let plainNode = this.refs.goalSummary.getDOMNode()
    let btnEdit = this.refs.btnEdit.getDOMNode()
    let editNode = this.refs.goalSummaryEdit.getDOMNode()
    let btnComplete = this.refs.btnComplete.getDOMNode()
    let that = this
    let complete = {
      goalSummary: that.state.goalSummary
    }
    if(complete && complete.goalSummary) {
      plainNode.style.display = 'block'
      btnEdit.style.display = 'block'
      editNode.style.display = 'none'
      btnComplete.style.display = 'none'
    }
  }

  expandCollapse() {
    this.setState({hasArrow: true})
    let node = this.refs.goalText.getDOMNode()
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
