// TaskBtn.js
import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import TaskDialog from 'components/version/widget/selectMileStone/dialog/TaskDialog'

@connect(state => ({ misc: state.misc }), actionCreators)
class TaskBtn extends Component {
  constructor() {
    super()
    this.state = {
      showDialog: false
    }
  }

  render() {
    return (
      <div className="role-dropdown iconfont-select" onClick={this.show.bind(this)}>
        { this.state.showDialog &&
          <TaskDialog destroyDialog={this.destroyDialog.bind(this)} {...this.props}/>
        }
      </div>
    )
  }

  show() {
    this.setState({
      showDialog: true
    })
  }

  destroyDialog() {
    this.setState({
      showDialog: false
    })
  }

}

export default TaskBtn
