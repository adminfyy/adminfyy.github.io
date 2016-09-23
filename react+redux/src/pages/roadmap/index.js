import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from 'actions'
import * as helpers from 'utils/helpers'
import DetailHeader from 'components/widget/header/version'
import RoadMapList from 'components/roadmap/roadMapList'
import { consts } from 'constants'
@connect(state => ({roadmap: state.roadmap}), actionCreators)
export default class Roadmap extends Component {

  componentDidMount () {
    const that = this
    let projectId = this.props.params.pid
    let callback = function(){
      that.props.fetchProjectRoadMaps({
        projectId: projectId,
        $limit: consts.PAGE_SIZE_MOBILE,
        ifCountDelay: true,
        ifCountCurrent: true,
        isSearch: true
      })
    }
    callback && callback()
    helpers.refresh(function(){
      that.props.clearProjectRoadmaps()
      let $el = document.querySelector('.js-scroll')
      $el.classList.remove('data-scroll')
      callback && callback()
    })
  }

  render () {
    const {roadmap} = this.props
    if (helpers.isEmpty(roadmap)) {
      return (
        <div>
          <div className="page-loading"></div>
        </div>
      )
    } else {
      return (
        <div className="roadmap">
          <DetailHeader {...this.props}
            projectTitle="路线图"
            hideInfo="true"/>
          <RoadMapList {...this.props} />
        </div>
      )
    }
  }
}
