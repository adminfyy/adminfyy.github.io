import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as helpers from '../../../utils/helpers'
import * as actionCreators from 'actions'
import Field from 'components/fields/Field'
import VersionHeader from 'components/widget/header/version'
import VersionHistory from 'components/version/ProjectVersionHistory'
import Comment from 'components/widget/textarea'
import utils from 'utils'
import moment from 'moment'

@connect(state => ({
  applyHistory: state.applyHistory,
  versionTasks: state.versionTasks,
  projectVersionDetail: state.projectVersionDetail,
  projectDetail: state.projectDetail,
  selectTask: state.selectTask,
  oldTaskCodes: state.oldTaskCodes
}), actionCreators)
class ProjectMilestoneEdit extends Component {
  constructor(props) {
    super()
    this.style = {
      height: (document.documentElement.clientHeight - 180) + 'px',
      width: 'auto'
    }
    this.state = {
      tasks: [],
      OneMonth: 30 * 24 * 60 * 60 * 1000,
      isEdit: props.versionId || false
    }
    this.subjectData = {
      className: 'js-subject',
      required: true,
      'value_type': 3,
      maxLength: 24,
      'field_name': '里程碑名'
    }
    this.endDateData = {
      id: 'end-date',
      className: 'end-date',
      required: true,
      'value_type': 4,
      'field_name': '结束时间',
      handleChangeDate: this.handleTime.bind(this)
    }
    this.startDateData = {
      id: 'start-date',
      className: 'date-border',
      required: true,
      'value_type': 4,
      'field_name': '开始时间',
      handleChangeDate: this.handleTime.bind(this)
    }
    this.desDefault = {
      title: '里程碑描述',
      total: 150,
      placeholder: '请简单描述里程碑的主要内容（150个字以内）',
      required: true,
      textareaCss: 'versionDes',
      inputHeight: 228
    }
  }

  componentWillUnmount() {
    window.dialog.setOptions({
      visible: false
    })
  }

