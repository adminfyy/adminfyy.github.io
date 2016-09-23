import React, { Component } from 'react'
// import Switch from 'rc-switch'
import Switch from 'components/widget/switch/Switch'

class EnumSelector extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    let that = this
    this.setMaskHeight()
    window.addEventListener('scroll', function () {
      that.setMaskHeight()
    })

    this.setState({
      value: this.props.value
    })
  }

  componentWillUnmount() {
    const that = this
    window.removeEventListener('scroll', function () {
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
    let { enums, value } = this.props
    let that = this

    return (
      <div className="mile-stone-notify-dialog">
        <div className="dialog-mark" data-role="dialogMark" ref="dialogMark"></div>
        <div className="dialog-notifytype" ref="dialogConfirm">
          <div className="dialog-notifytype-content" data-role="content">

            <div className="dialog-notifytype-head" data-role="head">
              <div className="dialog-notifytype-title" data-role="title">请选择通知对象</div>
            </div>

            <div className="dialog-notifytype-main" data-role="main">
              <ul className="role-selector">
                {
                  enums.map(item => (
                        <Switch checked={ value & item.value } item={item} handleCheck={that.onValueChanged.bind(that, that.props.target, item.value)}
                          dataRole="version-actual-flag"/>

                  ))
                  }
              </ul>
            </div>
            <div className="dialog-notifytype-footer">
              <div className="submitBtn btn-inline">
                <button onClick={this.props.target.show.bind(this.props.target, this.props.target, false)}>保存</button>
                <button className="delBtn" onClick={this.props.target.show.bind(this.props.target, this.props.target, false, 'cancel')}>取消</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

  onValueChanged(target, value) {
    this.state.value = this.state.value ^ value
    this.setState(this.state)
    target.onValueChanged(target, value)
  }

}

export default EnumSelector
