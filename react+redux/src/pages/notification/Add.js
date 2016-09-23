import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import NoticeAdd from 'components/notification/Add'
import * as helpers from 'utils/helpers'
@connect(state => ({
  selectResult: state.selectResult,
  sentTime: state.sentTime
}), actionCreators)
export default class Add extends Component {
  componentDidMount() {
    helpers.refresh()
  }
  render() {
    const { pid } = this.props.params
    return (
      <div className="milestone-edit js-virKeybord">
        <NoticeAdd projectId={pid} {...this.props}/>
      </div>)
  }
}
