import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import Comment from 'components/widget/textarea'

export default class MileStoneReviewDescription extends Component {

  render() {
    const {versionDetail} = this.props
    let desDefault = {
      value: versionDetail.version_intro || '暂无里程碑描述',
      isNumShow: false,
      textareaCss: 'versionDes',
      isDisabled: true
    }
    return (
      <div className="version-detail">
        <ul>
          <li>
            <div className=" fl title">里程碑名</div>
            <div className=" fl content">{versionDetail.version_title}</div>
          </li>
          <li>
            <div className="fl title">里程碑周期</div>
            <div className="fl content">
              {`${helpers.dateTime(versionDetail.schedule_begin_time, 'yyyy/MM/dd')} - ${helpers.dateTime(versionDetail.schedule_end_time, 'yyyy/MM/dd')}`}
            </div>
          </li>
          <li className="intro">
            <div className="fl title">里程碑描述</div>
          </li>
          <Comment options={desDefault} ref="comment"/>
        </ul>
      </div>
    )
  }
}
