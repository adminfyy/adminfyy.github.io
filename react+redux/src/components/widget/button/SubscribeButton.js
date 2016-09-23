// SubscribeButton.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'

@connect(state => ({ }), actionCreators)
class SubscribeButton extends Component {
	constructor(props) {
  super(props)

  this.prefixCls = 'sub-btn'
  this.state = {
    isShow: props.isSub
  }
}

	componentDidMount() {
  const { unsubHandler, subHandler } = this.props

  if (unsubHandler && typeof unsubHandler === 'function') {
    this.unsub = unsubHandler
  }
  if (subHandler && typeof subHandler === 'function') {
    this.sub = subHandler
  }
	}

  render() {
    let { isShow } = this.state

    return (
      <div className={this.prefixCls + '-' + this.props.className} onClick={this.stopProgate.bind(this)}>
        {
          isShow ? <div className="row-action off" ref="unsubBtn" onClick={this.unsub.bind(this)}>取消关注</div>
                 : <div className="row-action on" ref="subBtn" onClick={this.sub.bind(this)}>关注</div>
        }
      </div>
    )
  }

  stopProgate (event) {
    event.stopPropagation()
  }

  unsub() {
    const { projectId } = this.props
    const unsubBtn = this.refs.unsubBtn.getDOMNode()

    unsubBtn.disabled = true
    // unsubBtn.innerText = '取消中...'

    this.props.unSubProject(projectId, function () {
      let txt = '取消关注成功'
      window.toast.setProps({
        icon: 'icon-notice',
        text: txt,
        timeOut: 2000,
        isShow: true
      })
      unsubBtn.disabled = false

      this.setState({
        isShow: false
      })
    }.bind(this))
  }

  sub() {
    const { projectId } = this.props
    const subBtn = this.refs.subBtn.getDOMNode()

    subBtn.disabled = true
    // subBtn.innerText = '关注中...'

    this.props.subProject(projectId, function () {
      let txt = '关注成功'
      window.toast.setProps({
        icon: 'icon-notice',
        text: txt,
        timeOut: 2000,
        isShow: true
      })

      subBtn.disabled = false
      this.setState({
        isShow: true
      })
    }.bind(this))
  }

}

export default SubscribeButton
