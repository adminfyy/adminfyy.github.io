import React, {Component} from 'react'
import * as helpers from '../../../utils/helpers'

class Templates extends Component {
  constructor(props) {
    super()
    this.state = {}
    props.item.users.forEach(v => {
      this.state[v.user_id] = {}
      this.state[v.user_id].isSubAdmin = v.is_subadmin
      this.state[v.user_id].user = v
      this.state[v.user_id].item = props.item
    })
  }

  componentDidMount() {
    let that = this
    this.setMaskHeight()
    window.addEventListener('scroll', function() {
      that.setMaskHeight()
    })

    this.setState({
      value: this.props.value
    })
  }

  componentWillUnmount() {
    const that = this
    window.removeEventListener('scroll', function() {
      that.setMaskHeight()
    })
  }

  componentDidUpdate() {
    this.setMaskHeight()
  }

  setMaskHeight() {
    let dialogMark = this.refs.dialogMark && this.refs.dialogMark.getDOMNode()
    if (dialogMark) {
      let docHeight = document.body.scrollHeight
      let winHeight = document.documentElement.clientHeight
      dialogMark.style.height = (docHeight <= winHeight ? winHeight : docHeight) + 'px'
    }
  }

  render() {
    let {
      item,
      instance
    } = this.props

    return (
    < div className = "project-responsible-dialog" >
      < div className = "dialog-mark"
      data-role = "dialogMark"
      ref = "dialogMark" > < /div> < div className = "dialog-notifytype"
      ref = "dialogConfirm" >
      < div className = "dialog-notifytype-content"
      data-role = "content" >

      < div className = "dialog-notifytype-head"
      data-role = "head"
      onClick = {
        this.stop.bind(this)
      } >

      < div className = "dialog-notifytype-title"
      data-role = "title" >
      < div className = "title" > {
        item.duty
      }
      负责人设置 < /div> < /div > < /div>

      < div className = "dialog-notifytype-main"
      data-role = "main" >
      < div className = "member-card-item opened read-only" >
      < div className = "member-list-subs" > {
        item.users.map((user, i) =>
          < div key = {
            i
          } >
          < div className = "member-item"
          onClick = {
            this.setSubAdmin.bind(this, user, item)
          }
          data-role = "chart-item"
          data-name = {
            user.nick_name
          }
          data-duty = {
            item.duty
          }
          data-uid = {
            user.user_id
          }
          data-projectid = {
            user.project_id
          } >
          < div className = "member-info" >
          < div className = "user"
          ref = "userInfo" >
          < div className = "user-wrap" >

          < div className = "user-avatar" >
          < img src = {
            helpers.avatar(user.user_id)
          }
          ref = "avatar" / >
          < /div> < div className = "username-setting" > < span data-uid = {
            user.user_id
          } > {
            `${user.nick_name || user.user_id}(${user.user_id})`
          } < /span> {
          user.ptype ? '(职级' + user.ptype + ')' : ''
        } < /div> < /div > {
          this.state[user.user_id].isSubAdmin ? < span className = "icon-checked right" > < /span> : < span className = "icon-check right" > < /span >
        } < /div> < /div >

        < /div> < /div >
      )
    }

    < /div> < /div > < /div> < div className = "dialog-notifytype-footer"
    data-role = "footer" >
      < div className = "dialog-notifytype-title"
    data-role = "title" >
      < span className = "btn confirm-txt"
    onClick = {
      this.submit.bind(this)
    } > 确定 < /span> < span className = "btn cancel-txt"
    onClick = {
      instance.show.bind(instance, false)
    } > 取消 < /span> < /div > < /div> < /div > < /div>

    < /div>
  )
  }

stop(event) {
  event && event.stopPropagation()
}

setSubAdmin(user, item, event) {
  this.stop(event)
  this.setState({
    [user.user_id]: {
      isSubAdmin: !this.state[user.user_id].isSubAdmin,
      user: user,
      item: item
    }

  })
}

submit(event) {
  this.stop(event)
  const {
    instance,
    data
  } = this.props
  let arr = []
  let uids = []
  let duty = ''
  Object.keys(this.state).forEach(v => {
    if (!isNaN(v)) {
      duty = this.state[v].item.duty
      uids.push(this.state[v].user.user_id)
      arr.push({
        projectId: this.state[v].user.project_id,
        'user_id': this.state[v].user.user_id,
        duty: this.state[v].item.duty,
        'is_subadmin': this.state[v].isSubAdmin
      })
    }
  })
  data.setProjectSubAdminMember(arr, function(res) {
    instance.show(false)
    if (res) {
      // 表示批量设置子负责人时，其中有成员被删除了
      data.delProjectMembers(res)
      window.toast.setTxt('项目成员已被删除，请重新设置 ')
    } else {
      data.setSubMember(arr, duty)
    }
  })
}
}
export default Templates
