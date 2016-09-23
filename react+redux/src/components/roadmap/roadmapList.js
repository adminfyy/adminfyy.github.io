import React, { Component } from 'react'
import Card from './roadmapCard'
import { consts } from 'constants'
import {ScrollResize, Scroll} from 'utils/helpers'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
class RoadmapList extends Component {
  render () {
    const {roadmap} = this.props
    let timeout = roadmap.timeout
    let timeoutTip = ''
    let show = false
    if(roadmap.count_current === 0){
      if(typeof timeout === 'undefined'){
        timeoutTip = '无当前路线图，请尽快提交或确认审核状态'
        show = true
      } else if(timeout > 0){
        timeoutTip = '已超期' + timeout + '天，超期90天将强制释放开发人员，请尽快提交或确认审核状态'
        show = true
      }
    }
    return (
      <div className="roadmap-list js-scroll scroll-css"
      onLoad={ScrollResize()} onScroll={this.scrollForLoad.bind(this)}>
        { show &&
          <div className="no-current-roadmap">
            <div className="roadmap-image"></div>
            <div className="roadmap-desc">
              <div className="t-title">无当前路线图</div>
              {timeoutTip && <div className="t-tip">{timeoutTip}</div>}
            </div>
          </div>
        }
        {roadmap.items.map((item, i) =>
        <Card key={ 'roadmap-' + i} roadmap={item}/>
        )}
        {roadmap.count > 0 &&
          <RefreshStatus length={roadmap.items.length} total={roadmap.count} key={roadmap.items.length}/> }
      </div>
    )
  }
  scrollForLoad(){
    Scroll({fnCallback: this.onUpload.bind(this)})
  }
  search() {
    const { roadmap } = this.props
    let page = roadmap.page
    let queryInfo = {
      ifCountDelay: true,
      ifCountCurrent: true
    }
    queryInfo.projectId = this.props.params.pid
    queryInfo.$limit = consts.PAGE_SIZE_MOBILE
    queryInfo.$offset = page * consts.PAGE_SIZE_MOBILE
    queryInfo.isSearch = false
    return queryInfo
  }
  /**
   * [onUpload 滚动加载更新,加载状态参考scroll--refreshStatus]
   * @method onUpload
   * @return {[type]} [description]
   */
  onUpload() {
    const { fetchProjectRoadMaps } = this.props
    let queryInfo = this.search()
    let nextInfo = {...queryInfo}
    let $loading = document.querySelector('.js-scroll-loading')
    let $el = document.querySelector('.js-scroll')
    if ($loading.classList.contains('data-short')) return
    $loading.classList.remove('data-more')
    $loading.classList.add('data-loading')
    setTimeout(function () {
      fetchProjectRoadMaps(nextInfo, function (data) {
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

export default RoadmapList
