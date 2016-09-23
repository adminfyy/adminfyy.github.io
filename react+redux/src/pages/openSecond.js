import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import Search from 'components/open/Search'
import Operate from 'components/open/Operate'
import * as helpers from 'utils/helpers'
@connect(state => ({

}), actionCreators)
export default class OpenSecondPage extends Component {
  componentDidMount() {
    helpers.refresh()
  }
  linkTo() {
    let $input = this.refs.filter.getDOMNode()
    let val = $input.value
    let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/

    $input.blur()

    if (val.length) {
      if (!reg.test(val)) {
        window.toast.setTxt('请输入合法关键字')
        $input.value = null
      } else{
        val = encodeURIComponent(val)
        helpers.goPage(`/project/open/3/${val}`)
      }
    } else {
      window.toast.setTxt('请输入项目名称')
    }
  }


  render() {
    this.props.search = this.linkTo
    this.props.isDisabled = false

    return (
      <div className="open-wrap">
        <div className="main">
          <Search {...this.props} />
        </div>
        <Operate {...this.props} />
      </div>
    )
  }
}
