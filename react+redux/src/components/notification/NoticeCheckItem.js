import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import {consts} from 'constants'

export default class NoticeCheckItem extends Component {
  componentWillMount() {
    this.setState({
      uid: helpers.getUid()
    })
  }
  render() {
    const {carddata} = this.props
    // 确认者user_id
    let uid = carddata.receive_uid
    // 是否确认：0 否，1 是
    let isChecked = carddata.is_checked
     // 确认时间
    let checkedTime = carddata.checked_time
    checkedTime = helpers.dateTime(checkedTime).format('yyyy/MM/dd hh:mm')
    let name = carddata.user
      ? `${carddata.user.nick_name}`
      : `${uid}`
    let description = carddata.user ? `(${carddata.user.user_id})` : '(账号异常)'
    return (
      <div className="check-item" onClick={this.handleClick.bind(this)}>
        <div className="first-div">
          <div className="main">
            <div className="avatar">
              <img src={helpers.avatar(uid)}
                   onError={helpers.onError.bind(this, consts.DEFAUT_USER)} ref="avatar"/>
            </div>
            <div className="user-info">
              <p>{name}</p>
              <p>{description}</p>
            </div>

            <div className={isChecked ? 'check-info' : 'check-info text-approving'}>
              {isChecked ? checkedTime : '未确认'}
            </div>
          </div>
        </div>

        <div className={isChecked ? 'iconfont-circle' : 'iconfont-circle iconfont-approving'}></div>
      </div>
    )
  }

  handleClick() {
    const {carddata} = this.props

    if (+carddata.receive_uid === this.state.uid) {
      return
    }

    let url = helpers.imStr(consts.USER, carddata.receive_uid, this.state.uid)

    if (typeof Bridge !== 'undefined') {
      helpers.gotoPageLink(url)
    } else if (!helpers.platForm('pc99u')) {
      // 判断如果是从pc版的99u那边的应用盒子过来，给提示；否则跳转
      window.location.href = url
    }
  }
}
