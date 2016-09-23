// TaskDialog.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import * as helpers from '../../../../../utils/helpers'
import VersionHeader from 'components/widget/header/version'
import SearchTask from 'components/version/widget/selectMileStone/search/SearchTask'
import TaskResult from 'components/version/widget/selectMileStone/searchResult/TaskResult'
import utils from 'utils'

@connect(state => ({
  misc: state.misc,
  projectNoVersionTasks: state.projectNoVersionTasks,
  selectTask: state.selectTask,
  InitTaskState: state.isInitTaskState,
  removeTask: state.removeTask
}), actionCreators)
export default class TaskDialog extends Component {
  constructor() {
    super()
    this.selectedTasks = []
    this.data = {
      isAllChecked: false
    }
    this.defaultHeight = document.body.clientHeight
  }

  componentDidMount() {
    const { projectId, searchProjectNoVersionTasks, removeTask } = this.props
    // addTask为true是从管理文档那边跳转过来的，false是从创建里程碑那边添加文档过来的
    let taskcodes = this.getTaskCode()
    let options = {
      projectId: projectId,
      taskSearchPage: 0,
      $offset: 0,
      $filter: ''
    }
    if (taskcodes){
      options.$filter = 'taskcode nin ' + taskcodes
    }
    let task = []
    if(!helpers.isEmpty(removeTask)){
      task = removeTask
    }
    searchProjectNoVersionTasks(options, task)
    let step = utils.getStorage('step')
    if (+step === 2) {
      utils.setStorage('step', '3')
    }
    let that = this
    window.onresize = function(){
      let footNode = that.refs['dialog-foot'].getDOMNode()
      if(+document.body.clientHeight < +that.defaultHeight){
        footNode.classList.add('hidden')
      } else {
        footNode.classList.remove('hidden')
      }
    }
  }

  render() {
    let { projectNoVersionTasks, projectDetail, selectTask, addTask } = this.props
    if (!addTask && selectTask.selectedVersions && selectTask.selectedVersions.length) {
      projectNoVersionTasks.items.forEach(function (item) {
        for (let i = 0, len = selectTask.selectedVersions.length; i < len; i++) {
          if (selectTask.selectedVersions[i].taskcode === item.taskcode) {
            item.isChecked = selectTask.selectedVersions[i].isChecked
            break
          }
        }
      })
    }

    this.selectedTasks = projectNoVersionTasks.items.length &&
      projectNoVersionTasks.items.filter(item => {
        return item.isChecked
      })
    let isAllChecked = (this.selectedTasks.length === projectNoVersionTasks.items.length)
    this.data.isAllChecked = isAllChecked

    return (
      <div className="mile-stone-dialog" onClick={this.stop.bind(this)}>
        <div className="dialog-confirm absolute">
          <div className="dialog-confirm-content" data-role="content" ref="dialogConfirm">
            <VersionHeader
              {...this.props}
              projectTitle={ !addTask ? '添加文档' : '编辑文档'}
              projectDetail={projectDetail}
              projectStatus={projectDetail.project_info.status}/>

            <div className="dialog-confirm-main" data-role="main">
              <div className="dialog-confirm-message" data-role="message">
                <SearchTask {...this.props} ref="searchCmp" taskcodes={this.getTaskCode()}/>
                {
                  projectNoVersionTasks.page !== 0
                  ? <TaskResult {...this.props} taskcodes={this.getTaskCode()}/>
                  : <div className="milestone-result">
                    <div className="result-loading">
                      <div className="txt-center">文档加载中...</div>
                    </div>
                  </div>
                }
              </div>
            </div>
            {projectNoVersionTasks.items && projectNoVersionTasks.items.length > 0
            ? <div className="dialog-confirm-foot" data-role="foot" ref="dialog-foot">
                <div className="dialog-confirm-confirm-box dialog-confirm-action" data-role="confirm">
                  <button onClick={this.confirm.bind(this)}>确定</button>
                </div>
                <div onClick={this.checkAll.bind(this)}
                     className={isAllChecked ? 'select-all active' : 'select-all'}>
                  全选
                </div>
              </div>
              : ''
            }
          </div>
        </div>
      </div>
    )
  }

  stop(event) {
    event && event.stopPropagation()
  }

  checkAll() {
    this.props.updateProjectNoVersionTasks(null, !this.data.isAllChecked, true)
    this.props.updateSelectedVersion(null, !this.data.isAllChecked, true)
  }

  confirm(event) {
    let tasks = this.selectedTasks.length && this.selectedTasks.map(item => {
      return {
        taskcode: item.taskcode,
        title: item.title,
        'end_date': item.end_date,
        isChecked: true
      }
    })
    const { addTask, patchProjectVersion, projectId, versionId } = this.props
    let that = this
    if (!tasks || tasks.length === 0) {
      window.toast.setTxt('请先选择文档')
      return null
    }

    // 如果是管理里程碑文档页面上的添加文档 addTask=true
    // 更新里程碑文档列表
    if (addTask) {
      let postData = {
        'project_id': projectId,
        'version_id': versionId,
        'add_task_codes': helpers.makeArray(tasks, 'taskcode')
      }
      patchProjectVersion(postData, function (data) {
        if (data && !data.code) {
          that.cancel()
        }
      })
    } else {
      // 刷新后 projectVersionDetail为空，判断
      /* if(projectVersionDetail.tasks){
        tasks = projectVersionDetail.tasks && tasks.concat(projectVersionDetail.tasks)
      }*/
      this.props.selectedVersions(tasks)
      this.cancel()
    }
  }

  cancel() {
    this.selectedTasks = []
    this.props.clearProjectNoVersionTasks()
    this.props.destroyDialog()
  }

  getTaskCode(){
    const {projectVersionDetail} = this.props
    let taskCodes = ''
    projectVersionDetail.tasks && projectVersionDetail.tasks.forEach(function (item) {
      taskCodes += item.taskcode + ','
    })
    return taskCodes.substring(0, taskCodes.length - 1)
  }

}
