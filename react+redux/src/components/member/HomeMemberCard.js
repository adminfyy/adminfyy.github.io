import React, { Component } from 'react'
import ProjectMemberItem from 'components/member/ProjectMemberItem'
import MemberDelDialog from 'components/member/MemberDelDialog'

export default
class HomeMemberCard extends Component {

  render() {
    const {members, canEdit, delMember} = this.props

    if (!members.items) {
      return null
    }
    members.list = members.items.filter(item => {
      return item && item.duty === '项目负责人'
    })

    return (

      <div className="member-card bg-white" ref="memberCard">
              <div className="header-bar  bg-white">
                <span className="title"> 项目负责人</span>
              </div>


 {members.list.map((item, i) =>

    item && <div className="member-card-item opened"
          ref="member"
          data-role="member-card-item"
          key={'member' + i}>

       <ProjectMemberItem
         item={item}
         canEdit={canEdit}
         isShowChat="yes"
         isShowDuty="no"
         parent={this}
         delMember={delMember}/>
     </div>
 )}

       {
       this.state &&
       this.state.isRender &&
       <MemberDelDialog {...this.state.delData}
         isRender={this.state.isRender}
         parent={this}/>
         }

      </div>

    )
  }
}
