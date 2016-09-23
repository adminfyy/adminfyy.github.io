import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import ProjectHeader from 'components/widget/header/version'
import Tab from 'components/widget/tab/default/index'
import VersionStatistic from 'components/statistic/rsVersion'
import * as consts from 'constants/const'
import * as helpers from 'utils/helpers'

@connect(state => ({
  rsVersionStat: state.rsVersionStat,
  misc: state.misc,
  roles: state.roles
}), actionCreators)
export default
class weeklyReportStatisticPage extends Component {
  constructor(props){
    super(props)
    this.tabDefault = {
      tabValue: [ '达标项目', '未达标项目' ],
      isAverage: true,
      handleFunction: this.tabCallback.bind(this)
    }
    this.projectHeaderArguments = {
      projectTitle: '项目里程碑达标统计',
      isGoBack: true,
      noinfo: true,
      hideInfo: true
    }
  }
  componentWillMount() {
    if (typeof this.props.roles.items === 'undefined'){
      this.props.fetchUCUserRoles()
    }
    this.props.fetchReachStandardVersionStatistic(
      {...this.setQuery(this.props.misc.filter)}
      , null, true)
  }
  componentWillUnmount(){
    this.props.cleanReachStandardVersionStatistic()
  }
  render(){
    const { rsVersionStat, misc, roles } = this.props
    let clickable = helpers.checkPermission(consts.PERMISSION_TYPE.editVersion, null, roles)
    return (
      <div>
        <ProjectHeader {...this.projectHeaderArguments}/>
        <Tab options={{...this.tabDefault, isActive: misc.filter}}/>
        <VersionStatistic onUpload={this.onUpload.bind(this)} data={rsVersionStat} isActive={misc.filter} clickable={clickable}/>
      </div>
    )
  }

  tabCallback(level){
    this.props.updateFilter(level)
    this.props.cleanReachStandardVersionStatistic()
    let that = this
    setTimeout(() => (
      that.props.fetchReachStandardVersionStatistic({...that.setQuery(level)}, null, true)
    ), 150)
  }

  setQuery(level){
    return {
      $filter: this.setFilter(level),
      $orderby: this.setOrderby(level),
      $limit: consts.PAGE_SIZE_MOBILE,
      $count: true
    }
  }

  /**
   * [setFilter description]
   * @method setFilter
   * @param  {[type]}
   */
  setFilter(level){
    let filterStr = ''
    switch (level) {
      case 0:
        filterStr = 'future_verifying_version_amount ge 2'
        break
      case 1:
        filterStr = 'future_verifying_version_amount lt 2'
        break
      default:
        filterStr = 'future_verifying_version_amount ge 2'
        break
    }
    return filterStr
  }

  setOrderby(index){
    let OrderBy = ''
    switch (index) {
      case 0:
        OrderBy = 'future_verifying_version_amount DESC'
        break
      case 1:
        OrderBy = 'annual_not_standard_times DESC'
        break
      default:
        OrderBy = 'future_verifying_version_amount DESC'
        break
    }
    return OrderBy
  }

    getNextQuery(query, rsVersionStat){
      return {
        ...query,
        $offset: rsVersionStat.page * query.$limit
      }
    }

    onUpload(){
      const {fetchReachStandardVersionStatistic, rsVersionStat, misc} = this.props
      let Querys = {...this.setQuery(misc.filter)}
      let nextInfo = this.getNextQuery(Querys, rsVersionStat)
      let $loading = document.querySelector('.js-scroll-loading')
      let $el = document.querySelector('.js-scroll')
      if ($loading.classList.contains('data-short')) return
      $loading.classList.remove('data-more')
      $loading.classList.add('data-loading')
      setTimeout(function () {
        fetchReachStandardVersionStatistic(nextInfo, function (data) {
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
