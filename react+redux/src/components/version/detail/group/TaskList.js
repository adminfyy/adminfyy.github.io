import React, { Component } from 'react'
import { connect } from 'react-redux'
import { consts } from 'constants'
import Task from 'components/version/detail/group/Task'
import * as actionCreators from 'actions'
import SearchTask from 'components/version/widget/selectMileStone/search/SearchTask'
import utils from 'utils'
import * as helpers from 'utils/helpers'

@connect(state => ({
  versionTasks: state.versionTasks
}), actionCreators)
export default class TaskList extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    // 请求项目的版本详细页
    this.props.clearProjectVersionTasks()
    this.getVersionTasks()
  }

  getVersionTasks(){
    const { detail, fetchProjectVersionTasks, fetchProjectNoVersionTasks } = this.props
    let projectId = detail.project_id
    let versionId = detail.project_version_id
    let options = {
      projectId: projectId,
      versionId: +versionId ? versionId : 'no_version',
      $limit: 40,
      $offset: 0
    }

    if (+versionId) {
      fetchProjectVersionTasks(options)
    } else {
      fetchProjectNoVersionTasks(options)
    }
  }
  // <div className="no-doc">
  //  <div className="txt-center">暂无已添加的文档</div>
  // </div>
  render() {
    let { detail, versionTasks, addTask } = this.props

    let versionType = 'version'
    let versionId = this.props.detail.project_version_id
    let projectId = this.props.detail.project_id
    return (
        <div className="doc-manage">
        { addTask && <SearchTask {...this.props} key="version_task_search"
                  version_id={versionId} projectId={projectId}
                  versionType={versionType} ref="searchCmp"/> }
          { !addTask && <div className="task-header-bar">
            <span className="title">文档列表{ versionTasks.empty && <span>(暂无文档)</span>}</span>
          </div> }

          <div className={`version-detail-content ${versionTasks.empty ? 'hidden' : ''}`}>
          { addTask &&
            <div className="sub-title">
              <div className="add-task-action">已添加文档列表</div>
              {<div className="task-actions">
                <div className="role-dropdown" onClick={this.gotoAddTaskPage.bind(this)}>
                  添加文档
                </div>
              </div> }
            </div>}
          { versionTasks && versionTasks.items
            ? <div>
                {versionTasks.items.map((item, i) =>
                <div className="task-group" key={item.taskcode + item.topiccode + i}>
                  <Task task={item} detail={detail}
                    hasAction={addTask}
                    projectStatus={this.props.projectStatus} />
                </div>)}
            </div>
            : <div className="page-loading"></div>
          }
          </div>
        </div>
      )
  }

  gotoAddTaskPage() {
    let { detail } = this.props
    let versionId = detail.project_version_id
    let projectId = detail.project_id
    let projectStatus = detail.projectStatus

    this.props.clearProjectNoVersionTasks()
    utils.setStorage('addtasks', `/versiontasks/${projectId}/${versionId}/status/${projectStatus}`)
    helpers.goPage('addtasks/' + projectId + '/' + versionId + '/status/' + projectStatus)
  }

  handleAddTasks(tasks) {
    // 更新预期结束时间：文档最大结束时间后3天
    // let endDate = helpers.getMaxEndDate(tasks, 'end_date')
    // this.endDateData.value = endDate + 3 * 86400 * 1000
    // console.log('tasks=', tasks)
    // this.setState({
    //   tasks: tasks
    // })
    this.props.clearProjectVersionTasks()
    this.getVersionTasks()
  }

  onUpload() {
    const { detail, versionTasks, fetchProjectVersionTasks, updateQueryInfo } = this.props
    let page = versionTasks.page
    let nextInfo = {
      $offset: page * consts.PAGE_SIZE,
      $limit: consts.PAGE_SIZE,
      projectId: detail.project_id,
      versionId: detail.project_version_id
    }
    let $loading = document.querySelector('.js-scroll-loading')
    if ($loading.classList.contains('data-short')) return
    $loading.classList.remove('data-more')
    $loading.classList.add('data-loading')
    setTimeout(function () {
      fetchProjectVersionTasks(nextInfo, function (data) {
        let list = data && data.items
        let len = list.length
        $loading.classList.remove('data-loading')
        if (!len) {
          $loading.classList.add('data-short')
        }
      })
    }, 500)
    updateQueryInfo(nextInfo)
  }
}
