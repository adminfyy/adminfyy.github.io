// BackButton.js
import React, { Component } from 'react'

class BackButton extends Component {
  render() {
    return (
      <div className="suspended iconfont-back" onClick={this.handleClick.bind(this)}></div>
    )
  }
  handleClick() {
    const { actionHandler } = this.props
    if (actionHandler && typeof actionHandler === 'function'){
      actionHandler()
    } else {
      window.history.back()
    }
  }
}

export default BackButton
