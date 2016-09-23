import React, { Component } from 'react'
import { consts } from 'constants'
import * as helpers from '../../utils/helpers'
import ProjectHeader from 'components/widget/header'
import ProjectVersionMode from 'components/versions/widget/ProjectVersionMode'
import SearchScroll from 'components/widget/search/SearchScroll'
const defautOffset = 3
let isSearch = false
export default
class ProjectVersion extends Component {
  constructor(props){
    super()
    this.state = ({
      curTab: 'cur',
      curMore: false,
      undoMore: false,
      doneMore: false,
      isSearch: false
    })
  }
  componentWillUnmount() {
    window.toast.hide()
  }

  componentDidMount() {
    const { projectDetail, projectCurVersions, projectUndoVersions } = this.props
    let projectId = projectDetail.project_info.project_id
  //  let isProjectAdmin = helpers.checkPermission(consts.PERMISSION_TYPE.subadmin, projectId, permission)
    let curCount = 0
    let undoCount = 0
    curCount = projectCurVersions.count || 0
    undoCount = projectUndoVersions.count || 0
    let versionNum = curCount + undoCount
    if (+versionNum < 2) {
      window.toast.setProps({
        icon: 'tip-warn',
        closeAction: true,
        link: { to: '/addmilestone/' + projectId, value: '' },
        text: '当前项目的里程碑数量<2个,请及时添加。',
        timeOut: -1,
        isShow: true
      })
    }
  }

