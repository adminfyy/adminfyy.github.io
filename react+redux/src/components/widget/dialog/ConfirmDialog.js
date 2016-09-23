// ConfirmDialog.js
import React, { Component } from 'react'

class ConfirmDialog extends Component {
  constructor(){
    super()
    /*
      isHidden: 点击确定或者取消后，是否马上隐藏
     */
    this.state = {
      visible: false,
      title: '',
      label: '',
      noAction: '',
      actionHandler: '',
      prefixClass: '',
      confirmLabel: '',
      cancelLabel: '',
      isHidden: true
    }
  }
  componentDidUpdate(){
    const {label, componentProps} = this.state
    let $label = this.refs.label.getDOMNode()
    if(typeof label === 'string'){
      // label的值是html标签
      $label.innerHTML = label
    } else {
      // label的值是react组件
      const Component = label.component
      React.render(<Component {...componentProps} />, $label)
    }
  }
  getVisible(){
    return this.state.visible
  }

  render() {
    const { title, noAction, prefixClass, confirmLabel, cancelLabel } = this.state
    let confirmClass = prefixClass ? (prefixClass + ' confirm-div') : 'confirm-div'
    let hidden = this.state.visible ? '' : 'hidden '
    return (
      <div className={hidden + confirmClass}>
        <div className="dialog-mark" data-role="dialogMark" ref="dialogMark"></div>
        <div className="confirm-body" ref="dialogConfirm">
          <div className="dialog-confirm-content">
            {title
             ? <div className="dialog-confirm-head">
                <div className="dialog-confirm-title">{title || ''}</div>
              </div>
              : ''
            }
            <div className="dialog-confirm-main">
              <div className="dialog-confirm-message" ref="label"></div>
            </div>
            { noAction
              ? <div className="dialog-confirm-foot">
              <div className="dialog-confirm-cancel-action" data-role="cancel">
                <button onClick={this.cancelHandler.bind(this)}>{confirmLabel || '确定'}</button>
              </div>
            </div>
              : <div className="dialog-confirm-foot">
              <div className="dialog-confirm-submit-box dialog-confirm-action" data-role="submit">
                <button onClick={this.submitHandler.bind(this)}>{confirmLabel || '确定'}</button>
              </div>
              <div className="dialog-confirm-action" data-role="cancel">
                <button onClick={this.cancelHandler.bind(this)}>{cancelLabel || '取消'}</button>
              </div>
            </div> }
          </div>
        </div>
      </div>
    )
  }

  submitHandler(e) {
    const {actionHandler, isHidden} = this.state
    actionHandler()
    isHidden && this.setState({
      visible: false
    })
    e && e.stopPropagation()
  }

  cancelHandler(e) {
    const {cancelHandler, isHidden} = this.state
    isHidden && this.setState({
      visible: false
    })
    cancelHandler && cancelHandler()
    e && e.stopPropagation()
  }

  /**
   * [setOptions 初始化参数]
   * @method setOptions
   * @param  {[type]}   options []
   * visible: 显示隐藏
   * title：标题
   * label,
   * noAction,
   * actionHandler,
   * prefixClass,
   * confirmLabel,
   * cancelLabel
   */
  setOptions(options){
    this.setState({
      ...options
    })
  }
}
export default ConfirmDialog
