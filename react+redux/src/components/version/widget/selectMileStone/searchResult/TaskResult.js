// TaskResult.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import TaskItem from 'components/version/widget/selectMileStone/searchResult/TaskItem'
import * as helpers from '../../../../../utils/helpers'
@connect(state => ({projectNoVersionTasks: state.projectNoVersionTasks}), actionCreators)
export default class TaskResult extends Component {
  render() {
    const { projectNoVersionTasks, isShowTitle } = this.props
    return (
      <div className="milestone-result" ref="scroll-parent">
        {isShowTitle === 'noShowTitle'
          ? ''
          : <div className="result-title">未分配文档列表</div>
        }
        { (projectNoVersionTasks.items && projectNoVersionTasks.items.length > 0)
          ? <ul className="milestone-list js-scroll" onLoad={helpers.ScrollResize(136)} onScroll={helpers.Scroll.bind(this, {fnCallback: this.onUpload.bind(this)})}
          tabIndex="-1" id="milestone-list">
            {projectNoVersionTasks.items.map(item =>
              <TaskItem {...item}
                {...this.props}
                key={item.taskcode} />
            )}
            <RefreshStatus total={projectNoVersionTasks.count} length={projectNoVersionTasks.items.length} key={projectNoVersionTasks.items.length}/>
          </ul>
        : <div >{projectNoVersionTasks.isSearch
          ? <div className="no-doc">
              <div className="txt-center">没有搜索到数据</div>
            </div>
            : <div className="no-doc">
              <div className="txt-center">暂无未分配的文档</div>
            </div>}
          </div>
        }
      </div>
    )
  }
  onUpload() {
    const { projectId, searchProjectNoVersionTasks, updateQueryInfo, projectNoVersionTasks, taskcodes, removeTask } = this.props
    let keywordVal = document.querySelector('.js-keyword') && document.querySelector('.js-keyword').value
    let keyword = keywordVal && keywordVal.trim()
    let nextInfo = {
      projectId: projectId,
      $offset: projectNoVersionTasks.items.length,
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
    let $el = document.querySelector('.js-scroll')
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
        $el.classList.remove('data-scroll')
        if (!len) {
          $loading.classList.add('data-short')
        }
      })
    }, 500)
    updateQueryInfo(nextInfo)
  }
}
