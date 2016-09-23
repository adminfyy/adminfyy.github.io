// AddTasks.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import { createHashHistory } from 'history'
import { is } from 'immutable'
import TaskDialog from 'components/version/widget/selectMileStone/dialog/TaskDialog'
import * as helpers from '../utils/helpers'
@connect(state => ({
  versionTasks: state.versionTasks,
  projectVersionDetail: state.projectVersionDetail,
  projectDetail: state.projectDetail
}), actionCreators)
class AddTasks extends Component {
  componentDidMount() {
    let options = {
      projectId: this.props.params.pid,
      versionId: this.props.params.vid
    }
    this.props.fetchProjectDetail(this.props.params.pid)
    if (options.versionId !== 'no_version') {
      this.props.fetchProjectNoVersionDetail(options)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props === nextProps || is(this.props, nextProps)) ||
    !(this.state === nextState || is(this.state, nextState))
  }

  render(){
    const { versionTasks, projectVersionDetail, projectDetail } = this.props
    let tasks = []
    let addTask = false
    let projectId = this.props.params.pid
    let versionId = this.props.params.vid

    if(versionId !== 'no_version') {
      addTask = true
    }

    if(versionTasks && versionTasks.items){
      tasks = versionTasks.items
    }
    if (helpers.isEmpty(projectDetail)){
      return (
        <div>
          <div className="page-loading"></div>
        </div>
        )
    } else {
      return (
        <div className="task-wrap">
          { addTask
            ? <TaskDialog destroyDialog={this.destroyDialog.bind(this)} addTask={addTask}
                tasks={tasks}
                handleAddTasks={this.handleAddTasks.bind(this)}
                projectId={projectId}
                versionId={versionId}
                projectDetail={projectDetail}/>
            : <TaskDialog destroyDialog={this.destroyDialog.bind(this)}
                tasks={tasks}
                handleAddTasks={this.handleAddTasks.bind(this)}
                projectId={projectId}
                versionId={versionId}
                projectVersionDetail={projectVersionDetail}
                projectDetail={projectDetail}
                {...this.props}/> }
          }
        </div>
      )
    }
  }

  destroyDialog() {
    let history = new createHashHistory()
    history.goBack()
  }

  handleAddTasks(tasks) {
    let versionId = this.props.params.vid
    // let projectId = this.props.params.pid

    if (versionId !== 'no_version'){
      // 如果versionId存在 则表明为文档管理页面添加文档
      this.props.clearProjectVersionTasks()
     /* this.props.fetchProjectVersionTasks({
        projectId: projectId,
        versionId: +versionId,
        $limit: 20,
        $offset: 0
      })*/
    } else{
      // insert to ruducer versionTasks
      this.props.clearProjectVersionTasks()
      this.props.receiveProjectVersionTasks({ items: tasks })
    }
  }
}

export default AddTasks
