import React, { Component } from 'react'
import utils from 'utils'

export default
class TaskDetail extends Component{
  constructor() {
    super()
    this.state = {
      fetchedDetail: false,
      isConfirm: false,
      title: null,
      label: null,
      noAction: false,
      actionHandler: null
    }
  }

  render () {
    let {task} = this.props
    let taskName = utils.getStorage('taskDetailName')
    if (!task){
      return (
        <div className="page-loading"></div>
      )
    }
    return (
      <div className="task-detail-info">
        <div className="center">
                <span className="iconfont-wendang-static version-title-icon">{ taskName || '未找到文档名称数据'}</span>
        </div>
        <div className="content-wrap">
          <div className="no-support"></div>
        </div>
        <p className="content">移动端暂不支持</p>
        <p className="content">在线查看“策划文档系统”中的文档！</p>
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

  onTrash(e){
    const { projectId, versionId, taskId, updateVersionTask } = this.props
    let options = {
      projectId: projectId,
      versionId: versionId,
      taskId: taskId,
      vId: 0
    }
    this.setState({
      isConfirm: true,
      title: '',
      label: '此文档将变为未分配的状态，请确认后操作!',
      noAction: false,
      actionHandler: function(){
        updateVersionTask(options, function () {
          window.toast.setTxt('操作成功')
          window.history.back()
        })
      }
    })
    e && e.stopPropagation()
  }

  destoryDialog(e) {
    this.setState({
      isConfirm: false
    })
  }

}


// <MilestoneBtn {...task} project_id={projectId} />
