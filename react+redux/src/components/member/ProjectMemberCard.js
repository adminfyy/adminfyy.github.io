import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import MemberDelDialog from 'components/member/MemberDelDialog'
import ProjectMemberCardItem from 'components/member/ProjectMemberCardItem'

@connect(state => ({}), actionCreators)
export default
class ProjectMemberCard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      expend: false
    }
  }


  render() {
    const {members, canEdit, isAdmin, delMember, setProjectSubAdminMember, setSubMember} = this.props

    if (!members.items) {
      return null
    }

    let index = 0
    members.items.map((item, i) => {
      if (item && item.duty === '项目负责人') {
        item.expend = typeof item.expend === 'undefined' ? true : item.expend
        item.notDel = true
        item.notSubAdmin = true
        index = i
      }
      return item
    })


    members.items.unshift(members.items.splice(index, 1)[0])


    return (

      <div className="member-card" ref="memberCard">

        {
          members.items.map((item, i) =>
            item && <ProjectMemberCardItem key={item.duty} isAdmin={isAdmin} {...item}
                                           setProjectSubAdminMember={setProjectSubAdminMember}
                                           setSubMember={setSubMember}
                                           canEdit={canEdit}
                                           delMember={delMember}
                                           setStateFunc={this.setStateFunc.bind(this)}
            />
          )}

        {
          this.state && this.state.isRender &&
          <MemberDelDialog {...this.state.delData} isRender={this.state.isRender} parent={this}/>
        }


      </div>

    )
  }

  subAdmin(event) {
    event.stopPropagation()
  }


  redirectToGroup(event) {
    // 群聊
    event.stopPropagation()
  }

  setStateFunc(delData) {
    this.setState({
      delData: delData,
      isRender: true
    })
  }


}
