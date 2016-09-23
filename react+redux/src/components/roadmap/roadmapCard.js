import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
class RoadmapCard extends Component {
  render () {
    const {roadmap} = this.props
    let status = ''
    let statusCss = ''
    if(roadmap.audit_status === 1){
      status = '已审核'
      statusCss = 'green'
    } else if(roadmap.audit_status === 2){
      status = '审核不通过'
    } else{
      status = '审核中'
      statusCss = 'orange'
    }
    return (
      <div className="roadmap-card">
        <div className="title">
          <div className="title-l">
          {`${helpers.dateTime(roadmap.period_start, 'yyyy/MM/dd')}~${helpers.dateTime(roadmap.period_end, 'yyyy/MM/dd')}`}
          </div>
          <div className={'title-r ' + statusCss}>
          {status}
          </div>
        </div>
        <div className="content" dangerouslySetInnerHTML={{__html: roadmap.detail_info}}>
        </div>
      </div>
    )
  }

}

export default RoadmapCard
