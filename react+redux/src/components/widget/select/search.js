// SearchTask.js
import React, { Component } from 'react'
import VersionHeader from 'components/widget/header/version'
import Result from './result'
import { createHashHistory } from 'history'
import utils from 'utils'
export default class SearchTask extends Component {
  constructor() {
    super()
    this.data = {
      isAllChecked: false
    }
    this.isOut = 1
  }
  /**
   * [componentWillUnmount 点击物理键返回，恢复原来的数据]
   * @method componentWillUnmount
   * @return {[type]}             [description]
   */
  componentWillUnmount(){
    const {selectResult} = this.props
    if(this.isOut === 1 && selectResult.selectData){
      this.props.receiveSelectOptions(selectResult.selectData)
    }
  }
  render() {
    const {title, selectedName, selectResult} = this.props
    let selectedLength = selectResult.searchSelectedItems && selectResult.searchSelectedItems.length
    let isAllChecked = selectedLength ? (selectedLength === selectResult.data.length) : false
    this.data.isAllChecked = isAllChecked
    return (
      <div className="mile-stone-dialog" onClick={this.stop.bind(this)}>
        <div className="dialog-confirm absolute">
          <div className="dialog-confirm-content" data-role="content" ref="dialogConfirm">
            <VersionHeader
              projectTitle={title}
              {...this.props} />
            <div className="dialog-confirm-main" data-role="main">
              <div className="dialog-confirm-message" data-role="message">
                <Result {...this.props} isAllChecked={isAllChecked}/>
              </div>
            </div>
            {selectResult.data.length > 0 ?
            <div className="dialog-confirm-foot" data-role="foot">
              <div className="dialog-confirm-confirm-box dialog-confirm-action" data-role="confirm">
                <button onClick={this.confirm.bind(this)}>确定</button>
              </div>
              <div onClick={this.checkAll.bind(this)}
                   className={isAllChecked ? 'select-all active' : 'select-all'}>
                全选（已选{selectedLength + selectedName}）
              </div>
            </div>
            : ''}
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
    if (!selectResult.searchSelectedItems || selectResult.searchSelectedItems.length === 0) {
      window.toast.setTxt('请先选择人员')
      return null
    }
    let selectResultCache = JSON.parse(utils.getStorage('w_select'))
    selectResult.data = selectResultCache.data
    selectResult.isClickCheck = true
    this.isOut = 0
    this.props.receiveSelectOptions(selectResult)
    let history = new createHashHistory()
    history.goBack()
  }
}
