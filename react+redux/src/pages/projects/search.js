/**
 * 首页的项目搜索页面
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import * as utils from 'utils'
import * as helpers from 'utils/helpers'
import { consts } from 'constants'
import SearchComponent from 'components/widget/search/SearchScroll'
import KeysHistory from 'components/projects/search/keysHistory'
import ProjectCard from 'components/projects/ProjectCard'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import {Scroll, ScrollResize} from 'utils/helpers'

@connect(state => ({
  searchProjects: state.searchProjects
}), actionCreators)

export default class extends Component {
constructor(){
  super()
  this.state = {
    searchKeysHistory: this.getKeysHistory()
  }
}
componentDidMount() {
  helpers.refresh()
}
componentDidUpdate() {
  let $el = document.querySelector('.js-scroll')
  helpers.refreshTouch($el)
//  Scroll({fnCallback: this.onUpload.bind(this)})
}
// 缓存搜索关键词的key
getKey(){
  return helpers.getUid() + '-search-keys'
}
// 获取缓存的历史记录
getKeysHistory(){
  const key = this.getKey()
  return utils.getStorage(key) && utils.getStorage(key).split(',') || []
}

 // 普通的搜索功能
 search(value) {
   this.setState({
     isSearching: true
   })
   this.props.fetchProjects({init: true, keyword: value, isSearch: true, subscribe: 0, $limit: consts.PAGE_SIZE_MOBILE})
     // 缓存关键词
   const key = this.getKey()
   let arr = this.getKeysHistory()
   const index = arr.indexOf(value)
   index === -1 ? arr.unshift(value) && arr.length > 10 && arr.pop() : arr.splice(index, 1) && arr.unshift(value)
   utils.setStorage(key, arr.join(','))
   this.setState({
     searchKeysHistory: arr
   })
 }
   // 历史关键词搜索
 immediateSearch(val) {
   this.refs.searchCmp.immediateSearch(val)
 }

  render() {
    // 搜索的历史记录列表
    const {searchKeysHistory} = this.state
    const {searchProjects} = this.props
    return (
      <div className="projects-search-page">
         <SearchComponent
         placeholder="输入项目名称"
         errorPlacehoder="请输入项目名称"
         hasBack="true"
         hasClear="true"
         classPrefix="projects-search"
         isSearch="true"
         search={this.search.bind(this)}
         ref="searchCmp"
         clearCallback={() => {
           this.setState({isSearching: false})
           this.props.clearSearchProjects()
         }}
         />
         <div className="projects-search-content">
         {
           this.state.isSearching
           ? (searchProjects && typeof searchProjects.items !== 'undefined'
             ? <div>
              <div className="search-tips">{`${searchProjects.items.length ? '' : '没有找到'}含有`} “<span className="search-key">{this.refs.searchCmp.getInputValue()}</span>” 的项目</div>
              <div className="js-scroll-panel panel-group js-scroll scroll-css"
                  onLoad={ScrollResize()}
                  onScroll={this.scrollForUpload.bind(this)}
                  >
               {searchProjects.items.map((project, i) =>
                 <ProjectCard key={ 'projecstList-' + project.project_info.project_id + i}
                              project={project}
                              noAction />
               )}
               <RefreshStatus length={searchProjects.items.length}
                total={searchProjects.count}
                key={searchProjects.items.length}
                tip="换个关键词看看吧~" />
                </div>
            </div>
             : <div className="page-loading"></div>)
             : <KeysHistory
              searchKeys={searchKeysHistory}
              search={this.immediateSearch.bind(this)}
              getKey={this.getKey.bind(this)}
             />
         }
         </div>
     </div>
    )
  }

  getInfo() {
    const { searchProjects } = this.props
    let page = searchProjects.page
    let queryInfo = {}
    queryInfo.isSearch = true
    queryInfo.keyword = searchProjects.keyword
    queryInfo.$offset = page * consts.PAGE_SIZE_MOBILE

    return queryInfo
  }

  scrollForUpload(){
    Scroll({fnCallback: this.onUpload.bind(this)})
  }

  /**
   * [onUpload 滚动加载更新,加载状态参考scroll--refreshStatus]
   * @method onUpload
   * @return {[type]} [description]
   */
  onUpload() {
    const { fetchProjects, updateQueryInfo } = this.props
    let queryInfo = this.getInfo()
    let nextInfo = {...queryInfo}
    let $loading = document.querySelector('.js-scroll-loading')
    let $el = document.querySelector('.js-scroll')
    if ($loading.classList.contains('data-short')) return
    $loading.classList.remove('data-more')
    $loading.classList.add('data-loading')
    updateQueryInfo(nextInfo)
    setTimeout(function () {
      fetchProjects(nextInfo, function (data) {
        let list = data && data.items
        let len = list.length
        $loading.classList.remove('data-loading')
        $el.classList.remove('data-scroll')
        if (!len) {
          $loading.classList.add('data-short')
        }
      })
    }, 500)
  }

}
