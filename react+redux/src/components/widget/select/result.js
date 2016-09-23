// TaskResult.js
import React, { Component } from 'react'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import Item from './item'
import * as helpers from 'utils/helpers'
import {ScrollResize} from 'utils/helpers'
export default class TaskResult extends Component {
  componentDidMount() {
    let $el = document.querySelector('.js-scroll')
    helpers.refreshTouch($el)
  }
  render() {
    const { selectResult, isShowTitle, subTitle } = this.props
    const data = selectResult.data
    let total = selectResult.total
    let scrollHeight = 180
    if(selectResult.isSearch){
      scrollHeight = 90
    }
    return (
      <div className="milestone-result" ref="scroll-parent">
        {isShowTitle === 'noShowTitle'
          ? ''
          : <div className="result-title">{subTitle}</div>
        }
        { (data && data.length > 0)
          ? <ul className="milestone-list js-scroll scroll-css" onLoad={ScrollResize(scrollHeight)}>
            {data.map((item, key) =>
              <Item selectItem={item}
                {...this.props}
                onUpload={this.onUpload.bind(this)}
                key={'select' + key} />
            )}
            <RefreshStatus key={data.length + total} length={data.length} total={total}/>
          </ul>
          : <div className="no-result">
            <div className="search-image"></div>
            <div className="txt-center">{this.props.tip}</div>
          </div>
        }
      </div>
    )
  }
  onUpload() {
    const {projectId, searchProjectNoVersionTasks, updateQueryInfo, projectNoVersionTasks, taskcodes, removeTask} = this.props
    let keywordVal = document.querySelector('.js-keyword') && document.querySelector('.js-keyword').value
    let keyword = keywordVal && keywordVal.trim()
    let nextInfo = {
      projectId: projectId,
      $offset: projectNoVersionTasks.page * 10,
      isSearch: false
    }
    let filter = ''
    if (keyword){
      filter = 'title like ' + keyword
      if (taskcodes){
        filter += ' and taskcode nin ' + taskcodes
      }
    } else if (taskcodes){
      filter += 'taskcode nin ' + taskcodes
    }
    nextInfo.$filter = filter
    let $loading = document.querySelector('.js-scroll-loading')
    if ($loading.classList.contains('data-short')) return
    $loading.classList.remove('data-more')
    $loading.classList.add('data-loading')
    setTimeout(function(){
      let task = []
      if(!helpers.isEmpty(removeTask)){
        task = removeTask
      }
      searchProjectNoVersionTasks(nextInfo, task, function (data) {
        let list = data && data.items
        let len = list.length
        $loading.classList.remove('data-loading')
        if (!len) {
          $loading.classList.add('data-short')
        }
      })
    }, 500)
    updateQueryInfo(nextInfo)
  }
}
