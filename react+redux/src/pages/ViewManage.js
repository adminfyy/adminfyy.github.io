import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import DetailHeader from 'components/widget/header/version'
import VersionsTotal from 'components/viewmanage/versionsTotal'
import WeekScore from 'components/viewmanage/weekScore'
import ProjectStatistics from 'components/viewmanage/projectStatistics'
import * as helpers from 'utils/helpers'

@connect(state => ({
  stats: state.stats,
  versionsTotal: state.versionsTotal,
  weeklyScore: state.weeklyScore,
  versionStandard: state.versionStandard
}), actionCreators)
export default class ViewManage extends Component {
  componentDidMount() {
    const that = this
    let callback = function(){
      that.props.fetchProjectsStatistic()
      that.props.fetchVersionsTotal()
      that.props.fetchWeeklyScore()
      that.props.fetchVersionStandard()
    }
    callback && callback()
    helpers.refresh(callback)
  }
  componentDidUpdate () {
    let $el = document.querySelector('.view-wrap')
    helpers.refreshTouch($el)
  }
  render() {
    const {stats, versionStandard} = this.props

    if (helpers.isEmpty(versionStandard) || helpers.isEmpty(stats)) {
      return (
        <div>
          <div className="page-loading"></div>
        </div>
      )
    } else {
      return (
        <div className="view-wrap">
          <DetailHeader {...this.props}
            projectTitle={'统计视图'}
            backUrl={`/`}
            hideInfo={'true'} />
          <ProjectStatistics {...this.props} />
          <VersionsTotal {...this.props} />
          <WeekScore {...this.props} />
        </div>
      )
    }
  }
}
