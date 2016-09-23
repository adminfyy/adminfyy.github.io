import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from 'actions'
import * as helpers from 'utils/helpers'
import {consts} from 'constants'
import DetailHeader from 'components/widget/header/version'

@connect(state => ({applyHistory: state.applyHistory, projectDetail: state.projectDetail, projectVersionDetail: state.projectVersionDetail}), actionCreators)
export default class VersionValidPage extends Component {
  componentWillMount () {
    this.setState({uid: helpers.getUid()})
  }

  componentDidMount () {
    let projectId = this.props.params.pid
    let versionId = this.props.params.vid
    let applyId = this.props.params.aid

    let options = {
      projectId: projectId,
      versionId: versionId,
      applyId: applyId
    }
    this.props.fetchApplyList(options)
    this.props.fetchProjectNoVersionDetail({projectId: projectId, versionId: versionId})
    helpers.refresh()
  }
  componentDidUpdate () {
    let $el = document.querySelector('.version-valid')
    helpers.refreshTouch($el)
  }
  createDuty (applyList, keyVal) {
    // 1:拒绝，2：同意，4：待确认
    if (!applyList[keyVal]) {
      return null
    }
    let status = applyList[keyVal] && +applyList[keyVal].status
    return (<dt className= { status === 1
    ? 'icon-right'
    : (status === 2 ? 'icon-reject' : (status === 4 ? 'icon-approving' : '')) }>
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
    // 职位变更，当前用户都不显示U他
    let arr = []
    let title = this.createDuty(applyList, keyVal)
    let items = (applyList[keyVal].isApply
      ? applyList[keyVal].applyData
      : applyList[keyVal].items).map((applyItem, i) => <dd>
        <div className="progress-item">
          <div className="main">
            <span className="cut"></span>
            <div className="avatar">
              <img ref="avatar" src={helpers.avatar(applyItem.reviewer_uid)} onError={helpers.onError.bind(this, consts.DEFAUT_USER)}/>
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
          {(applyItem.application_comment !== null) && <p className="content">{applyItem.application_comment}</p>}
        </div>
      </dd>)
    arr.push(title)
    arr.push(items)
    return arr
  }

  render () {
    const {applyHistory, projectVersionDetail} = this.props
    const leaders = [ '项目', '开发', '商务/运营', '策划', '项管' ]
    let alist = !helpers.isEmpty(applyHistory.applyList) && Object.keys(applyHistory.applyList[0].result).map(item => {
      return item
    })
    let disLeaders
    disLeaders = leaders.filter(item => {
      return alist && alist.length && alist.every(aitem => {
        return aitem.indexOf(item) < 0
      })
    })
    if (helpers.isEmpty(applyHistory.applyList) || !projectVersionDetail) {
      projectVersionDetail.name = projectVersionDetail['project_name']
      return (
        <div>
          <div className="page-loading"></div>
        </div>
      )
    } else {
      return (
        <div className="version-valid">
          <DetailHeader {...this.props} projectTitle= {'进度查询'} projectInfo= {projectVersionDetail}/>
          <div className="milestone-content">
          {!helpers.isEmpty(applyHistory.applyList) && applyHistory.applyList.map((applyItem, i) => <div className="version-progress" key={'applyItem' + i}>
            <h1>
              <span className="version-name">{projectVersionDetail.version_title}</span>
            </h1>
            <dl>
              {Object.keys(applyItem.result).map((keyVal) => {
                return this.createProgressItem(applyItem.result, keyVal)
              })}
            </dl>
          </div>)}
        </div>
          {disLeaders.length > 0 && <p className="tips">该项目缺少
            {disLeaders.map((disItem) => <span className="leader">
              {disItem}
              负责人
              <span className="ther">
                {disItem !== disLeaders[disLeaders.length - 1]
                  ? ' 和 '
                  : ''}
                </span></span>)}，已自动确认。
          </p>
}
        </div>
      )
    }
  }
}
