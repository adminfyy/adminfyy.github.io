import React, { Component } from 'react'
import ProjectItem from 'components/open/ProjectItem'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import { consts } from 'constants'
import {ScrollResize, Scroll} from 'utils/helpers'

export default class ProjectList extends Component {

  componentDidMount(){
  }

  render() {
    const {projectsAll} = this.props

    return (
      <ul className="js-scroll"
        onLoad={ScrollResize(110)}
        onScroll={this.scrollForLoad.bind(this)}>
        {
          projectsAll.items && projectsAll.items.map(project =>
            <ProjectItem {...this.props}
              project={project}
              onUpload={this.onUpload.bind(this)} />
          )
        }
        {
          projectsAll.items &&
          <RefreshStatus length={projectsAll.items.length}
           total={projectsAll.count} />
        }

      </ul>
    )
  }
  scrollForLoad(){
    Scroll({fnCallback: this.onUpload.bind(this)})
  }

  search() {
    const data = this.props.projectsAll
    let page = data.page
    let queryInfo = {}
    queryInfo.filter = data.keyword
    queryInfo.offset = page * consts.PAGE_SIZE
    return queryInfo
  }

  /**
   * [onUpload 滚动加载更新,加载状态参考scroll--refreshStatus]
   * @method onUpload
   * @return {[type]} [description]
   */
  onUpload() {
    const {fetchProjectsAll, updateQueryInfo} = this.props

    let queryInfo = this.search()

    let nextInfo = {...queryInfo}
    let $loading = document.querySelector('.js-scroll-loading')
    if ($loading.classList.contains('data-short')) return
    $loading.classList.remove('data-more')
    $loading.classList.add('data-loading')
    updateQueryInfo(nextInfo)
    setTimeout(function () {
      fetchProjectsAll(nextInfo, function (data) {
        let list = data && data.items
        let len = list.length
        $loading.classList.remove('data-loading')
        if (!len) {
          $loading.classList.add('data-short')
        }
      })
    }, 500)
  }

}
