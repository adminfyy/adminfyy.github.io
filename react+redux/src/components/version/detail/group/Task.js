import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import * as helpers from '../../../../utils/helpers'
import utils from 'utils'
@connect(state => ({ misc: state.misc }), actionCreators)
export default
class Task extends Component {
  componentDidMount() {
    // 减去头部的高度
    setTimeout(function(){
      helpers.ScrollResize(document.querySelector('.buttonArea') && document.querySelector('.buttonArea').scrollHeight)
    }, 300)
  }

  render() {
    let { task, misc, hasAction } = this.props
    let status = +task.task_status
    let statusTxt = ''
    switch (status) {
      case 60:
      case 90:
      case 99:
        status = 'close'
        statusTxt = '已结单'
        break
      case 20:
        status = 'reject'
        statusTxt = '已拒单'
        break
      default:
        status = 'progress'
        statusTxt = '进行中'
    }

    return (
      <div className="task-detail" onClick={this.taskDetailClick.bind(this)}>
        <ul className={misc && misc.isActive ? 'task-list-single noneBack' : 'task-list-single'}>
          <li>
            <div className="task-tile"><span className="iconfont-wendang">{task.title}</span></div>
            { hasAction ? <div className={'status-txt task-color-' + status} onClick={this.onTrash.bind(this)}>移出</div>
              : <div className={'task-color-' + status}>{statusTxt}</div>}
          </li>
        </ul>
      </div>
    )
  }

  showStatus (status){
    switch (status){
      case 0 :
        return '未完成'
      case 20:
        return '拒单'
      case 60:
        return '完成'
      case 90 :
        return '结单'
      case 99:
        return '终止'
      default :
        return '进行中'
    }
  }

  taskDetailClick(e) {
    let { task, detail, hasAction } = this.props
    if (hasAction){
      utils.setStorage('taskDetail', `/versiontasks/${detail.project_id}/${detail.project_version_id}/status/${this.props.projectStatus}`)
    } else {
      utils.setStorage('taskDetail', `/project/${detail.project_id}/version/${detail.project_version_id}/detail/status/${this.props.projectStatus}`)
    }
    utils.setStorage(`taskDetailName`, task.title)
    helpers.goPage('project/' + detail.project_id + '/version/' + detail.project_version_id + '/task/' + task.taskcode + '/status/' + this.props.projectStatus + '/mobile/0')
  }

  onTrash(e){
    const { detail, task, updateVersionTask, delVersionTask } = this.props
    let options = {
      projectId: detail.project_id,
      versionId: detail.project_version_id,
      taskId: task.taskcode,
      vId: 0
    }
    window.dialog.setOptions({
      visible: true,
      title: '',
      label: '此文档将变为未分配的状态，请确认后操作!',
      noAction: false,
      actionHandler: function(){
        updateVersionTask(options, function () {
          delVersionTask(options)
          window.toast.setTxt('操作成功')
        })
      }
    })
    e && e.stopPropagation()
  }
}