  render() {
    const { projectDetail, projectCurVersions, projectUndoVersions, projectDoneVersions, VersionActiveTab } = this.props
    let projectId = projectDetail.project_info.project_id
    const state = this.state
    let curTab = VersionActiveTab.activeTab || 'cur'
    // 是否详情页，true ： 1.显示搜索框、2.js-milestone的overflow-y为空、3.显示创建
    let isDetail = (curTab === 'cur' && state.curMore) ||
                    (curTab === 'undo' && state.undoMore) ||
                    (curTab === 'done' && state.doneMore) ? '' : 'overflow-y'

    let modeArray = [
      { projectVersions: projectCurVersions, modeTitle: '当前里程碑', projectId: projectId, type: 'cur' },
      { projectVersions: projectUndoVersions, modeTitle: '未来里程碑', projectId: projectId, type: 'undo' },
      { projectVersions: projectDoneVersions, modeTitle: '已结束里程碑', projectId: projectId, type: 'done' }
    ]
    let style1 = {
      height: '110px'
    }
    return (
      <div className={'project-version-list js-milestone ' + isDetail}>
        <ProjectHeader {...this.props}
          projectDetail={projectDetail}
          projectTitle={'里程碑'}
          backUrl="/"
           />
        {isDetail ? '' : <SearchScroll search={this.onSearch.bind(this, curTab)}/>}
        { modeArray.map(mode =>
          <ProjectVersionMode
            {...this.props}
            handlerChangeMile={this.handlerChangeMile.bind(this)}
            handlerMoreMile={this.handlerMoreMile.bind(this)}
            onUpload={this.onUpload.bind(this, curTab)}
            isDetail={isDetail}
            curTab={curTab}
            parentState={state} key={mode.type} {...mode}
            projectDetail={projectDetail} />
        )}
        <div style={style1}></div>
    </div>
    )
  }
  search(type, keyword, isFirst) {
    const {projectCurVersions, projectUndoVersions, projectDoneVersions} = this.props
    let data
    let versionTimeType
    if (type === 'cur'){
      data = projectCurVersions
      versionTimeType = consts.Milestone.cur
    } else if (type === 'undo'){
      data = projectUndoVersions
      versionTimeType = consts.Milestone.undo
    } else {
      data = projectDoneVersions
      versionTimeType = consts.Milestone.done
    }
    let page = data.page
    let queryInfo = {}
    queryInfo.key = keyword
    if (isFirst !== 3){
      queryInfo.$offset = 0
    } else {
      queryInfo.$offset = page * consts.PROJECT_VERSIONS_LIMIT + (isSearch ? 0 : defautOffset)
    }
    queryInfo.$limit = consts.PROJECT_VERSIONS_LIMIT
    queryInfo.versionTimeType = versionTimeType
    queryInfo.projectId = this.props.params.id
    queryInfo.isSearch = isFirst === 1 ? isSearch : false
    queryInfo.isCancel = isFirst === 2
    return queryInfo
  }
  onSearch(type, keyword, isFirst){
    // 点取消后，scroll = 0
    let $loadScroll = document.querySelector('.js-scroll')
    if($loadScroll){
      document.querySelector('.js-scroll').scrollTop = 0
    }
    const { fetchProjectVersions, updateQueryInfo } = this.props
    isSearch = true
    $loadScroll.classList.remove('data-scroll')
    let queryInfo = this.search(type, keyword, isFirst)
    let nextInfo = { ...queryInfo }
    fetchProjectVersions(nextInfo)
    updateQueryInfo(nextInfo)
  }
  onUpload(type, keyword) {
    const { fetchProjectVersions, updateQueryInfo } = this.props
    let queryInfo = this.search(type, keyword, 3)
    let nextInfo = { ...queryInfo }
    let $loadScroll = document.querySelector('.js-scroll')
    let $loading = $loadScroll.querySelector('.js-scroll-loading')
    if ($loading.classList.contains('data-short')) return
    $loading.classList.remove('data-more')
    $loading.classList.add('data-loading')
    setTimeout(function () {
      fetchProjectVersions(nextInfo, function(data) {
        let list = data && data.items
        let len = list.length
        $loading.classList.remove('data-loading')
        $loadScroll.classList.remove('data-scroll')
        if (!len) {
          $loading.classList.add('data-short')
        }
      })
    }, 500)
    updateQueryInfo(nextInfo)
  }
/**
 * [handlerChangeMile 点击收缩、展开里程碑]
 * 缓存中的里程碑tab === 点击的tab，收缩
 * 缓存中的里程碑tab ！== 点击的tab，展开
 * @method handlerChangeMile
 * @param  {[type]}          type [缓存的当前里程碑]
 * @param  {[type]}          e    [description]
 * @return {[type]}               [description]
 */
  handlerChangeMile(type, e){
    if (this.state.curTab === type) {
      this.setState({
        curTab: 'none'
      })
      this.props.updateVersionsTab('none')
      document.querySelector('.js-scroll').style.height = 'auto'
    } else {
      this.setState({
        curTab: type
      })
      let versionTimeType
      if (type === 'cur'){
        versionTimeType = consts.Milestone.cur
      } else if (type === 'undo'){
        versionTimeType = consts.Milestone.undo
      } else {
        versionTimeType = consts.Milestone.done
      }
      this.props.updateVersionsTab(type)
      if (this.state[type + 'More']){
        this.props.fetchProjectVersions({projectId: this.props.params.id, versionTimeType: versionTimeType, $offset: 0, $limit: 10, isSearch: true})
      }
    }
  }
  /**
   * [handlerMoreMile 点击更多，加载页面]
   * @method handlerMoreMile
   * @param  {[type]}        type [description]
   * @param  {[type]}        e    [description]
   * @return {[type]}             [description]
   */
  handlerMoreMile(type, e){
    let versionTimeType
    if (type === 'cur'){
      this.setState({
        curMore: true
      })
      versionTimeType = consts.Milestone.cur
    } else if (type === 'undo'){
      this.setState({
        undoMore: true
      })
      versionTimeType = consts.Milestone.undo
    } else {
      this.setState({
        doneMore: true
      })
      versionTimeType = consts.Milestone.done
    }
    this.props.fetchProjectVersions({projectId: this.props.params.id, versionTimeType: versionTimeType, $offset: defautOffset})
    helpers.Scroll({ fnCallback: this.onUpload.bind(this, type) })
  }
}
