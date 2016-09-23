// SearchTask.js
import React, { Component } from 'react'
import * as helpers from '../../../../../utils/helpers'

export default class SearchTask extends Component {
  constructor() {
    super()
    this.state = {isLoading: false, taskSearchPage: 0}
  }

  setPage() {
    this.setState({
      taskSearchPage: ++this.state.taskSearchPage
    })
  }


  setEmptyTip($nodeDiv, $input) {
    let errorTxt = '请输入名称'
    let normalTxt = '搜索'
    helpers.placeholderShow({$nodeDiv, $input, errorTxt, normalTxt})
  }


  handlerKeyDown(e) {
    let $input
    let that = this
    if (e.keyCode === 13) {
      $input = this.refs.filter.getDOMNode()
      let value = $input.value
      if (value === '') {
        let $nodeDiv = this.refs.searchBar.getDOMNode()
        this.setEmptyTip($nodeDiv, $input)
        return
      }
      if (value && !helpers.checkRegex(value)) {
        window.toast.setTxt('请输入中文、数字、英文字符!')
        return
      }
      document.activeElement.blur()
      setTimeout(function () {
        that.handleSearch(true)
      }, 500)
      return false
    }
  }

  handleSearch(flag) {
    const { projectId, version_id, clearProjectVersionTasks, versionType, taskcodes, removeTask } = this.props
    let removeTaskfilter = []
    let $input = this.refs.filter.getDOMNode()
    let value = $input.value.trim()
    let $scroll = document.querySelector('.js-scroll')
    if($scroll){
      $scroll.scrollTop = 0
      $scroll.classList.remove('data-scroll')
    }
    if (flag) {
      if (value === '') {
        let $nodeDiv = this.refs.searchBar.getDOMNode()
        this.setEmptyTip($nodeDiv, $input)
        return
      }
      if (value && !helpers.checkRegex(value)) {
        window.toast.setTxt('请输入中文、数字、英文字符!')
        return
      }
      // 搜索过滤用
      if(removeTask.length){
        removeTaskfilter = removeTask.filter(item => {
          return item.title.indexOf(value) !== -1
        })
      }
    } else {
      value = ''
      removeTaskfilter = removeTask
    }
    if (!versionType || versionType !== 'version') {
      let options = {
        projectId: projectId,
        taskSearchPage: this.state.taskSearchPage,
        $offset: 0,
        isSearch: true
      }
      let filter = ''
      if (value){
        filter = 'title like ' + value
        if (taskcodes){
          filter += ' and taskcode nin ' + taskcodes
        }
      } else if (taskcodes){
        filter += 'taskcode nin ' + taskcodes
      }
      options.$filter = filter
      this.props.searchProjectNoVersionTasks(options, removeTaskfilter)
    } else {
      clearProjectVersionTasks()
      this.props.fetchProjectVersionTasks({
        projectId: projectId,
        versionId: version_id,
        key: value,
        taskSearchPage: this.state.taskSearchPage,
        $offset: 0,
        isSearch: true
      })
    }
  }

  handlerFocus(e) {
    this.setState({
      isLoading: true
    })
  }

  handlerCancel(e) {
    this.setState({
      isLoading: false,
      taskSearchPage: 0
    })
    this.handleSearch(false)
  }

  render() {
    const { isLoading } = this.state

    return (
      <div className="scroll-search-bar" ref="searchBar">
        <div className="search-content">
          {isLoading
            ? <div className="search-right">
            <div className="icon-area" onClick={this.handleSearch.bind(this, true)}>
              <div className="icon-search"></div>
            </div>
            <input className="search-label js-keyword"
                   placeholder="搜索"
                   ref="filter"
                   onKeyDown={this.handlerKeyDown.bind(this)}
            />
            <div className="search-cancel" onClick={this.handlerCancel.bind(this)}>取消</div>
          </div>
            : <div className="search-center">
            <div className="icon-search"></div>
            <input className="search-label" ref="search-center" value="搜索" onFocus={this.handlerFocus.bind(this)}/>
          </div>
          }
        </div>
      </div>
    )
  }
}
