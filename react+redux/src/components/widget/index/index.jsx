import React, { Component } from 'react'
import { Link } from 'react-router'
/*

传入参数 activeIndex 当前激活的下标数字 1、2、3、4
*/
export default class Index extends Component {
  render() {
    const { activeIndex , length } = this.props
    let indexView = []
    for(let i = 0; i< length;i++){
      if( i===(activeIndex-1)){
        indexView.push(
          <div className={'dot actived'} key={`index-array${i}`}>{activeIndex}</div>
        )
        continue
      }
       indexView.push(
          <div className={'dot'} key={`index-array${i}`}></div>
        )
    }
    return (
      <div className="indexContainer">
        {indexView}
      </div>
    )
  }
}
