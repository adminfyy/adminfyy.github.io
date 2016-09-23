import React, { Component } from 'react'
import BannerSearch from './widget/search'
import BannerTab from './widget/tab'
import { consts } from 'constants'
import BannerTotal from './widget/total'

export default class Banner extends Component {

  constructor(props) {
    super(props)
  }

  getSearchComponent(){
    return this.refs.bannerSearch
  }

  // 对外提供的接口
  getClearFunction(tab) {
    switch (tab) {
      case consts.SUBSCRIBE:
        return this.props.clearSubProjects
      case consts.PROJECTS:
        return this.props.clearProjects
      case consts.PROJECT_NORMAL:
        return this.props.clearNormalProjects
      case consts.PROJECT_WARN:
        return this.props.clearWarnProjects
      case consts.PROJECT_ERROR:
        return this.props.clearErrorProjects
      default:
        return null
    }
  }


  render() {
    // 1 normal 2warn 3error 4follow
    return (
      <div className="projectListHeader-default">
        <BannerSearch {...this.props}
          ref="bannerSearch"
          getClearFunction={this.getClearFunction.bind(this)}/>
        <BannerTotal {...this.props}/>

        <BannerTab {...this.props}
          searchComponent={this.getSearchComponent.bind(this)}
          getClearFunction={this.getClearFunction.bind(this)}
        />

      </div>
    )
  }
}
