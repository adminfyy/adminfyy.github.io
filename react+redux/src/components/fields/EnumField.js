import React, { Component } from 'react'
import EnumSelector from 'components/fields/widgets/EnumSelector'
/**
 *
 {
	required: true/false,	// 是否必须
	value_type: 1 int, 2 string, 3 datetime, 4 bool, 5 enum
	value:"",				// 全以字符串传入，需要根据value_type解析
	name:"名称",			// 字段标签
	ext:{
		enum_def:{
			multi:true,		// 是否多选, 多选时，值|值
			enums:[
			{
				name:"CEO",
				value:"1"
			},
			{
				name:"VP",
				value:"2"
			},
			{
				name:"项目负责人",
				value:"4"
			},
			{
				name:"项目成员",
				value:"2"
			},
			]
		}
	}
}
 */
export default
class EnumField extends Component{
  componentWillMount(){
    this.data = this.props.data
    this.state = {
      isShowingSelection: false,
      value: this.data.value,
      origin: this.data.value
    }
  }

  getEnumNames(enums, value) {
    let i
    let result = ''
    for (i = 0; i < enums.length; i++) {
      if ((value >> i) & 0x1) {
        if (result.length !== 0) {
          result += ','
        }
        result += enums[i].name
      }
    }
    return result
  }

  getValue(){
    return this.state.value ? this.state.value : 0
  }

  render(){
    if(!this.data || !this.data.ext || !this.data.ext.enum_def || !this.data.ext.enum_def.enums || this.data.ext.enum_def.enums.length <= 0){
      return <div>没有选项</div>
    }

    let placeholder = this.props.data_placeholder
    let result = this.getEnumNames(this.data.ext.enum_def.enums, this.state.value)
    return (
      <div>
        <label className="control-label">{ this.data.field_name + '： '}</label>
        <div className="control-input">
        <input className="input-addon" name="roleList" readOnly disabled
               value={ result } placeholder={placeholder}
          ></input>
        <a className="role-dropdown iconfont-select" onClick={this.show.bind(this, this, true)} />
        </div>
        {
          this.state.isShowingSelection &&
          <EnumSelector target={this} enums={ this.data.ext.enum_def.enums } multiChoice={ this.data.ext.enum_def.multi } value={ this.state.value }/>
        }
      </div>
    )
  }

  show(target, show, isCancel){
    target.state.isShowingSelection = show
    if (isCancel === 'cancel'){
      target.state.value = target.state.origin
    }
    target.state.origin = target.state.value
    target.setState(target.state)
  }

  onValueChanged(target, value) {
    target.state.value = target.state.value ^ value
    target.setState(target.state)
  }
}
