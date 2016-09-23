import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
export default class extends Component {

  render() {
    const {items} = this.props
    return (
      <div className="task-detail version-history">
        <div className="doc-manage">
          <div className="task-header-bar">
            <span className="title">历史确认记录</span>
          </div>
        </div>
        <ul className="history-items">
        {
          items.map(
             item =>
             <li className="history-item" onClick={this.goPage.bind(this, item)}>{helpers.dateTime(item.application_time).format('yyyy/MM/dd hh:mm')}</li>
          )
        }
        </ul>
      </div>
    )
  }

  goPage(item){
    const {projectId, versionId} = this.props
    helpers.goPage(`project/${projectId}/version/${versionId}/applyHistory/${item.apply_operate_id}`)
  }
}
