import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from 'actions'
import * as helpers from 'utils/helpers'
import DetailHeader from 'components/widget/header/version'
import MilePostList from 'components/milepost/milepostList'
import { consts } from 'constants'
@connect(state => ({milepost: state.milepost, currentMilepost: state.currentMilepost}), actionCreators)

export default class milepost extends Component {
    componentDidMount () {
      const that = this
      let projectId = this.props.params.pid
      let callback = function () {
        that.props.fetchProjectMilepost({
          projectId: projectId,
          $limit: consts.PAGE_SIZE_MOBILE,
          ifCountDelay: true,
          ifCountCurrent: true,
          isSearch: true
        })
      }
      callback && callback()
      helpers.refresh(function () {
        that.props.clearProjectMilePost()
        let $el = document.querySelector('.js-scroll')
        $el.classList.remove('data-scroll')
        callback && callback()
      })
    }
    render () {
      const {milepost, currentMilepost} = this.props
      if (helpers.isEmpty(milepost) || !currentMilepost) {
        return (
          <div>
            <div className="page-loading"></div>
          </div>
        )
      } else {
        return (
          <div className="roadmap">
            <DetailHeader {...this.props}
              projectTitle="里程碑"
              hideInfo="true"/>
            <MilePostList {...this.props} />
          </div>
        )
      }
    }

}
