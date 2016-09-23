import React, { Component } from 'react'
import TaskList from 'components/review/plugins/taskList'
import Apply from 'components/review/plugins/apply'
import ProjectHeader from 'components/widget/header/version'
import VersionHistory from 'components/version/ProjectVersionHistory'
import {consts} from 'constants'
import MileStoneReviewDescription from './MileStoneReviewDescription'
import * as helpers from 'utils/helpers'
export default class MileStoneReview extends Component {

  constructor(){
    super()
    this.state = {
      apply: false
    }
  }
  componentDidUpdate () {
    let $el = document.querySelector('.js-scroll')
    helpers.refreshTouch($el)
  }
  render() {
    const {
      applyHistory,
      projectVersionDetail,
      H5Tasks,
      fetchProjectH5VersionTasks,
      updateQueryInfo,
      versionApplyStatus,
      projectInfo,
      uid} = this.props
    let {apply} = this.state
    return (
      <div className="version-detail">
        <ProjectHeader {...this.props}
        projectTitle={'里程碑确认'}
        projectVersionDetail={projectVersionDetail}
        projectStatus={projectInfo.status}
        />

        <div className="js-scroll-panel">
          <div className="panel-group js-scroll scroll-css version-detail">
              <MileStoneReviewDescription versionDetail={projectVersionDetail} />
              <TaskList
              tasks={H5Tasks}
              detail={projectVersionDetail}
              fetchProjectH5VersionTasks={fetchProjectH5VersionTasks}
              projectStatus={projectInfo.status}
              updateQueryInfo={updateQueryInfo}/>
              {applyHistory.applyList && applyHistory.applyList.length > 0 &&
              <VersionHistory
              items={applyHistory.applyList}
              projectId={this.props.params.pid}
              versionId={this.props.params.vid}
              />}
          </div>
        </div>
        {
          !apply && versionApplyStatus.application_status === 0 && versionApplyStatus.display === true && uid &&
          <Apply {...this.props} apply={this.apply.bind(this)}/>
        }
      </div>
    )
  }
  apply(){
    this.setState({
      apply: true
    })
  }
  onUpload() {
    const { projectVersionDetail, H5Tasks, fetchProjectH5VersionTasks, updateQueryInfo } = this.props
    let page = H5Tasks.page
    let nextInfo = {
      $offset: (page - 1) * consts.PAGE_SIZE,
      $limit: consts.PAGE_SIZE,
      projectId: projectVersionDetail.project_id,
      versionId: projectVersionDetail.project_version_id
    }
    let $loading = document.querySelector('.js-scroll-loading')
    if ($loading.classList.contains('data-short')) return
    $loading.classList.remove('data-more')
    $loading.classList.add('data-loading')
    setTimeout(function(){
      fetchProjectH5VersionTasks(nextInfo, function (data) {
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

// <ProjectHeader projectDetail={projectDetail} projectTitle={'里程碑详情'}/>
