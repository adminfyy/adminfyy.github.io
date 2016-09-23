import React, { Component } from 'react'
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
class IntField extends Component {
  componentWillMount() {
    this.data = this.props.data
    this.state = {
      value: this.data.value
    }
  }

  getValue() {
    return this.refs.value.getDOMNode().value
  }

  valid() {
    let flag = true
    if (this.getValue()) {
      if (!/^[1-9][\d]*$/.test(this.getValue())) {
        window.toast.setTxt(this.data.field_name + '必须是正整数')
        flag = false
      }
    } else if (this.data.required) {
      window.toast.setTxt(this.data.field_name + '不可以为空')
      flag = false
    }
    return flag
  }

  render() {
    let {display} = this.props
    if (!this.data) {
      return <div>没有数据</div>
    }

    if (display) {
      return <div>{this.state.value}</div>
    }

    let that = this

    return (
      <div>
        <label className="control-label">{that.data.field_name + '：'}</label>
        <input name="value" ref="value"
               defaultValue={ that.data.value }
        ></input>
      </div>
    )
  }
}
