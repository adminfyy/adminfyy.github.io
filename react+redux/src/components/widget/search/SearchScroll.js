import React, { Component } from 'react'
import { Link } from 'react-router'
import * as helpers from '../../../utils/helpers'

export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      // isLoading:默认展示搜索框
      isLoading: props.isSearch || false,
      // keyWord:默认传进来的关键字
      keyWord: '',
      // 是否要展示清空关键词的按钮
      hasClear: props.isClear || false,
      // hasClear为true的情况下，isClear才有用，设置才有效果；展示清空关键词的按钮还是隐藏
      isClear: false
    }
    this.defaultHeight = document.body.clientHeight
    this.enterFlag = true
  }
  // 处理tab，fixed问题
  componentDidMount(){
    let that = this
    window.onresize = function(){
      if(this.enterFlag){
        helpers.tabHandlePosition(that.defaultHeight)
      }
    }
  }
  render() {
    const {hasBack, classPrefix, placeholder, hasClear} = this.props
    const {isClear} = this.state

    let {isLoading, keyWord} = this.state
    return (
      <div className={`scroll-search-bar ${classPrefix}`} ref="searchBar">
        <div className="search-content">
       { hasBack &&
        <div className="back iconfont-left-arrow">
          <Link onClick={(e) => helpers.goPage()} />
        </div>
        }

        {isLoading
        ? <div className="search-right">
            <div className="icon-area" onClick={this.handlerSearch.bind(this)}>
              <div className="icon-search"></div>
            </div>
            <input className="search-label js-keyword"
                   placeholder={placeholder || '搜索'}
                   ref="filter"
                   defaultValue={keyWord}
                   onKeyDown={this.handlerKeyDown.bind(this)}
                   onKeyUp={this.handlerKeyUp.bind(this)}
            />
            { hasClear && isClear && <div className="iconfont-clear" onClick={this.clearInput.bind(this)}></div> }
            {!hasBack && <div className="search-cancel" onClick={this.handlerCancel.bind(this)}>取消</div>}
          </div>
        : <div className="search-center">
            <div className="icon-search"></div>
            <input className="search-label" ref="search-center" value="搜索" onFocus={this.handlerFocus.bind(this)}/>
          </div>
          }
        </div>
      </div>
    )
  }
/**
 * [immediateSearch 对外提供的接口，点击历史搜索关键词，马上进行搜索]
 * @return {[type]} [description]
 */
immediateSearch(key) {
  let $input = this.refs.filter.getDOMNode()
  $input.value = key
  this.handlerSearch()
}
/**
 * [getInputDom 对外提供的接口，获取输入框的dom]
 * @return {[type]} [description]
 */
getInputDom(){
  return this.refs.filter.getDOMNode()
}

/**
 * [getInputValue 对外提供的接口，获取输入框的值]
 * @return {[type]} [description]
 */
getInputValue(){
  return this.getInputDom().value
}

/**
 * [clearInput 清空搜索的关键词，隐藏清空按钮, 清空之后的回调]
 * @return {[type]} [description]
 */
clearInput() {
  const $input = this.getInputDom()
  $input.value = ''
  this.modifyClearState(false)
}
/**
 * [modifyClearState 修改清空关键词的按钮的状态]
 * @param  {[type]} falg [true表示展示，false表示隐藏]
 * @return {[type]}      [description]
 */
modifyClearState(flag){
  if(this.props.hasClear){
    this.setState({
      isClear: flag
    })
    // 内容被清空之后的回调---比如清空的时候，显示历史搜索关键词
    !flag && this.props.clearCallback && this.props.clearCallback()
  }
}

handlerFocus(e) {
  this.setState({
    isLoading: true
  })
}

setEmptyTip($nodeDiv, $input) {
  const {
    errorPlacehoder,
    placehoder
  } = this.props
  let errorTxt = errorPlacehoder || '请输入名称'
  let normalTxt = placehoder || '搜索'
  helpers.placeholderShow({
    $nodeDiv,
    $input,
    errorTxt,
    normalTxt
  })
}

handlerKeyDown(e) {
  const {search} = this.props
  let $input = this.refs.filter.getDOMNode()
  let value = $input.value.trim()
  if (e && e.keyCode === 13) {
    if (value === '') {
      let $nodeDiv = this.refs.searchBar.getDOMNode()
      this.setEmptyTip($nodeDiv, $input)
      return
    }
    if (value && !helpers.checkRegex(value)) {
      window.toast.setTxt('请输入中文、数字、英文字符!')
      return
    }
    // 点击完后，收缩键盘
    document.activeElement.blur()
    // e.target.blur()
    setTimeout(function() {
      search(value, 1)
    }, 500)
    return
  }
}

handlerKeyUp(){
  let $input = this.refs.filter.getDOMNode()
  let value = $input.value.trim()
  // focus过程中，关键词被一个个清空了---如果没有关键词不展示，有关键词展示
  // 减1的原因是因为keydown的时候，人眼看到的是清空了，实际上在这个事件里面value还是在的
  value ? this.modifyClearState(true) : this.modifyClearState(false)
}

handlerSearch(type, e) {
  const {search} = this.props
  let $input = this.refs.filter.getDOMNode()
  let value = $input.value.trim()
  if (value === '') {
    let $nodeDiv = this.refs.searchBar.getDOMNode()
    this.setEmptyTip($nodeDiv, $input)
    return
  }
  if (value && !helpers.checkRegex(value)) {
    window.toast.setTxt('请输入中文、数字、英文字符!')
    return
  }
  // 有关键词展示----直接点击搜索历史关键词的时候。
  this.modifyClearState(true)
  search($input.value, 1)
}

handlerCancel(e) {
  const {
    search,
    isCancel
  } = this.props
  const that = this
  setTimeout(function() {
    that.setState({
      isLoading: false,
      keyWord: ''
    })
    if (!isCancel) {
      search('', 2)
    }
  }, 500)
}
}
