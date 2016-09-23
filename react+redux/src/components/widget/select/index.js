// TaskDialog.js
import React, { Component } from 'react'
import VersionHeader from 'components/widget/header/version'
import SearchScroll from 'components/widget/search/SearchScroll'
import Result from './result'
import { createHashHistory } from 'history'
import * as helpers from 'utils/helpers'

export default class TaskDialog extends Component {
  constructor() {
    super()
    this.data = {
      isAllChecked: false
    }
    this.defaultHeight = document.body.clientHeight
  }
  componentDidMount() {
    let that = this
    window.onresize = function(){
      let footNode = that.refs['dialog-foot'].getDOMNode()
      if(+document.body.clientHeight < +that.defaultHeight){
        footNode.classList.add('hidden')
      } else {
        footNode.classList.remove('hidden')
      }
    }
  }
  render() {
    const {title, selectedName, selectResult} = this.props
    let selectedLength = selectResult.selectedItems && selectResult.selectedItems.length
    let isAllChecked = selectedLength === selectResult.data.length
    this.data.isAllChecked = isAllChecked
    return (
      <div className="mile-stone-dialog" onClick={this.stop.bind(this)}>
        <div className="dialog-confirm absolute">
          <div className="dialog-confirm-content" data-role="content" ref="dialogConfirm">
            <VersionHeader
              projectTitle={title}
              {...this.props}/>
            <SearchScroll search={this.onSearch.bind(this)} isCancel="1"/>
            <div className="dialog-confirm-main" data-role="main">
              <div className="dialog-confirm-message" data-role="message">
                <Result {...this.props} isAllChecked={isAllChecked}/>
              </div>
            </div>
            {selectResult.data.length > 0
            ? <div className="dialog-confirm-foot" data-role="foot" ref="dialog-foot">
              <div className="dialog-confirm-confirm-box dialog-confirm-action" data-role="confirm">
                <button onClick={this.confirm.bind(this)}>确定</button>
              </div>
              <div onClick={this.checkAll.bind(this)}
                   className={isAllChecked ? 'select-all active' : 'select-all'}>
                全选（已选{selectedLength + selectedName}）
              </div>
            </div>
            : '' }
          </div>
        </div>
      </div>
    )
  }

  stop(event) {
    event && event.stopPropagation()
  }

  checkAll() {
    this.props.receiveSelectAllChecked(null, !this.data.isAllChecked)
  }

  confirm(event) {
    const {selectResult} = this.props
    let postSelectItems = selectResult.selectedItems.length && selectResult.selectedItems.map(item => {
      return item.id
    })
    if (!postSelectItems || postSelectItems.length === 0) {
      window.toast.setTxt('请先选择人员')
      return null
    }
    this.props.selectedConfirm(selectResult.selectedItems)
    let history = new createHashHistory()
    history.goBack()
  }

  onSearch(keyword){
    const {selectResult} = this.props
    this.props.searchSelectOptions(selectResult, keyword)
    helpers.goPage('widget/select/search')
  }

}

//