  componentDidMount() {
    const that = this
    let {projectId, versionId, fetchProjectVersionDetail, fetchProjectVersionTasks, projectVersionDetail, selectTask} = this.props
    let options = {
      projectId: projectId,
      versionId: versionId
    }
    let tasks = []
    // isEdit
    // true 编辑里程碑，请求接口，里程碑信息，里程碑下的文档
    // false 创建里程碑
    if (versionId) {
      // 缓存数据，不请求接口
      if(projectVersionDetail && projectVersionDetail.isCache){
        selectTask.selectedVersions && selectTask.selectedVersions.forEach(function (item) {
          projectVersionDetail.tasks.push(item)
        })
        that.setState({
          tasks: projectVersionDetail.tasks,
          projectVersionDetail: projectVersionDetail
        })
      } else{
        // 编辑里程碑，首次进入，请求接口
        fetchProjectVersionDetail(options, function (data) {
          that.setState({
            projectVersionDetail: data
          })
        })
        options.$offset = 0
        options.isEdit = 1
        fetchProjectVersionTasks(options, function (data) {
          tasks = data.items
          selectTask.selectedVersions && selectTask.selectedVersions.forEach(function (item) {
            tasks.push(item)
          })
          that.setState({
            tasks: tasks
          })
          let oldTaskCodes = helpers.makeArray(data.items, 'taskcode', true)
          that.props.restoreTasks(oldTaskCodes)
        })
      }
      this.props.clearApplyHistory()
      this.props.fetchApplyHistory(options)
    } else {
      selectTask.selectedVersions && selectTask.selectedVersions.forEach(function (item) {
        tasks.push(item)
      })
      that.setState({
        tasks: tasks,
        projectVersionDetail: projectVersionDetail
      })
      that.props.restoreTasks([])
    }
  }
  componentDidUpdate () {
    let $el = document.querySelector('.js-scroll')
    helpers.refreshTouch($el)
  }
  render() {
    let { projectVersionDetail, tasks, OneMonth, isEdit } = this.state
    const {applyHistory} = this.props
    if (isEdit) {
      if (!projectVersionDetail || !tasks) {
        return (
          <div className="page-loading"></div>
        )
      }
    } else if (!projectVersionDetail){
      return (
          <div className="page-loading"></div>
        )
    }
    if (!helpers.isEmpty(projectVersionDetail)) {
      this.subjectData.value = projectVersionDetail.version_title
      this.startDateData.value = projectVersionDetail.schedule_begin_time
      this.endDateData.value = this.endDateData.value ? this.endDateData.value : projectVersionDetail.schedule_end_time
      this.desDefault.value = projectVersionDetail.version_intro
    } else {
      this.startDateData.value = Date.now()
      if (!this.endDateData.value || this.endDateData.value === 0) {
        this.endDateData.value = Date.now() + OneMonth
      }
    }
    let editStr = isEdit ? '编辑' : '创建'
    let fromFlag = this.props.fromFlag
    let milestoneListUrl = `/menu/2/versions/${this.props.projectId}`
    let milestoneDetailUrl = `/project/${this.props.projectId}/version/${this.props.versionId}/detail/status/1`
    let backUrl = isEdit ? (+fromFlag ? milestoneListUrl : milestoneDetailUrl) : milestoneListUrl
    return (
      <div className="project-version-edit">
        <VersionHeader {...this.props}
        projectTitle={editStr + '里程碑'}
        backFunction={this.backFunction.bind(this)}
        projectStatus={this.props.projectStatus}
        backUrl={backUrl} />
      <ul className="scroll-css js-scroll" style={this.style}>
          <li className="text-label">
            <Field ref="title" data={this.subjectData}
              data_placeholder="最多输入24个字符"/>
          </li>
          <li className="date-label form-date">
            <Field ref="startDate" data={this.startDateData}/>
          </li>
          <li className="date-label">
            <Field ref="endDate" data={this.endDateData} />
          </li>
          <Comment options={this.desDefault} ref="comment"/>
          <li className={'text-label ' + (tasks && tasks.length > 0 ? ' form-date' : '')}>
            <div>
              <label className="control-label">{editStr}文档</label>
              <div className="control-input">
                <div className="input-label">
                  <div className="label-font" onClick={this.gotoAddTaskPage.bind(this)}>点击添加文档</div>
                </div>
                <div className="role-dropdown iconfont-taskAdd" onClick={this.gotoAddTaskPage.bind(this)}>
                </div>
              </div>
            </div>
          </li>
          { (tasks && tasks.length > 0) &&
          <li className="tasks-list">
            <div className="text-border">
              <div className="control-input task-list" ref="taskList">
                <ul>
                  { tasks.map(task =>
                    <li key={task.taskcode}>
                      <span name="taskTitle">{task.title}</span>
                      <a className="iconfont-wendang"></a>
                      <a className="iconfont-remove" onClick={this.deleteItem.bind(this, task.taskcode)}></a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </li> }
          {isEdit && applyHistory.applyList && applyHistory.applyList.length > 0 &&
         <li className="history-list">
            <VersionHistory
             items={applyHistory.applyList}
             projectId={projectVersionDetail.project_id}
             versionId={projectVersionDetail.project_version_id}
            />
          </li>
        }

        </ul>
        <div className="page-confirm">
          <div className="confirm-footer">
            <div className="confirm-center">
              <div className="milestone-tip" ref="milestone-tip">您{editStr}的里程碑将保存到未来里程碑里面</div>
              <div ref="submitBtn" className="btn-primary btn-sure mr0" onClick={this.handleSubmit.bind(this)}>保存</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /** 点击删除文档时需要：
    1、删除state.tasks中的文档项
    2、修改reducer中的tasks数据
  **/
  deleteItem(taskCode, event) {
    let taskMoved
    let tasks = this.state.tasks.filter(function(task){
      if (+task.taskcode !== +taskCode){
        return true
      } else {
        taskMoved = task
      }
    })
    this.setState({
      tasks: tasks
    })
    // 如果是从添加文档列表选择，删除时，从selectTask清空
    if(taskMoved.isChecked){
      this.props.removeVersions(taskMoved)
    }
  }

  /**
   * [gotoAddTaskPage 跳转到添加文档界面]
   * 1.缓存versionDetail
   * 2.isCache ，表示缓存标识
   * @method gotoAddTaskPage
   */
  gotoAddTaskPage() {
    let { projectId, versionId } = this.props
    let {tasks, projectVersionDetail} = this.state
    // 缓存 projectVersionDetail
    projectVersionDetail = {
      'project_id': projectVersionDetail.project_id,
      'project_version_id': projectVersionDetail.project_version_id,
      'isCache': true,
      'version_title': this.refs.title.getValue(),
      'schedule_begin_time': this.refs.startDate.getValue(),
      'schedule_end_time': this.refs.endDate.getValue(),
      'version_intro': this.refs.comment.getValue(),
      'tasks': tasks
    }
    this.props.receiveProjectVersionDetail(projectVersionDetail)
    this.props.clearProjectNoVersionTasks()
    // 缓存移除的文档
    let taskcodes = helpers.makeArray(tasks, 'taskcode')
    let removeTask = this.taskCodesFilter(taskcodes, 'del')
    this.props.restoreRemoveTasks(removeTask)
    if(versionId){
      utils.setStorage('addtasks', `project/${projectId}/milestone/${versionId}/edit`)
    } else{
      utils.setStorage('addtasks', `/addmilestone/${projectId}/status/${this.props.projectStatus}`)
    }
    helpers.goPage('addtasks/' + projectId + '/no_version/status/' + this.props.projectStatus)
  }
  /**
   * [taskCodesFilter 新增删除文档的比较]
   * @method taskCodesFilter
   * @param  {[type]}        taskCodes [description]
   * @param  {[type]}        type      [description]
   * @return {[type]}                  [description]
   */
  taskCodesFilter(taskCodes, type) {
    let {oldTaskCodes} = this.props
    if (type === 'add') {
      return taskCodes.filter(function (code) {
        return oldTaskCodes.tasks.every(function (oldCode) {
          return code !== oldCode.taskcode
        })
      })
    } else {
      return oldTaskCodes.tasks.filter(function (code) {
        return taskCodes.every(function (oldCode) {
          return code.taskcode !== oldCode
        })
      })
    }
  }
  /**
   * [dateValidate 验证字段]
   * @method dateValidate
   * @return {[type]}     [description]
   */
  dateValidate(){
    let startDate = this.refs.startDate.getValue()
    let endDate = this.refs.endDate.getValue()
    if (!this.refs.title.valid()) {
      return false
    }
    if (!startDate){
      window.toast.setTxt('开始时间不能为空')
      return false
    }
    if (!endDate){
      window.toast.setTxt('结束时间不能为空')
      return false
    }
    if (!helpers.checkRegex(startDate, 'date') || !helpers.checkRegex(endDate, 'date')) {
      window.toast.setTxt('请输入正确的日期格式yyyy-MM-dd')
      return false
    }
    startDate = moment(startDate).valueOf()
    endDate = moment(endDate).valueOf() + 24 * 60 * 60 * 1000 - 1000
    if (startDate > endDate) {
      window.toast.setTxt('开始时间不能比结束时间大')
      return false
    }

    return {
      startDate: startDate,
      endDate: endDate
    }
  }
  /**
   * [handleSubmit 点击保存，验证数据的合法性，提交数据]
   * @method handleSubmit
   * @return {[type]}     [description]
   */
  handleSubmit() {
    const submitBtn = this.refs.submitBtn.getDOMNode()
    const that = this
    const { projectId, versionId } = this.props
    const {tasks} = this.state
    let title = this.refs.title.getValue()
    let $comment = this.refs.comment
    let versionIntro = $comment.getValue()
    let dateOption = this.dateValidate()
    if (!dateOption){
      return
    }
    if (!$comment.valid()) {
      return
    }
    let postData = {
      'version_title': title,
      'notify_role': 0,
      'schedule_begin_time': dateOption.startDate,
      'schedule_end_time': dateOption.endDate,
      'project_id': projectId,
      'version_id': versionId,
      'version_intro': versionIntro,
      'del_task_codes': []
    }
    submitBtn.disabled = true
    submitBtn.innerText = '保存中...'
    let taskCodes = helpers.makeArray(tasks, 'taskcode')
    if (versionId) {
      postData['add_task_codes'] = this.taskCodesFilter(taskCodes, 'add')
      let delTaskCodes = this.taskCodesFilter(taskCodes, 'del')
      delTaskCodes.forEach(function (task) {
        postData.del_task_codes.push(task.taskcode)
      })
      this.props.patchProjectVersion(postData, function (data) {
        let hash = '/project/' + projectId + '/version/' + versionId + '/detail/status/1'
        that.conflictHandle(data.binded_task_codes, hash)
      })
    } else {
      postData['add_task_codes'] = taskCodes
      this.props.postProjectVersion(postData, function (data) {
        let hash = 'menu/2/versions/' + projectId
        that.conflictHandle(data.binded_task_codes, hash)
      })
    }
    setTimeout(function () {
      submitBtn.disabled = false
      submitBtn.innerText = '保存'
    }, 500)
    this.props.clearProjectVersionDetail()
    this.props.clearProjectVersionTasks()
    this.props.clearSelectedVersions()
  }

  /**
   * [handleTime 选择时间时，判断结束时间相对于当前时间的关系，更新提示信息]
   * 结束时间>当前时间   '已结束里程碑里面'
   * 结束时间<=当前时间  '未来里程碑里面'
   * 同时，创建和编辑也要区分
   * @method handleTime
   * @return {[type]}   [description]
   */
  handleTime(){
    let {isEdit} = this.state
    let endDate = this.refs.endDate.getValue()
    let nowDate = new Date().getTime()
    let editStr = isEdit ? '编辑' : '创建'
    if (endDate){
      endDate = moment(endDate).valueOf() + 24 * 60 * 60 * 1000 - 1000
      let $tip = this.refs['milestone-tip'].getDOMNode()
      if (endDate < nowDate){
        $tip.innerText = '您' + editStr + '的里程碑将保存到已结束里程碑里面'
      } else{
        $tip.innerText = '您' + editStr + '创建的里程碑将保存到未来里程碑里面'
      }
    }
  }
  /**
   * [backFunction 点击返回时，判断是否放弃当前里程碑的编辑，同时触发回调函数]
   * @method backFunction
   * @param  {Function}   callback [description]
   * @return {[type]}              [description]
   */
  backFunction(callback){
    let {versionId} = this.props
    let subject = this.refs.title.getValue().trim()
    let editStr = versionId ? '编辑' : '创建'
    if(subject){
      window.dialog.setOptions({
        visible: true,
        title: '',
        label: '您是否要放弃' + editStr + '里程碑<div>“' + subject + '”</div>',
        noAction: false,
        actionHandler: function () {
          callback()
        }
      })
    } else{
      callback()
    }
  }
  conflictHandle(bindedCodes, hash){
    const that = this
    let {tasks} = this.state
    if(bindedCodes && bindedCodes.length > 0){
      window.dialog.setOptions({
        visible: true,
        label: '您选的部分文档已被分配！',
        prefixClass: 'noTasks',
        noAction: true,
        confirmLabel: '知道了',
        cancelHandler: function () {
          let curTask = tasks.filter(item => {
            return bindedCodes.every(function (code) {
              return code !== item.taskcode
            })
          })
          that.setState({
            tasks: curTask
          })
        }
      })
    } else {
      helpers.goPage(hash)
    }
  }
}

export default ProjectMilestoneEdit
