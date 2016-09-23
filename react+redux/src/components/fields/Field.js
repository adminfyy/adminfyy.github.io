import React, { Component } from 'react'
import EnumField from 'components/fields/EnumField'
import BoolField from 'components/fields/BoolField'
import IntField from 'components/fields/IntField'
import DateField from 'components/fields/DateField'
import StringField from 'components/fields/StringField'
import TemplateField from 'components/fields/TemplateField'
import MemberField from 'components/fields/MemberField'
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
class Field extends Component {
  getValue() {
    let field = this.refs.field
    return field.getValue()
  }
  valid(){
    let field = this.refs.field
    return field.valid()
  }

  render() {
    this.data = this.props.data
    this.item = this.props.item

    this.display = this.props.display

    if (!this.data) {
      return <div>没有数据</div>
    }
    return (
      <div>
      {
      this.data.value_type === 2 && <IntField ref="field" display={this.display} data={this.data} data_placeholder={this.props.data_placeholder}/>
        }
      {
      this.data.value_type === 6 && <EnumField ref="field" display={this.display} data={this.data} data_placeholder={this.props.data_placeholder}/>
        }
      {
      this.data.value_type === 5 && <BoolField ref="field" display={this.display} data={this.data} />
        }
      {
      this.data.value_type === 4 && <DateField ref="field" display={this.display} data={this.data} data_placeholder={this.props.data_placeholder}/>
        }
      {
      this.data.value_type === 3 && <StringField ref="field" display={this.display} data={this.data} data_placeholder={this.props.data_placeholder} dataCustom={this.props.dataCustom}/>
        }
      {
      this.data.value_type === 7 && <TemplateField ref="field" display={this.display} data={this.data} />
        }
        {
          this.data.value_type === 8 && <MemberField ref="field" display={this.display} data={this.data} item={this.item} />
        }
      </div>
    )
  }
}
