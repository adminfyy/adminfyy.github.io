// Switch.js

import React, { Component } from 'react'

export default
class Switch extends Component {

	constructor() {
  super()
  this.state = {
    switchChecked: false
  }
}

  componentDidMount() {
    let {checked} = this.props
    this.setState({
      switchChecked: checked
    })
  }

  getValue(){
    return this.state.switchChecked
  }

  render() {
    let {dataRole, className, item} = this.props
    let { switchChecked } = this.state

    return (
      <li key={item.value} onClick={this.handleClick.bind(this)}>
        <div className="checkbox-role">
          <div className={ className ? 'finish-checkbox ' + className : 'finish-checkbox'} ref="switch_node">
            <input type="checkbox" checked={ switchChecked } data-role={dataRole} onChange={this.switchChange.bind(this)}/>
            <label className="switch-label"></label>
          </div>
        </div>
        <span>{item.name}</span>
      </li>
    )
  }

  handleClick() {
    let { handleCheck } = this.props
    this.setState({
      switchChecked: !this.state.switchChecked
    })

    if(handleCheck){
      handleCheck()
    }
  }
  switchChange(){

  }
}
