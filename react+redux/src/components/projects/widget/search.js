import React, { Component } from 'react'
import {Link} from 'react-router'
import { consts } from 'constants'
import * as helpers from '../../../utils/helpers'

export default class BannerSearch extends Component {


  constructor(props) {
    super(props)

    this.state = {
      isShow: false
    }
    this.defaultHeight = document.body.clientHeight

// 记录搜索的次数
    this.data = {
      [consts.SUBSCRIBE + 'Index']: 0,
      [consts.PROJECTS + 'Index']: 0,
      [consts.PROJECT_NORMAL + 'Index']: 0,
      [consts.PROJECT_WARN + 'Index']: 0,
      [consts.PROJECT_ERROR + 'Index']: 0
    }
  }

  getIndexKey(tab) {
    return [ tab + 'Index' ]
  }

  // componentDidMount(){
  //   let that = this
  //   document.body.onresize = function(){
  //     if(+document.body.clientHeight < +that.defaultHeight){
  //       helpers.addProjectBtnStatic()
  //       // setTimeout(helpers.addProjectBtnStatic, 5000)
  //     } else {
  //       // setTimeout(helpers.addProjectBtnNormal, 5000)
  //       helpers.addProjectBtnNormal()
  //     }
  //   }
  // }
  componentDidUpdate() {
    // setTimeout(helpers.ScrollResize, 50)
  }
  componentWillUnmount(){
    // document.body.onresize = () => {}
  }

  render() {
    const {isShow} = this.state

    /* onFocus={this.handleFocus.bind(this)}
     onBlur={this.handleBlur.bind(this)}
     <a className="searchIcon iconfont iconfont-project-search" onClick={this.toggle.bind(this)}></a>
     */

    return (
      <div className="banner-search">
        {isShow
        ? <div className="searchInput" ref="searchBar">
            <i className="search-board iconfont iconfont-project-search"></i>
            <input className="search-bar-input"
                   placeholder="请输入你要查看的项目"
                   ref="filter"
                   onKeyDown={this.handleKeyDown.bind(this)}
                   type="search"
            />
            <a className="searchIcon" onClick={this.toggle.bind(this, true)}>取消</a>
          </div>
          : <Link className="searchIcon iconfont iconfont-project-search"
          onClick={(e) => helpers.goPage(`projects/search`)}/>
        }
      </div>
    )
  }

  // focus() {
  //   // helpers.addProjectBtnStatic()
  // }
  //
  // blur() {
  //   // helpers.addProjectBtnNormal()
  // }

  resetData(isRequest) {
    const that = this

    function data(type, tab) {
      that.props.getClearFunction(tab)()
      let newKey = that.getIndexKey(tab)
      that.props.fetchProjects({subscribe: type, tab: tab})
      that.data[newKey] = 0
    }

    if (this.props.projects.isSearch && isRequest) {
      data(0, consts.PROJECTS)
    }
    if (this.props.subProjects.isSearch) {
      data(1, consts.SUBSCRIBE)
    }
    if (this.props.normalProjects.isSearch) {
      data(0, consts.PROJECT_NORMAL)
    }
    if (this.props.warnProjects.isSearch) {
      data(0, consts.PROJECT_WARN)
    }
    if (this.props.errorProjects.isSearch) {
      data(0, consts.PROJECT_ERROR)
    }
  }


  // 提供给外部的接口，查看全部的时候，影藏搜索框，恢复搜有数据
  hideSearch(isRequest) {
    this.state = {}
    this.resetData(isRequest)
  }

  /** 对外提供的接口，一个关键词是否对某个标签做过搜索了
   *  checkOldValue：true表示对旧的值进行一遍检查，是否有标签搜索过这旧的值
   */
  isTabSearchedValue(checkOldValue) {
    const that = this
    return [ consts.SUBSCRIBE, consts.PROJECTS, consts.PROJECT_NORMAL, consts.PROJECT_WARN, consts.PROJECT_ERROR ]
      .some(function (item) {
        return that.isSearched(item, checkOldValue)
      })
  }

  // 某个标签对某个值的搜索的key
  getKey(tab) {
    return tab + this.getDom().value
  }

  // 某个标签对某个值的搜索的key，value是旧的value。对新的关键词做搜索完了之后，要delete旧的搜索关键词的key
  getOldTabKey(tab) {
    return tab + this.state.preValue
  }

