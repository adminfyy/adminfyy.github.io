import React, { Component } from 'react'
import { consts } from 'constants'
import {ScrollResize, Scroll} from 'utils/helpers'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import Card from './milepostCard'
export default class MilePostList extends Component {
  render () {
    const {milepost} = this.props
    let timeoutTitle = ''
    let timeoutTip = ''
    let show = false
    if(milepost.count_current === 0){
      timeoutTitle = '无当前里程碑'
      timeoutTip = '无当前里程碑，请尽快提交或确认审核状态'
      show = true
    }
    return (
      <div className="roadmap-list js-scroll scroll-css"
      onLoad={ScrollResize()} onScroll={this.scrollForLoad.bind(this)}>
        { show &&
          <div className="no-current-roadmap">
            <div className="roadmap-image"></div>
            <div className="roadmap-desc">
              <div className="t-title">{timeoutTitle}</div>
              <div className="t-tip">{timeoutTip}</div>
            </div>
          </div>
        }
        {milepost.items.map((item, i) =>
        <Card key={ 'milepost-' + i} milepost={item}/>
        )}
        {milepost.count > 0 &&
           <RefreshStatus length={milepost.items.length} total={milepost.count} key={milepost.count}/>}

      </div>
    )
  }
  scrollForLoad(){
    Scroll({fnCallback: this.onUpload.bind(this)})
  }
  search() {
    const { milepost } = this.props
    let page = milepost.page
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
    const { fetchProjectMilepost } = this.props
    let queryInfo = this.search()
    let nextInfo = {...queryInfo}
    let $loading = document.querySelector('.js-scroll-loading')
    let $el = document.querySelector('.js-scroll')
    if ($loading.classList.contains('data-short')) return
    $loading.classList.remove('data-more')
    $loading.classList.add('data-loading')
    //updateQueryInfo(nextInfo)
    setTimeout(function () {
      fetchProjectMilepost(nextInfo, function (data) {
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
