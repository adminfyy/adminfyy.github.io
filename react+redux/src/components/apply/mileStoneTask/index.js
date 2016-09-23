import React, { Component } from 'react'
import * as helpers from '../../../utils/helpers'
import utils from 'utils'
export default class Task extends Component {
  componentDidMount() {
    setTimeout(function() {
      helpers.ScrollResize(
        document.querySelector('.page-confirm') && document.querySelector('.page-confirm').scrollHeight)
    }, 300)
  }
  render() {
    let { task } = this.props
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
        <ul className="task-list-single">
            <li>
              <div className="task-tile" ><span className="iconfont-wendang">{task.title}</span></div>
              <div className={'task-color-' + status}>{statusTxt}</div>
            </li>
        </ul>
      </div>
    )
  }

  taskDetailClick(e) {
    let { task, detail } = this.props
    utils.setStorage('taskDetail', `/project/${detail.project_id}/version/${detail.project_version_id}/apply/${detail.apply_operate_id}/review`)
    utils.setStorage(`taskDetailName`, task.title)
    const url = 'project/' + detail.project_id + '/version/' + detail.project_version_id + '/task/' + task.taskcode + '/status/' + this.props.projectStatus + '/mobile/1'
    helpers.goPage(url)
  }

}
