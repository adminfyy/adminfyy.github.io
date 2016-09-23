import React, { Component, PropTypes } from 'react'
import SearchPersonBox from 'components/widget/search/SearchPersonBox'
import UserItem from 'components/member/addmember/UserItem'
import * as helpers from 'utils/helpers'
export default class SearchPerson extends Component {
  constructor(){
    super()
    this.state = {
      users: ''
    }
  }
  componentDidMount() {
    this.props.clearUsers()
    this.forceUpdate()
    let $scroll = this.refs['user-group'].getDOMNode()
    let height = document.documentElement.clientHeight
    let $header = document.querySelector('.project-header')
    $scroll.style.height = (height - getComputedStyle($header).height.slice(0, -2) - 80) + 'px'
    helpers.refresh()
    let $el = this.refs['user-group'].getDOMNode()
    helpers.refreshTouch($el)
  }

  static propTypes = {
    users: PropTypes.object.isRequired
  }

  render() {
    const { users } = this.props
    let hidden = users && users.items.length ? '' : 'hidden '
    return (
      <div className="page page-addmember">
        <SearchPersonBox fetchUsers={this.props.fetchUsers} clearUsers={this.props.clearUsers}/>

        <div className={'user-group ' + hidden + (users && users.items.length ? 'overflow-y' : '')} ref="user-group">
          {users && users.items.map((user, i) =>
              <UserItem key={user.user_id} projectid={this.props.params.id} user={user}
                fetchDuties={this.props.fetchDuties} selectDuty={this.props.selectDuty} />
          )}
        </div>
        {users && !users.init && users.items.length === 0 && <div className="no-result">搜索不到匹配人员，请确认后再搜索</div>}

      </div>
    )
  }
}
