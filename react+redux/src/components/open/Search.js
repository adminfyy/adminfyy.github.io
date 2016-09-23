import React, { Component } from 'react'

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      isFocus: false
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.props.search.call(this)
    }
  }

  handleFocus() {
    this.setState({
      isFocus: true
    })
  }

  handleBlur() {
    this.setState({
      isFocus: false
    })
  }

  render() {
    const {search} = this.props
    let val = this.props.params.val

    return (
      <div className="search-box" ref="searchBox">
        <input type="text"
          className="js-keyword"
          placeholder={this.state.isFocus ? '' : '请输入一级项目名称'}
          ref="filter"
          defaultValue={val}
          onKeyDown={this.handleKeyDown.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)} />
        <div className="dropdown-arrow iconfont-open-search"
          onClick={search.bind(this)}></div>
      </div>
    )
  }

}
