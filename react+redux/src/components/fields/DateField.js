import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
/**
 *
 {
	required: true/false,	// 是否必须
	value_type: 1 int, 2 string, 3 datetime, 4 bool, 5 enum
	value:"",				// 全以字符串传入，需要根据value_type解析
	name:"名称",			// 字段标签
}
 */
export default
class DateField extends Component{
  componentWillMount(){
    this.initDate()
  }

  componentWillReceiveProps() {
    this.initDate()
  }

  initDate() {
    let data = this.props.data
    data.value = data.value ? helpers.dateTime(data.value, 'yyyy-MM-dd').toString() : ''
    this.state = {
      isShowingSelection: false,
      value: data.value
    }
  }

  render(){
    let result = this.state.value
    let data = this.props.data
    let {display} = this.props
    if (display){
      return <div>{this.state.value}</div>
    }
    return (
      <div className={data.className}>
        <label className="control-label">
          {data.field_name}
          {data.required ? <span className="required">*</span> : ''}
        </label>
        <div className="control-input">
          <input id={data.id} className="input-addon" data-role="value" type="date"
               defaultValue={result} key={result} ref="date" onChange={this.validate.bind(this)}/>
             <label className="role-dropdown iconfont-date" htmlFor={data.id}>
             </label>
        </div>
      </div>
    )
  }
  getValue(){
    let date = this.refs.date.getDOMNode()
    return date.value
  }
  validate(){
    const {data} = this.props
    let date = this.refs.date.getDOMNode()
    if (!helpers.checkRegex(date.value, 'date')) {
      window.toast.setTxt('请输入正确的日期格式yyyy-MM-dd')
    } else{
      data.handleChangeDate()
    }
  }
}
