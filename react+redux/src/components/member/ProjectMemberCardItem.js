import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import ProjectMemberItem from 'components/member/ProjectMemberItem'

import Field from 'components/fields/Field'

@connect(state => ({}), actionCreators)
export default
class ProjectMemberCardItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      expend: props.expend,
      isAdmin: props.isAdmin
    }
  }

  getRandom(){
    return Math.random()
  }


  expand(event) {
    let target = event.target

    let member = target.parentNode
    while (member.className.indexOf('member-card-item') === -1) {
      member = member.parentNode
    }

    if (member.className.indexOf('read-only') !== -1) {
      return false
    }

    if (member.className.indexOf('opened') === -1) {
      member.classList.add('opened')
      this.props.UpdateProjectMembers(this.props.duty)
    } else {
      member.classList.remove('opened')
      this.props.UpdateProjectMembers(null)
    }
  }

  render() {
    // let { expend } = this.state
    let {
      isAdmin,
      expend,
      setProjectSubAdminMember,
      setSubMember,
      canEdit,
      delMember,
      setStateFunc,
      notDel,
      notSubAdmin,
      delProjectMembers} = this.props

    let membersData = {
      required: false,
      'value_type': 8,
      'field_name': '设置',
      ext: {
        setProjectSubAdminMember: setProjectSubAdminMember,
        setSubMember: setSubMember,
        delProjectMembers: delProjectMembers
      }
    }
    let keyIndex = this.getRandom()

    return (
      <div className={expend ? 'member-card-item opened' : 'member-card-item'} ref="member"
                data-role="member-card-item">
      <div className="member-header" onClick={this.expand.bind(this)}>
        <div className="member-arrow"></div>
        <span className="member-type">{this.props.duty}</span>
          {!notSubAdmin && isAdmin && expend && this.props.users.length &&
          <Field ref="subAdmin" data={membersData} item={this.props} key={keyIndex}/>}
      </div>

      <ProjectMemberItem item={this.props} canEdit={canEdit} delMember={delMember} setStateFunc={setStateFunc}
                         notDel={notDel}/>
    </div>
  )
  }
}
