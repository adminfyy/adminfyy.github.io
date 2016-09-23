import React, { Component } from 'react'
import HomeMemberCard from 'components/member/HomeMemberCard'
import ProjectMemberCard from 'components/member/ProjectMemberCard'

export default
class ProjectMemberTo extends Component {

  render() {
    const {isHome} = this.props
    return (

      <div className="member-card" ref="memberCard">

      {isHome ? <HomeMemberCard {...this.props}/> : <ProjectMemberCard {...this.props}/>}

      </div>

    )
  }

}
