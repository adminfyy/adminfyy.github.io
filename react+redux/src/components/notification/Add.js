import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import Field from 'components/fields/Field'
import VersionHeader from 'components/widget/header/version'
import Comment from 'components/widget/textarea'
import moment from 'moment'
import * as utils from 'utils'
class noticeAdd extends Component {
  constructor(props) {
    super()
    this.style = {
      width: 'auto'
    }
    this.receiveUids = {
      className: 'notify-receiver',
      'value_type': 3,
      required: true,
      'field_name': '接收人',
      iconClass: 'iconfont-select',
      inputCustomCss: 'receiver-input',
      selectFunction: this.selectPerson.bind(this)
    }
    this.remindType = {
      id: 'start-date',
      className: 'date-border',
      'value_type': 3,
      'field_name': '提醒方式',
      value: '99U'
    }
    this.sentTimeType = {
      id: 'end-date',
      className: 'end-date',
      'value_type': 3,
      'field_name': '发送时间',
      iconClass: 'iconfont-select',
      value: '立即发送',
      selectFunction: this.selectTime.bind(this)
    }
    this.desDefault = {
      title: '文字内容',
      total: 200,
      required: true,
      placeholder: '请输入说明',
      textareaCss: 'versionDes',
      inputHeight: 436 - 200
    }
    this.isEnterSelectPerson = 0
  }
  componentWillUnmount(){
    if(this.isEnterSelectPerson === 0){
      this.initConfig()
      this.props.updateSentTime(0, '')
    }
  }
  render() {
    const {selectResult, sentTime, projectId} = this.props
    let receiveNamesArr = []
    selectResult && selectResult.selectedConfirmItems && selectResult.selectedConfirmItems.forEach((item, i) => {
      if(i < 4){
        receiveNamesArr.push(item.label || item.id)
      }
    })
    let receiveNames = receiveNamesArr.join(',')
    let receiveLength = selectResult.selectedConfirmItems.length
    if(receiveLength > 4){
      receiveNames += '...  (' + receiveLength + ')'
    }
    this.receiveUids.value = receiveNames
    this.desDefault.value = selectResult.comment || ''
    if(+sentTime.sentTimeType === 1){
      this.sentTimeType.value = sentTime.sentTime
    }
    return (
      <div className="project-version-edit notify-add">
        <VersionHeader {...this.props}
        projectTitle={'通知提醒'}
        backUrl={`/project/${projectId}/notificationList`}
        backFunction={this.backFunction.bind(this)}/>
        <ul className="scroll-css" style={this.style}>
          <li className="text-label">
            <Field ref="receiveUids" data={this.receiveUids}
              data_placeholder="点击添加联系人" display="true"/>
          </li>
          <li className="date-label form-date">
            <Field ref="remindType" data={this.remindType} display="true"/>
          </li>
          <li className="date-label">
            <Field ref="sentTimeType" data={this.sentTimeType} display="true"/>
          </li>
          <Comment options={this.desDefault} ref="comment"/>
        </ul>
        <div className="page-confirm">
          <div className="confirm-footer">
            <div className="confirm-center">
              <div ref="submitBtn" className="btn-primary btn-sure mr0" onClick={this.handleSubmit.bind(this)}>保存</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /**
   * [handleSubmit 点击保存，验证数据的合法性，提交数据]
   * @method handleSubmit
   * @return {[type]}     [description]
   */
  handleSubmit() {
    const that = this
    const {selectResult, sentTime, projectId} = this.props
    let receiveUids = selectResult && selectResult.selectedItems && selectResult.selectedItems.map(item => {
      return item.id
    })
    const submitBtn = this.refs.submitBtn.getDOMNode()
    let $receiveUids = this.refs.receiveUids
    let $comment = this.refs.comment
    let notificationContent = $comment.getValue()
    if (!$receiveUids.valid()) {
      return
    }
    if (!$comment.valid()) {
      return
    }
    let postData = {
      'receive_uids': receiveUids,
      'remind_type': 1,
      'sent_time_type': sentTime.sentTimeType || 0,
      'notification_content': notificationContent,
      'project_id': this.props.params.pid
    }
    let tip = '发送成功'
    if(+sentTime.sentTimeType === 1){
      tip = '保存成功，将在指定时间为您发送'
      let sentTimeStr = moment(sentTime.sentTime + ':00').valueOf()
      let curDate = +new Date()
      if(sentTimeStr - curDate < 300000){
        window.toast.setTxt('指定发送时间要大于当前时间5分钟')
        return
      }
      postData['sent_time'] = sentTimeStr
    }
    submitBtn.disabled = true
    submitBtn.innerText = '保存中...'
    this.props.postNotice(postData, function(data){
      if(data.code){
        that.initConfig()
      } else{
        window.toast.setTxt(tip)
        that.props.updateSentTime(0, '')
        helpers.goPage('/project/' + projectId + '/notificationList')
      }
    })
    setTimeout(function () {
      submitBtn.disabled = false
      submitBtn.innerText = '保存'
    }, 500)
  }

  /**
   * [backFunction 点击返回时，判断是否放弃创建通知提醒，同时触发回调函数]
   * @method backFunction
   * @param  {Function}   callback [description]
   * @return {[type]}              [description]
   */
  backFunction(callback){
    let receiveUids = this.refs.receiveUids.getValue().trim()
    let comment = this.refs.comment.getValue().trim()
    if(receiveUids || comment){
      window.dialog.setOptions({
        visible: true,
        title: '',
        label: '是否放弃创建？',
        noAction: false,
        actionHandler: function () {
          callback()
        }
      })
    } else{
      callback()
    }
  }
  initConfig(){
    this.props.unitSelectOptions({
      isRequest: true,
      isCache: false,
      isCompenent: true,
      title: '选择联系人',
      subTitle: '项目成员',
      selectedName: '人',
      data: [],
      selectedItems: [],
      selectedConfirmItems: [],
      comment: ''
    })
  }
  /**
   * [selectPerson 跳转到添加联系人界面]
   * @method selectPerson
   * @return {[type]}     [description]
   */
  selectPerson(){
    const that = this
    const { projectId, selectResult } = this.props
    const uid = helpers.getUid()
    this.isEnterSelectPerson = 1
    this.props.fetchProjectMembers(projectId, uid, function(data){
      data.items.forEach(item => {
        let flag = true
        data.users.items.forEach(user => {
          if (user.user_id + '' === item.user_id + '') {
            item.id = user.user_id
            item.label = user.nick_name
            item.pinyin = user.nick_name_short
            item.image = helpers.avatar(user.user_id)
            item.subLabel = user.nick_name + '（' + user.user_id + '）'
            flag = false
          }
        })
        // 项目成员不在UC的情况
        if(flag){
          item.id = item.user_id
          item.label = ''
          item.pinyin = ''
          item.image = helpers.avatar(item.user_id)
          item.subLabel = '' + '（' + item.user_id + '）'
        }
      })
      let selectedItems
      selectedItems = selectResult.selectedConfirmItems
      let selectedConfirmItems
      selectedConfirmItems = selectResult.selectedConfirmItems
      const selectData = {
        isRequest: true,
        isCache: false,
        isClickCheck: true,
        title: '选择联系人',
        subTitle: '项目成员',
        selectedName: '人',
        total: data.total,
        data: data.items,
        tip: 'sorrry，没有找到你想要的成员',
        selectedItems: selectedItems,
        selectedConfirmItems: selectedConfirmItems,
        comment: that.refs.comment.getValue()
      }
      that.props.receiveSelectOptions(selectData)
      utils.setStorage('w_select', JSON.stringify(selectData))
      helpers.goPage('project/' + projectId + '/widget/select')
    })
  }
  selectTime(){
    const { projectId, selectResult } = this.props
    this.isEnterSelectPerson = 1
    selectResult.comment = this.refs.comment.getValue()
    this.props.receiveSelectOptions(selectResult)
    helpers.goPage('notice/' + projectId + '/time')
  }
}

export default noticeAdd
