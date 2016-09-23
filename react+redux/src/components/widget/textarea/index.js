import React, { Component } from 'react'
import * as helpers from '../../../utils/helpers'

export default class Textarea extends Component {
  constructor() {
    super()
    /**
     * value: textarea值
     * title: textarea名称
     * isNumShow: 是否显示字数统计
     * total: 最长字数
     * warnAt: 达到字数红色警告
     * isDisabled: 是否只读
     * writed: true value不为空的时候，字体颜色；false value为空的时候,placeholder的颜色
     * placeholder: 默认字符串
     * rows textarea高度
     * @type {Object}
     */
    this.state = {
      value: '',
      title: '',
      isNumShow: true,
      total: 100,
      warnAt: 10,
      isDisabled: false,
      writed: false,
      placeholder: '',
      rows: 7,
      required: false,
      textareaCss: '',
      inputHeight: 0
    }
  }
  /**
   * [componentWillMount 初始化组件参数]
   * @method componentWillMount
   * @return {[type]}           [description]
   */
  componentWillMount() {
    let {options} = this.props
    this.setState({
      ...options
    })
  }
  /**
   * [getValue 返回value]
   * @method getValue
   * @return {[type]} [description]
   */
  getValue() {
    return this.state.value
  }

  valid() {
    let $comment = this.refs.comment.getDOMNode()
    let {title, required} = this.state
    let flag = true

    if (required && !this.getValue().trim()) {
      this.setState({
        value: ''
      })
      $comment.placeholder = title + '不能为空'
      flag = false
    }

    if (!flag) {
      $comment.className = 'error-container'
    }

    return flag
  }

  /**
   * [onInput 编辑时实时计算数字]
   * @method onInput
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  onInput(e){
    let value = e.target.value
    let count = value.length
    if (count <= this.state.total) {
      this.setState({
        value: value,
        writed: true
      })
    } else{
      this.setState({
        value: value.toString().substring(0, this.state.total),
        writed: true
      })
    }
  }
  /**
   * [onFocus 个别机子，软键盘弹出不会将内容上顶的问题]
   * @method onFocus
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  onFocus(e){
    let $comment = this.refs.comment.getDOMNode()
    if (!this.valid()) {
      $comment.placeholder = this.state.placeholder
      $comment.className = ''
    }
  }
  onClick(){
    helpers.virKeybord(this.state.inputHeight)
  }
  render() {
    let {total, warnAt, value, writed, placeholder, title, rows, required, textareaCss, isNumShow, isDisabled} = this.state
    let count = value ? value.length : 0
    let remain = (total - count) < warnAt ? 'red' : ''
    let writedCss = writed || value ? 'writed' : ''
    return (
      <li className="widget-textarea text-label border-bottom0">
        { isNumShow &&
        <div>
          <label className="control-label">
            {title}
            {required ? <span className="required">*</span> : ''}
          </label>
            <div className="control-input">
              <div className="fr input-tip">
              <span className={remain} ref="num">{count}</span>/{total}</div>
            </div>
        </div>
          }
        <div className={textareaCss}>
          <textarea rows={rows}
            className={writedCss}
            onInput={this.onInput.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onClick={this.onClick.bind(this)}
            placeholder={placeholder}
            value={value}
            disabled={isDisabled}
            readOnly={isDisabled}
            ref="comment"
            />
        </div>
      </li>
    )
  }
}
// style={{position: 'absolute', bottom: '0'}}
