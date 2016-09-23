import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
export default class MilePostCard extends Component {
  render () {
    const {milepost} = this.props
    let status = ''
    let statusCss = ''
    if(milepost.audit_status === 1){
      status = '已审核'
      statusCss = 'green'
    } else if(milepost.audit_status === 2){
      status = '审核不通过'
    } else{
      status = '审核中'
      statusCss = 'orange'
    }
    return (
      <div className="roadmap-card">
        <div className="title">
          <div className="title-l mr-10">{ `${milepost.version_num}`  }</div>
          <div className="title-l">{ `${helpers.dateTime(milepost.period_start, 'yyyy/MM/dd')}~${helpers.dateTime(milepost.period_end, 'yyyy/MM/dd')}`}
          </div>
          <div className={'title-r ' + statusCss}>
          {status}
          </div>
        </div>
        <div className="content" dangerouslySetInnerHTML={{__html: milepost.detail_info}}>
        </div>
      </div>
    )
  }

}
