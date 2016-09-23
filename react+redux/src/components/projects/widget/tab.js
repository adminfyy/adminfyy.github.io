import React, { Component } from 'react'
import { consts } from 'constants'
export default class BannerTab extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: props.tab
    }

    this.data = {
      [consts.SUBSCRIBE + 'Index']: 0,
      [consts.PROJECTS + 'Index']: 1,
      [consts.PROJECT_NORMAL + 'Index']: 0,
      [consts.PROJECT_WARN + 'Index']: 0,
      [consts.PROJECT_ERROR + 'Index']: 0
    }

    /* 以下解决：
     *先搜索数据为空，然后点击新增项目，再返回。应该要获取全部数据而不是搜索后的数据结果
     * */
    if (this.state.active === consts.PROJECTS && this.props.projects.isSearch) {
      this.projects()
    } else if (this.state.active === consts.SUBSCRIBE && this.props.subProjects.isSearch) {
      this.commonTabHandler(consts.SUBSCRIBE)
    } else if (this.state.active === consts.PROJECT_NORMAL && this.props.normalProjects.isSearch) {
      this.commonTabHandler(consts.PROJECT_NORMAL)
    } else if (this.state.active === consts.PROJECT_WARN && this.props.warnProjects.isSearch) {
      this.commonTabHandler(consts.PROJECT_WARN)
    } else if (this.state.active === consts.PROJECT_ERROR && this.props.errorProjects.isSearch) {
      this.commonTabHandler(consts.PROJECT_ERROR)
    }
  }


  render() {
    let { active } = this.state
    let {stats} = this.props

    return (
      <div>
        <div className="project-filter">
          <div
            className={active === consts.PROJECT_NORMAL ? 'filter-normal active' : 'filter-normal'}
            onClick={this.commonTabHandler.bind(this, consts.PROJECT_NORMAL)}
          >
            <div className="filter-label">{stats.normal_count}</div>
          </div>
          <div className={active === consts.PROJECT_WARN ? 'filter-warn active' : 'filter-warn'}
               onClick={this.commonTabHandler.bind(this, consts.PROJECT_WARN)}
          >
            <div className="filter-label">{stats.warning_count}</div>
          </div>
          <div className={active === consts.PROJECT_ERROR ? 'filter-error active' : 'filter-error'}
               onClick={this.commonTabHandler.bind(this, consts.PROJECT_ERROR)}
          >
            <div className="filter-label">{stats.abnormal_count}</div>
          </div>
          <div
            className={active === consts.SUBSCRIBE ? 'filter-follow active' : 'filter-follow'}
            onClick={this.commonTabHandler.bind(this, consts.SUBSCRIBE)}
          >
            <div className="filter-label">{stats.subscribed_count}</div>
          </div>
          {active !== consts.PROJECTS &&
          <div className="filter-all" onClick={this.projects.bind(this)}>查看<br/>全部</div>}
        </div>

      </div>


    )
  }


  // 添加active样式
  addActive(tab) {
    let index = tab + 'Index'
    this.setState({
      active: tab
    })
    this.data[index] = this.data[index] + 1
  }


  /*
   * 每个tab的公共部分提取
   * tab是每个标签页
   * isSubscribe为true标识是选择了关注的tab
   */
  commonTabHandler(tab) {
    const {fetchProjects, updateProjectsTab, searchComponent, getClearFunction, refresh} = this.props
    let that = this

    that.search = false
    const searchCmp = searchComponent()
    const isSubscribe = tab === consts.SUBSCRIBE

    if (isSubscribe ? (refresh && refresh.refresh) || that.data[tab + 'Index'] < 1 : that.data[tab + 'Index'] < 1) {
      if (searchCmp && searchCmp.state.search) {
        // （1）同一个关键词，同一个标签只搜索一次。（搜索过了就不清空）
        // （2）切换tab过程中，搜索关键词修改了，有可能搜索键盘，有可能点击搜索，
        // (如果是对修改后的关键词有搜索过，且当前tab是没有搜索过的，就要清空重新搜索了）
        // （3）默认对新的值进行判断，有没有搜索过；如果新的值没有搜索过，有旧的值且旧的只搜索过了，就按旧的值来搜索结果
        if (searchCmp.isTabSearchedValue() && !searchCmp.isSearched(tab)) {
          getClearFunction(tab)()
          searchCmp.handleSearch(tab)
          that.search = true
        } else if(searchCmp.isTabSearchedValue(true) && !searchCmp.isSearched(tab, true)){
          // 搜索关键词改前改后都有值的情况
          // 这个分支解决以下bug：在首页进行一次关键词搜索后修改关键词并点击筛选会导致列表一直处于加载中
          getClearFunction(tab)()
          searchCmp.handleSearch(tab, true)
          that.search = true
        }
      } else {
        that.props.getClearFunction(tab)()
        if (isSubscribe) {
          // 关注列表
          fetchProjects({subscribe: 1, tab: consts.SUBSCRIBE})
        } else {
          fetchProjects({tab: tab})
        }
      }
    }
    if (!that.search && searchCmp && searchCmp.state.search) {
      if (searchCmp.isTabSearchedValue() && !searchCmp.isSearched(tab)) {
        getClearFunction(tab)()
        searchCmp.handleSearch(tab)
      } else if(searchCmp.isTabSearchedValue(true) && !searchCmp.isSearched(tab, true)){
        // 搜索关键词改前改后都有值的情况
        // 这个分支解决以下bug：在首页进行一次关键词搜索后修改关键词并点击筛选会导致列表一直处于加载中
        getClearFunction(tab)()
        searchCmp.handleSearch(tab, true)
      }
    }
    that.addActive(tab)
    updateProjectsTab(tab, this.state.active)
  }

  // 获取所有项目列表
  projects() {
    const {fetchProjects, clearProjects, updateProjectsTab, projects, searchComponent} = this.props
    let that = this

    // 点击查看全部的时候，恢复所有数据，销毁搜索框。
    if (that.data[consts.PROJECTS + 'Index'] < 1 || projects.isSearch) {
      clearProjects()
      fetchProjects({subscribe: 0, tab: consts.PROJECTS})
      this.state.fetched = true
    }
    that.addActive(consts.PROJECTS)
    updateProjectsTab(consts.PROJECTS, this.state.active)
    const searchCmp = searchComponent()
    if(!this.state.fetched){
      // 全部的列表不要再请求了
      searchCmp && searchCmp.hideSearch(true)
    } else {
      searchCmp && searchCmp.hideSearch()
    }
  }
}
