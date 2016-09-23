import React, { Component } from 'react'
import * as helpers from '../../../utils/helpers'
class SearchPersonBox extends Component {

  render() {
    const isLoading = this.state && this.state.isLoading
    const notInit = this.state && this.state.notInit

    return (
      <div>
        <div className="search-bar" ref="searchBar">
          <a className="iconfont iconfont-search" href="javascript:void(0)"></a>
          <input className="search-input"
                 placeholder="输入姓名、工号"
                 ref="filter"
                 type="search"
                 onKeyDown={this.handleKey.bind(this)}
          />
        {isLoading ? <div className="search-spinner">
          <div className="spinner"></div>
        </div>
          : <button className="search-submit"
            onClick={this.handleSearch.bind(this)}>搜索</button>
          }
        </div>
        {notInit || <div className="search-initial"></div>}
      </div>

    )
  }

  handleKey(e) {
    if (e.keyCode === 13) {
      this.handleSearch()
    }
  }

  handleSearch() {
    const {clearUsers} = this.props
    this.setState({
      isLoading: true,
      notInit: true
    })
    this.forceUpdate()
    let $nodeDiv = this.refs.searchBar.getDOMNode()
    let $input = this.refs.filter.getDOMNode()
    let errorTxt = '输入姓名、工号'
    let normalTxt = '输入姓名、工号'
    const value = this.refs.filter.getDOMNode().value
    if (value){
      if (!helpers.checkRegex(value)){
        window.toast.setTxt('请输入中文、数字、英文字符!')
        this.setState({
          isLoading: false
        })
        return
      }
      this.props.fetchUsers({name: value, $offset: 0, $limit: 20, isSearch: true}, function (data) {
        this.setState({
          isLoading: false
        })
      }.bind(this))
    } else {
      helpers.placeholderShow({$nodeDiv, $input, errorTxt, normalTxt})
      this.setState({
        isLoading: false,
        notInit: false
      })
      // 搜索为空，要清空列表人员Users
      clearUsers()
    }
  }

}

export default SearchPersonBox
