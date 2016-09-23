import React, { Component } from 'react'
import { consts } from 'constants'
import * as helpers from '../../utils/helpers'

export default
class ProjectMemberItem extends Component {

  componentWillMount() {
    this.setState({
      uid: helpers.getUid()
    })
  }

  render() {
    const {item, canEdit, isShowChat, isShowDuty, notDel} = this.props

    return (
      <div className="member-list" ref="test">

        {item.users.map((user, i) =>
          <div key={user.user_id}>
            <div className="member-item" onClick={this.redirectTo.bind(this, user)}
                 data-name={user.nick_name}
                 data-duty={item.duty}
                 data-uid={user.user_id}
                 data-projectid={user.project_id}>

              <div className="member-info">
                <div className="user" ref="userInfo">
                  <div className="user-wrap">

                    <div className="user-avatar">
                      <img src={helpers.avatar(user.user_id)} onError={helpers.onError.bind(this, consts.DEFAUT_USER)}
                           ref="avatar"/>
                    </div>
                    <div className="usernamefather">
                      <div className="username">

                        <span data-uid={user.user_id}>{`${user.nick_name || user.user_id}(${user.user_id})`}</span>
                        {user.ptype ? '(职级' + user.ptype + ')' : ''} {+user.is_subadmin === 1 &&
                      <span className="team-leader">负责人</span>}
                      </div>
                      {
                        isShowDuty &&
                        isShowDuty === 'yes' &&
                        <div className="member-duty">{item.duty}</div>
                      }

                      <div
                        className={'member-actions' + (isShowChat && isShowChat === 'yes' ? 'addRelative widthEighty' : '') }>

                        {canEdit && !notDel &&
                        <a className="iconfont-del" onClick={this.del.bind(this)}>
                        </a>}

                        {isShowChat &&
                        isShowChat === 'yes' &&
                        <div className="fr">
                          <label className="margin-right">U他</label>
                          <a id="test" className="iconfont-talk"></a>
                          </div>}

                      </div>
                    </div>


                  </div>
                </div>
              </div>

            </div>
          </div>
        ) }


      </div>
    )
  }

  redirectTo(user) {
    // 个人会话
    let url = helpers.imStr(consts.USER, user.user_id, this.state.uid)
    if (typeof Bridge !== 'undefined') {
      helpers.gotoPageLink(url)
    } else if (!helpers.platForm('pc99u')) {
      // 判断如果是从pc版的99u那边的应用盒子过来，给提示；否则跳转
      window.location.href = url
    }
  }

  del(event) {
    const {delMember, setStateFunc} = this.props
    event.stopPropagation()
    let target = event.target
    let delNode = target.parentNode
    while (delNode.className.indexOf('member-item') === -1) {
      delNode = delNode.parentNode
    }
    let projectId = delNode.getAttribute('data-projectId')
    let uid = delNode.getAttribute('data-uid')
    let duty = delNode.getAttribute('data-duty')
    let name = delNode.getAttribute('data-name')
    let delData = {
      uid: uid,
      duty: duty,
      name: name,
      projectId: projectId,
      delMember: delMember,
      delNode: delNode
    }
    setStateFunc(delData)
  }
}
