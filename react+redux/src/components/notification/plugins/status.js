import React, { Component } from 'react'

export default class Status extends Component {
  render() {
    const {stateCSS, stateText} = this.props
    console.log('render status')
    return (
      <div className={`fr state-text ${stateCSS}`}>{stateText}</div>
    )
  }
}
