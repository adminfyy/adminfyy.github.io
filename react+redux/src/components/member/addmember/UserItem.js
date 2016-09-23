import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import RoleDialog from 'components/widget/dialog/RoleDialog'

class UserItem extends Component {
  componentDidMount () {
    let $userItem = this.refs.userItem.getDOMNode()
    let $scrollPanel = document.querySelector('.user-group')
    helpers.scrollLoading($scrollPanel, $userItem)
    $scrollPanel.addEventListener('scroll', function () {
      helpers.scrollLoading($scrollPanel, $userItem)
    })
  }
  componentWillUnmount () {
    let $userItem = this.refs.userItem.getDOMNode()
    let $scrollPanel = document.querySelector('.user-group')
    $scrollPanel.removeEventListener('scroll', function () {
      helpers.scrollLoading($scrollPanel, $userItem)
    })
  }
  render () {
    const {user} = this.props
    const imgSrc = helpers.avatar(user['user_id'])
    const dutyPannel = this.state && this.state.dutyPannel
    return (
		<div className="userItemFather" ref="userItem">
			<div className="useritem">
				<div className="useritem_img">
					<div className="s-image js-scroll-load" data-url={imgSrc} ref="scrollLoad"></div>
				</div>
				<div className="useritem_span">
					<span>{user['nick_name'] ? user['nick_name'] : '佚名'}</span>
				</div>
				<div>
					<a onClick={this.showPannel.bind(this)}>添加</a>
				</div>
			</div>
			{dutyPannel && <RoleDialog projectId={this.props.projectid}
      uid={this.props.user.user_id} setDutyPannel={this.setDutyPannel.bind(this)}
      setSuccessFlag={this.setSuccessFlag.bind(this)} destoryDialog={this.hidePanner.bind(this)}/>
			}
      {this.state && this.state.success && <div className="success-tip">添加成功</div>}
		</div>
    )
  }

  showPannel () {
    let that = this
    that.setState({
      dutyPannel: true
    })
    that.forceUpdate()
    this.props.fetchDuties(null)
  }

  hidePanner () {
    this.setState({
      dutyPannel: false
    })
    this.forceUpdate()
  }

  setDutyPannel () {
    this.setState({
      dutyPannel: false
    })
  }

  setSuccessFlag () {
    let that = this
    this.setState({
      success: true
    })
    setTimeout(function () {
      that.setState({
        success: false
      })
    }, 1000)
  }

}

export default UserItem
