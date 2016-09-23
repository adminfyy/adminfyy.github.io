import React, { Component } from 'react'
import { Link } from 'react-router'
import { consts } from 'constants'


export default class Tabs extends Component {
  constructor() {
    super()
    /**
     * tabValue: tab数组
     * isActive: 当前选中的tab，默认0
     * isAverage: 是否均分tab，默认否
     * handleFunction: 处理的回调函数
     */
    this.state = {
      tabValue: [],
      isActive: 0,
      isAverage: false,
      handleFunction: null
    }
  }
  /**
   * [componentWillMount 设置参数]
   * @method componentWillMount
   */
  componentWillMount() {
    let {options} = this.props
    this.setState({
      ...options
    })
  }

  render() {
    let {tabValue, isActive, isAverage} = this.state
    let swidth = 100 / tabValue.length + '%'
    let style = {
      width: isAverage ? swidth : 'auto'
    }
    return (
      <div className="tab-widget">
      <div className="tab-table">
        <div className="tab-row">
          {tabValue.map((item, i) =>
            <div style={style} key={item} className={'tab-cell ' + (isActive === i ? 'active' : '')} onClick={this.clickHandleFunction.bind(this, i)}>
              {item}
            </div>
          )}
        </div>
      </div>
      </div>
    )
  }
  /**
   * [handleFunction 触发回调方法]
   * @method handleFunction
   * @param  {[type]}       index [description]
   * @return {[type]}             [description]
   */
  clickHandleFunction(index){
    let {handleFunction} = this.state
    if(index === this.state.isActive) return
    this.setState({
      isActive: index
    })
    handleFunction(index)
  }
}
