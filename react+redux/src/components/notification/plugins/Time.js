import React, { Component } from 'react'
import VersionHeader from 'components/widget/header/version'
import moment from 'moment'
import * as helpers from 'utils/helpers'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import MobileDetect from 'mobile-detect'
@connect(state => ({
  sentTime: state.sentTime
}), actionCreators)
class noticeAdd extends Component {
  constructor(props) {
    super()
    let sendType = 0
    let curTime = moment().add(10, 'm')
    let sentTime = curTime.format('YYYY-MM-DDTHH:mm')
    let md = new MobileDetect(window.navigator.userAgent)
    this.mobileVersion = ''
    if(md.os() === 'AndroidOS'){
      this.mobileVersion = parseFloat(md.version('Android'))
      if(this.mobileVersion < 4.4){
        sentTime = curTime.format('YYYY-MM-DD HH:mm')
      }
    }
    if(+props.sentTime.sentTimeType === 1){
      sendType = 1
      sentTime = props.sentTime.sentTime.replace(' ', 'T')
      if(this.mobileVersion && this.mobileVersion < 4.4){
        sentTime = props.sentTime.sentTime
      }
    }
    this.state = {
      sendType: sendType,
      sentTime: sentTime
    }
  }
  render() {
    const {sendType, sentTime} = this.state
    let selected = 'iconfont-milestone'
    return (
      <div className="milestone-edit notify-time">
        <VersionHeader {...this.props}
        projectTitle={'发送时间'}/>
      <div className="notify-time-content">
        <label className={'select-time ' + (+sendType === 0 ? selected : '') } onClick={this.handleTimeClick.bind(this, 0)}>立即发送</label>
        <label htmlFor="date" className={'select-time ' + (+sendType === 1 ? selected : '') }
          onClick={this.handleTimeClick.bind(this, 1)}>
          在指定时间发送
          <input id="date" required="required" type="datetime-local" className="datetime" key={sentTime + new Date()}
            defaultValue={sentTime} ref="date" onChange={this.handleChange.bind(this)}/>
        </label>
        {this.mobileVersion && this.mobileVersion < 4.4 &&
          <div className="select-time tip">日期格式：2016-03-18 18:55</div>
        }
        <div className="page-confirm">
          <div className="confirm-footer">
            <div className="confirm-center">
              <div ref="submitBtn" className="btn-primary btn-sure mr0" onClick={this.handleSubmit.bind(this)}>确定</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
  handleTimeClick(sendType){
    let type = this.state.sendType
    if(type !== sendType){
      this.setState({
        sendType: sendType
      })
    }
  }
  handleChange(e){
    let $date = this.refs.date.getDOMNode()
    if(!$date.value){
      this.setState({
        sentTime: moment().add(10, 'm').format('YYYY-MM-DDTHH:mm')
      })
    }
  }
  handleSubmit(){
    if(+this.state.sendType === 1){
      let date = this.refs.date.getDOMNode()
      let dateValue = date.value
      if(!dateValue){
        window.toast.setTxt('指定时间不能为空')
        return
      }
      if(this.mobileVersion && this.mobileVersion < 4.4 && !helpers.checkRegex(dateValue, 'datetime')){
        window.toast.setTxt('时间格式不正确')
        return
      }
      let sentTime = dateValue.replace('T', ' ')
      this.props.updateSentTime(this.state.sendType, sentTime)
    } else{
      this.props.updateSentTime(this.state.sendType, '')
    }
    helpers.goPage('/notice/' + this.props.params.pid + '/add')
  }
}

export default noticeAdd
