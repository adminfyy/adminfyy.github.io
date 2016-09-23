import React, { Component } from 'react'
import DelDialog from 'components/widget/dialog/delDialog'

export default
class MemberDelDialog extends Component {

  render() {
    const {isRender, parent} = this.props

    return (
        isRender &&
        <DelDialog {...this.props}
          destoryDialog={this.destoryDialog.bind(parent)}/>
    )
  }

  destoryDialog() {
    this.setState({
      isRender: false
    })
  }


}
