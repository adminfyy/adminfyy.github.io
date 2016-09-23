import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from 'actions'
import * as helpers from 'utils/helpers'
import {consts} from 'constants'
import DetailHeader from 'components/widget/header/version'

@connect(state => ({applyHistory: state.applyHistory, projectVersionDetail: state.projectVersionDetail}), actionCreators)
export default class VersionValidPage extends Component {
  constructor(props){
    super()
    this.state = {
      operateId: props.applyHistory.operateId || props.params.operateId
    }
  }
  componentWillMount () {
    this.setState({uid: helpers.getUid()})
  }
  componentDidMount () {
    let projectId = this.props.params.pid
    let versionId = this.props.params.vid
    let options = {
      projectId: projectId,
      versionId: versionId
    }
    this.props.fetchApplyHistory(options)
    this.props.fetchProjectNoVersionDetail({projectId: projectId, versionId: versionId})
    helpers.refresh()
  }
  componentDidUpdate(){
    const {operateId} = this.state
    let progressDom = this.refs['progress' + operateId]
    if(progressDom){
      let top = progressDom.getDOMNode().offsetTop
      let $content = this.refs['milestone-content'].getDOMNode()
      $content.style.height = (document.body.clientHeight - 85) + 'px'
      $content.scrollTop = top - 15
    }
    let $el = document.querySelector('.version-valid')
    helpers.refreshTouch($el)
  }
  createDuty (applyList, keyVal) {
    // 1:拒绝，2：同意，4：待确认
    if (!applyList[keyVal]) {
      return null
    }
    let status = applyList[keyVal] && +applyList[keyVal].status
    return (<dt className= { status === 1 ? 'icon-right' : (status === 2 ? 'icon-reject' : (status === 4 ? 'icon-approving' : '')) }>
      <i></i>
      <span className="member-duty">
        {keyVal}
      </span>
      <span className="member-duty-status">
        {applyList[keyVal].statusTxt}
      </span>
    </dt>)
  }

  createProgressItem (applyList, keyVal) {
    let arr = []
    let title = this.createDuty(applyList, keyVal)
    let items = (applyList[keyVal].isApply
      ? applyList[keyVal].applyData
      : applyList[keyVal].items).map((applyItem, i) => <dd>
        <div className="progress-item">
          <div className="main">
            <span className="cut"></span>
            <div className="avatar">
              <img src= {helpers.avatar(applyItem.reviewer_uid)} onError= {helpers.onError.bind(this, consts.DEFAUT_USER)} ref="avatar"/>
            </div>
            <div className="user-info">
              <p>
                {applyItem.user && applyItem.user.nick_name || ''}
                <span>
                  {applyItem.status === 3 && `(${applyItem.statusTxt})`}
                </span>
              </p>
            </div>
            <div className="contact">
              {(applyItem.user && +applyItem.user.user_id !== +this.state.uid && applyItem.status !== 3) && <a href={helpers.imStr(consts.USER, applyItem.user.user_id, this.state.uid)}>
                U他
              </a>}
            </div>
          </div>
          {(applyItem.application_comment !== null) && <p className="content">
            {applyItem.application_comment}
          </p>
          }
        </div>
      </dd>)
    arr.push(title)
    arr.push(items)
    return arr
  }
  createLeaders(applyList){
    const leaders = [ '项目', '开发', '商务/运营', '策划', '项管' ]
    let alist = Object.keys(applyList).map(item => {
      return item
    })
    let disLeaders
    disLeaders = leaders.filter(item => {
      return alist && alist.length && alist.every(aitem => {
        return aitem.indexOf(item) < 0
      })
    })
    return disLeaders.length > 0 && <dt className="tips">该项目缺少
        {disLeaders.map((disItem) => <span className="leader">
          {disItem}
          负责人
          <span className="ther">
            {disItem !== disLeaders[disLeaders.length - 1]
              ? ' 和 '
              : ''}
            </span></span>)}，已自动确认。
        </dt>
  }
  render () {
    const {applyHistory, projectVersionDetail} = this.props
    let operateId = applyHistory.operateId || this.props.params.operateId
    if (!applyHistory || !applyHistory.applyList || !projectVersionDetail) {
      return (
        <div>
          <div className="page-loading"></div>
        </div>
      )
    } else {
      return (
        <div className="milestone-history">
          <DetailHeader {...this.props}
            projectTitle= {'确认历史记录'}
            projectInfo= {projectVersionDetail}/>
          <div className="milestone-content" ref="milestone-content">
          {!helpers.isEmpty(applyHistory.applyList) && applyHistory.applyList.map(applyItem =>
            <div className="version-progress" ref={'progress' + +applyItem.apply_operate_id}>
              <div className={'apply-history-icon ' + (+applyItem.apply_operate_id === +operateId
                ? 'iconfont-arrow-circle-up'
                : 'iconfont-arrow-circle-down')}
                onClick={this.handlerClick.bind(this, applyItem.apply_operate_id)} ref={'js-circle' + applyItem.apply_operate_id}>
                <span>提交时间：{helpers.dateTime(applyItem.application_time).format('yyyy/MM/dd hh:mm')}
                </span>
              </div>
            {(+applyItem.apply_operate_id === +operateId
              ? <dl ref={'js-operate' + operateId}>
                {Object.keys(applyItem.result).map((keyVal) => {
                  return this.createProgressItem(applyItem.result, keyVal)
                })
                }
                {this.createLeaders(applyItem.result)}
                </dl>
              : '')}
            </div>
            )}
            </div>
        </div>
      )
    }
  }
  handlerClick (operateId, e) {
    this.setState({
      operateId: operateId
    })
    if(+this.state.operateId !== +operateId){
      this.props.updateApplyHistory(operateId)
    } else{
      const $operate = this.refs['js-operate' + operateId].getDOMNode().classList
      const $circle = this.refs['js-circle' + operateId].getDOMNode().classList
      $operate.toggle('hidden')
      $circle.toggle('iconfont-arrow-circle-down')
      $circle.toggle('iconfont-arrow-circle-up')
    }
  }
}
