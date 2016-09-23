import React, { Component } from 'react'
import ProjectVersionCard from 'components/versions/ProjectVersionCard'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
import * as helpers from '../../../utils/helpers'
import utils from 'utils'

export default class ProjectVersionMode extends Component {
  componentDidUpdate(){
    const {parentState, type, curTab} = this.props
    let $jsScroll = document.querySelector('.js-scroll')
    if (curTab === type){
      if ($jsScroll){
        if (parentState[curTab + 'More']){
          helpers.ScrollResize(60)
        }
      }
    }
  }

  render() {
    const { projectVersions, projectId, modeTitle, type, parentState, isDetail, curTab, roles } = this.props
    // 是否滚动
    let jsScroll = ''
    // 点击里程碑tab显示，其他的隐藏
    let mActive = 'hidden'
    // 动画效果，旋转180reg
    let rotateCss = ''
    // 点击查看更多，滚动加载 height = 100% , overflow-y = auto
    let curTabMore = parentState[curTab + 'More']
    let moreHidden = ''
    if (curTab === type){
      mActive = 'm-active'
      rotateCss = 'rotate180'
      if (curTabMore){
        jsScroll = 'js-scroll'
        moreHidden = ' scroll-css'
      }
    } else if (curTabMore){
      moreHidden = 'hidden'
    }
    if (curTab === 'none'){
      moreHidden = ''
    }
    let items = []
    let rows = 2
    let isActionHide = false
    if (type === 'done') {
      rows = 1
      isActionHide = true
    }
    if (projectVersions && projectVersions.items) {
      items = projectVersions.items
    }
    if (!projectVersions || !projectVersions.items) {
      return (<div>
        <div className="page-loading"></div>
      </div>)
    }
    return (
      <div className={jsScroll + moreHidden} onScroll={this.scrollForLoad.bind(this)}>
        <div className="list-table">
          <div className="list-cell m-tag" onClick={this.props.handlerChangeMile.bind(this, type)}>
            <div className="list-line"></div>
            <div className={'m-img-' + type + ' ' + rotateCss}></div>
          </div>
          <div className="list-cell s-title" onClick={this.props.handlerChangeMile.bind(this, type)}>
            {modeTitle}
          </div>
          { isDetail === '' || type === 'cur'
        ? <div className="list-cell list-btn" onClick={this.handlerAddMile.bind(this)}>
            <div className="btn-create">
              创建
            </div>
          </div>
        : ''
          }
        </div>
        <div className={'js-m-content ' + mActive}>
        <div className="project-version-group">
        { items.length > 0 && items.map((version, i) =>
          <ProjectVersionCard key={ `${version.project_version_id}${type}${i}` }
                              type={type}
                              projectVersionDetail={version} projectId={ projectId }
                              rows={rows}
                              curTabMore={curTabMore}
                              isActionHide={isActionHide}
                              projectDetail={this.props.projectDetail}
                              permission={roles}/>
        )}
        </div>
        <div className="list-table" ref="more">
          <div className="list-cell m-tag">
            <div className="list-line"></div>
          </div>
          <div className="list-cell btn-more-label">
            <RefreshStatus hidden={curTabMore ? '' : ' hidden'}
              total={projectVersions.count}
              length={projectVersions.items.length}
              key={projectVersions.items.length} />
            { !curTabMore && projectVersions.count === 0 ? '未找到相关数据' : (curTabMore ? '' : (projectVersions.count > 3
            ? <div className="btn-primary" onClick={this.props.handlerMoreMile.bind(this, type)}>查看更多</div>
          : ''))
            }
          </div>
        </div>
        </div>
      </div>
    )
  }
  handlerAddMile(){
    const {projectDetail} = this.props
    this.props.clearProjectVersionDetail()
    this.props.clearSelectedVersions()
    utils.setStorage('step', '1')
    setTimeout(function() {
      helpers.goPage(`/addmilestone/${projectDetail.project_info.project_id}`)
    }, 300)
  }

  scrollForLoad(){
    const {parentState, type, curTab} = this.props
    let $jsScroll = document.querySelector('.js-scroll')
    if (curTab === type){
      if ($jsScroll){
        if (parentState[curTab + 'More']){
          helpers.Scroll({fnCallback: this.props.onUpload}, 30)
        }
      }
    }
  }
}
