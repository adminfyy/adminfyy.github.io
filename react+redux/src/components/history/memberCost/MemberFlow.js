import React, { Component } from 'react'

class MemberFlow extends Component {
  render() {
    return (<table className="member-flow" ref="memberflowTable">
           <tbody>
      {
        this.props.memberCost.items.map((item, i) =>
          <tr className="" key={i}>
            <td className="month">{item.month}</td>
            <td className="dotline">
              <span className="dot"></span>
              <span className="line"></span>
            </td>
            <td><span className="content">{this._getSummary(item)}</span></td>
          </tr>
        )
      }
     </tbody>
    </table>
  )
  }

  _getSummary(item) {
    let result = ''
    result += '总用户人数:' + item.month_total_person_count + '人'
    result += ',项目负责人:' + item.manager_count + '人'
    if (item.in_users) {
      result += ',增加'
      let first = true
      item.in_users.forEach(function(users) {
        if (!first) {
          result += ','
        }
        first = false
        result += users.member_type
        result += (users.uids ? users.uids.length : 0) + '人'
      })
    }
    return result
  }
  }

export default MemberFlow
