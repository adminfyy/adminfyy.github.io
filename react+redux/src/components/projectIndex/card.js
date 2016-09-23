import React, {Component} from 'react'
import * as helpers from 'utils/helpers'
import * as consts from 'constants/const'
export default class card extends Component{
  render(){
    const {data, type} = this.props
    let period = `${helpers.dateTime(data.period_start, 'YYYY/MM/DD')}~${helpers.dateTime(data.period_end, 'YYYY/MM/DD')}`
    return (
      <div className="card-roadmap-version">
        <div className="period-and-status">
          <div className="period">
            <div className="content">{`${type === 'mile-stone' ? data.version_num + ' ' : ''}${period}`}</div>
          </div>
          <div className={`status status-${data.audit_status}`}>{consts.AUDIT_STATUS[data.audit_status]}</div>
        </div>
        <div className ="detail" onClick={this.goHistoryPage.bind(this)}>
          <div className="detail-content" dangerouslySetInnerHTML={{ __html: data.detail_info }}/>
        </div>
      </div>
    )
  }
  goHistoryPage(){
    const {href} = this.props
    helpers.goPage(href)
  }
}
