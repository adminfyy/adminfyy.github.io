import React, { Component } from 'react'
import Switch from 'components/widget/switch/Switch'
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
class BoolField extends Component{
  componentWillMount(){
    this.data = this.props.data
    this.display = this.props.display
    this.state = {
      value: this.data.value
    }
  }

  getValue(){
    if(this.data.trueValue){
      return this.refs.value.getValue() ? this.data.trueValue : this.data.falseValue
    }
    return this.refs.value.getValue()
  }

  valid() {
    // let flag = true
    return true
  }

  render(){
    if(!this.data){
      return <div>没有数据</div>
    }
    if(this.display){
      return <div>{this.data.value}</div>
    }

    return (
      <div>
        <label>{this.data.field_name + '：'}</label>
        <div className="addRelative">
          <Switch ref="value"
          checked={ this.data.trueValue ? (this.data.trueValue === this.data.value) : this.data.value }
          dataRole="version-actual-flag" onChange={this.onValueChanged.bind(this)}/>
        </div>
      </div>
    )
  }

  onValueChanged(){
    let valueNode = this.refs.value.getDOMNode()
    valueNode.checked
  }
}
