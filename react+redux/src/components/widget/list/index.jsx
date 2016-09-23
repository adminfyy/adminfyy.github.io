import React, { Component } from 'react'
// import Card from './widget/card'
// import Header from './widget/header'
import RefreshStatus from 'components/widget/scroll/RefreshStatus'
// import { consts } from 'constants'

export default class RankList extends Component {

  constructor(){
    super()
    /*
    .query: 查询请求参数集合
    $filter：过滤条件
    $orderby: 排序条件
    $count: 是否返回总数
    $offset:偏移量
    $limit:单次请求返回数量
    is_ranking:是否查询排行榜列表，默认为false
    is_member:是否查询和用户相关的周报列表，默认为false

    isScrollLock: 是否禁止滚动

    isUploadAllowed: 是否允许使用Upload 使用场景 1多个list组合 2外层允许滚动
    */

    /*
      fetchAction 请求参数接口 必填
      cleanAction 清除参数接口 必填
    */
    this.state = {
      query: {
        'is_ranking': true,
        'is_member': false,
        $count: true,
        $offset: 0,
        $limit: 10,
        $filter: '',
        $orderby: ''
      },
      isScrollLock: false
    }
  }


  getNextQuery(query, data){
    return {
      ...query,
      $offset: data.page * 10
    }
  }

  /*
  ** fetchAction 用于滚动加载的数据请求借口
  ** data 当前的卡片数据列表
   */
  onUpload(){
    const {fetchAction, datas} = this.props
    let that = this
    let Querys = this.state.query
    let nextInfo = this.getNextQuery(Querys, datas)
    let $loading = document.querySelector('.js-scroll-loading')
    if ($loading.classList.contains('data-short')) return
    $loading.classList.remove('data-more')
    $loading.classList.add('data-loading')
    setTimeout(function () {
      fetchAction(nextInfo, function (data) {
        let list = data && data.items
        let len = list.length
        $loading.classList.remove('data-loading')
        if (!len) {
          $loading.classList.add('data-short')
        }
      })
    }, 500)
  }


  /**
   * [componentWillMount 设置参数]
   * @method componentWillMount
   */
  componentWillMount() {
    let {options} = this.props
    if(options){
      this.setState({
        ...options
      })
    }
  }
  componentDidMount() {
    // this.props.fetchAction({...this.state.query}, null, true, true)
  }
  componentWillUnmount(){
    // this.props.cleanAction()
  }
  render() {
    const {datas, Card, Header} = this.props
    const {isScrollLock, isUploadAllowed} = this.state
    if(typeof datas === 'undefined' || datas.page === 0){
      return (
        <div className="list-result">
          <div className="data-loading"></div>
          <div className="label">数据加载中...</div>
        </div>
      )
    }
    if(datas.empty && !datas.count){
      return (
      <div className="list-result">
        <div className="no-data-img"></div>
        <div className="label">未查找到相关列表</div>
      </div>)
    }

    return (
      <div className={`table ${isScrollLock ? '' : 'js-scroll'}`}>
        {Header && <Header />}
        {
          datas.items.map((item, i) =>
            <Card key={`rkl-${i}`} data={item} onUpload={ isUploadAllowed && this.onUpload.bind(this)}/>
          )
        }
        {!isScrollLock && <RefreshStatus length={datas.items.length} total={datas.count} key={datas.items.length}/>}
      </div>
    )
  }
}
