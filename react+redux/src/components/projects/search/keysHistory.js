/**
 * 首页项目搜索的历史关键词
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import * as utils from 'utils'
import * as helpers from 'utils/helpers'

@connect(state => ({}), actionCreators)

export default class extends Component {

constructor() {
  super()
  this.state = {}
}

componentDidMount(){
  helpers.ScrollResize(0, this.refs.histories && this.refs.histories.getDOMNode())
}

 // 清空搜索的关键词历史数据
 clearHistory(){
   const {getKey} = this.props
   const key = getKey()
   utils.setStorage(key, '')
   this.setState({
     isClear: true
   })
 }

  render() {
    const {searchKeys, search} = this.props
    if (this.state.isClear || !searchKeys.length){
      return null
    }
    return (
     <div className="projects-search-keys-history" ref="histories">
           <ul className="projects-search-keys-items">
           {
             searchKeys.map((key) =>
                <li className="projects-search-keys-item" onClick={() => search(key)}>{key}</li>
                )
           }
           </ul>
           <div className="projects-search-keys-clear" onClick={this.clearHistory.bind(this)}>清空搜索历史</div>
        </div>
    )
  }


}
