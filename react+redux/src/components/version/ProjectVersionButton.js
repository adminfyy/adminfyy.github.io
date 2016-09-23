import React, {Component} from 'react'
import utils from 'utils'
import * as helpers from 'utils/helpers'

export default class ProjectVersionButton extends Component {
  componentWillUnmount() {
    window.dialog.setOptions({
      visible: false
    })
  }
  deleteVersion() {
    const pid = this.props.params.pid
    const vid = this.props.params.vid

    this.props.deleteProjectVersion({
      'project_id': pid,
      'version_id': vid
    }, function(data) {
      window.toast.setTxt('删除成功')
      helpers.goPage(`/menu/2/versions/${pid}`)
    })
  }

    deleteAction() {
      const { versionDetail } = this.props

      window.dialog.setOptions({
        isShow: true,
        label: `你是否要删除里程碑“${versionDetail.version_title}”`,
        visible: true,
        actionHandler: this.deleteVersion.bind(this)
      })
    }
    editAction(){
      const { projectVersionDetail } = this.props
      let versionId = projectVersionDetail.project_version_id
      let projectId = projectVersionDetail.project_id
      this.props.clearProjectVersionDetail()
      this.props.clearSelectedVersions()
      utils.setStorage('step', '2')
      helpers.replacePage(`project/${projectId}/milestone/${versionId}/edit/0`)
    }

    render(){
      return (
        <div className = {`buttonArea` }>
        <div className = "btn edit" onClick={this.editAction.bind(this)} > 编辑 </div>
        <div className = "btn delete" onClick={this.deleteAction.bind(this)}>删除 </div >
        </div>
        )
    }
}