  // 删除旧的tab关键词的搜索状态
  deleteOldTabKeyInState() {
    const that = this

    return [ consts.SUBSCRIBE, consts.PROJECTS, consts.PROJECT_NORMAL, consts.PROJECT_WARN, consts.PROJECT_ERROR ]
    .forEach(function (item) {
      delete that.state[that.getOldTabKey(item)]
    })
  }

  // 处理value的空值情况
  getNoneBlankValue(val) {
    return val.replace(/\s*/g, '')
  }

  /*
   * 同一个标签，同一个关键词，是否搜索过了，搜索过了，就不再搜索了
   * 解决的情况：
   * 输入关键词进行搜索，此时在切换到其他tab前，把关键词清空了。
   *此时新的tab应该还是清空之前的关键词的搜索结果
   * checkOldValue：true表示对旧的值进行一遍检查，是否有标签搜索过这旧的值
   */
  isSearched(tab, checkOldValue) {
    let tabValueKey = this.getKey(tab)
    const preValue = this.state.preValue
    const nowValue = this.getDom().value
    if (!this.getNoneBlankValue(nowValue) && !this.getNoneBlankValue(preValue)) {
      // 之前的搜索关键词是空的，现在也是空的
      return true
    } else if (!this.getNoneBlankValue(nowValue) && this.getNoneBlankValue(preValue)) {
      // 之前的搜索关键词不是空的，现在是空的
      return this.state[this.getOldTabKey(tab)]
    } else if (checkOldValue && this.getNoneBlankValue(nowValue) && this.getNoneBlankValue(preValue)) {
      // 之前的搜索关键词不是空的，现在也不是空的
      return this.state[this.getOldTabKey(tab)]
    }

    return this.state[tabValueKey]
  }


  getDom() {
    return this.refs.filter.getDOMNode()
  }


  toggle(flag) {
    this.setState({
      isShow: !this.state.isShow
    })

    if (flag) {
      // 设置false,获取该标签的全部数据,点击取消
      helpers.Scroll(null, 52)
      if (this.state.search) {
        this.resetData(true)
        this.state = {}
      }
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleSearch()
    }
  }

  /*
   * （1）加个了curTab是为了在做搜索优化的时候，切换到不同的tab要实时的搜索
   * （2）tab没有实时切换到最新的
   * （3）checkOldValue:为true设置value为空来获取之前关键词的搜索结果。这个参数
   * 主要是解决这个问题：在首页进行一次关键词搜索后修改关键词并点击筛选会导致列表一直处于加载中
   */
  handleSearch(curTab, checkOldValue) {
    let {tab} = this.props
    tab = curTab || tab
    let key = this.getIndexKey(tab)
    // 表明搜索的次数，取消的时候，如果有搜索过才从新请求
    this.data[key] = ++this.data[key]

    let $input = this.getDom()
    let value = $input.value
    if (value && !helpers.checkRegex(value)) {
      window.toast.setTxt('请输入中文、数字、英文字符!')
      return
    }
    const type = tab === consts.SUBSCRIBE ? 1 : 0
    $input.blur()
    if (checkOldValue) {
      value = ''
    }

    if (!value.replace(/\s*/g, '')) {
      if (curTab) {
        // 切换tab的时候且当前的搜索框中的值是空，而之前的值不为空。才会进来这个分支。
        // 按之前的搜索关键词进行搜索
        this.props.fetchProjects({init: true, keyword: this.state.preValue, isSearch: true, subscribe: type, tab: tab})
        const tabOldValueKey = this.getOldTabKey(tab)
        this.setState({
          [tabOldValueKey]: true
        })
        return
      }
      let $nodeDiv = this.refs.searchBar.getDOMNode()
      let errorTxt = '请输入你要查看的项目'
      helpers.placeholderShow({$nodeDiv, $input, errorTxt})
      return
    }
    /*
     * (1)同一个标签，同一个搜索关键词，搜索过一次就不再搜索了
     * (2)标签切换过程中，搜索关键词修改了，判断是否其他tab有做过对此搜索关键词的搜索且当前tab没有搜索过，有的话，就对当前也做搜索；
     * 没有的话不做搜索
     * (3)如果搜索关键词修改了，且对新的搜索关键词搜索了，那么，每个tab都要对原先的的搜索关键词的搜索状态都要delete掉
     */
    let tabValueKey = this.getKey(tab)

    if (value !== this.state.preValue) {
      this.deleteOldTabKeyInState()
    }

    this.setState({
      search: true,
      [tabValueKey]: true,
      preValue: value
    })

    this.props.fetchProjects({init: true, keyword: value, isSearch: true, subscribe: type, tab: tab})
  }


}
