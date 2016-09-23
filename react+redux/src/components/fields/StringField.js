import React, { Component} from 'react'
/**
 *
 {
	required: true/false,	// 是否必须
	value_type: 1 int, 2 string, 3 datetime, 4 bool, 5 enum
	value:"",				// 全以字符串传入，需要根据value_type解析
	name:"名称"			// 字段标签
}
 */
export default
class StringField extends Component {
  componentWillMount() {
    this.data = this.props.data

    this.state = {
      value: this.data.value
    }
  }

  getValue() {
    return this.refs.value.getDOMNode().value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
  }

  valid() {
    let $input = this.refs.value.getDOMNode()
    let pattern = this.props.data.pattern
    let message = this.props.data.message
    let flag = true

    if (this.data.required && !this.getValue()) {
      $input.placeholder = this.data.field_name + '不能为空'
      flag = false
    } else if (this.data.maxLength && this.data.maxLength < this.getValue().length) {
      $input.placeholder = this.data.field_name + '超出长度范围'
      flag = false
    } else if (pattern && !pattern.test(this.getValue())) {
      window.toast.setTxt(this.data.field_name + message)
      flag = false
    } else {
      flag = true
    }

    if (!flag) {
      $input.className = 'error-container'
    }

    return flag
  }

  render() {
    if (!this.data) {
      return <div>没有数据</div>
    }

    let that = this
    let {display, data_placeholder} = this.props
    data_placeholder = data_placeholder ? data_placeholder : ''
    let inputCustomCss = that.data.inputCustomCss
    if (display) {
      return (
        <div>
          <label className="control-label">
            {that.data.field_name}
            {that.data.required ? <span className="required">*</span> : ''}
          </label>
          <div className={'control-input ' + inputCustomCss} onClick={that.data.selectFunction}>
            <input className={that.data.className} name="value" ref="value" readOnly disabled="disabled"
                   defaultValue={that.data.value}
                   key={that.data.value}
                   placeholder={data_placeholder}
            />
          {that.data.iconClass && <div className={that.data.iconClass}></div>}
          </div>
        </div>
      )
    }

    if (that.data.onlyInput) {
      return (<input name="value" ref="value"
                      defaultValue={that.data.value}
      ></input>)
    } else {
      return (<div ref="container">
        <label className="control-label">
          {that.data.field_name}
          {that.data.required ? <span className="required">*</span> : ''}
        </label>
        <div className="control-input">
          <input name="value" ref="value"
                 className={that.data.className}
                 defaultValue={that.data.value}
                 placeholder={data_placeholder}
                 onFocus={this.handleFocus.bind(this)}
                 maxLength={that.data.maxLength}
                 key={that.data.value}
          />
        </div>
      </div>)
    }
  }

  handleFocus(){
    let $input = this.refs.value.getDOMNode()
    let {data_placeholder} = this.props

    if (!this.valid()) {
      $input.placeholder = data_placeholder
      $input.className = ''
    }
  }
}
