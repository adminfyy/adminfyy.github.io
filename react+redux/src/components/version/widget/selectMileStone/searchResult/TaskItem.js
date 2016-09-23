// TaskItem.js
import React, {Component} from 'react'
// import * as helpers from '../../../../../utils/helpers'
import {connect} from 'react-redux'
import * as actionCreators from 'actions'

@connect(state => ({}), actionCreators)
class TaskItem extends Component {
  componentDidMount () {
    // helpers.Scroll({
    //   fnCallback: this.props.onUpload
    // }, 160)
  }

  render () {
    const {title, isChecked} = this.props

    return (
      <li onClick={this.handleSelected.bind(this)}>
        <span className="icon-check left"></span>
        <a href="javascript:void(0)">{title}</a>
        {isChecked && <span className="icon-checked left"></span>}
      </li>
    )
  }

  handleSelected () {
    const {taskcode, isChecked} = this.props
    this.props.updateSelectedVersion(taskcode, !isChecked)
    this.props.updateProjectNoVersionTasks(taskcode, !isChecked)
  }
}

export default TaskItem
