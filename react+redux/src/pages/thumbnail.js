import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import Index from 'components/widget/index/index'
import { Link } from 'react-router'
import * as helpers from 'utils/helpers'
@connect(state => ({
  stats: state.stats
}), actionCreators)
export default class OpenIndex extends Component {
	constructor(props){
  super(props)
  this.state = { isAddressSend: false }
	}
  componentDidMount(){
    const { stats, fetchProjectsStatistic } = this.props
    if(!stats['all_count']){
      fetchProjectsStatistic()
    }
  }
	render() {
  const { stats } = this.props
  const gotItAddress = stats['all_count'] > 0 ? '/' : '/open'
  return (
			<div className ="OpenIndexContainer">
				<div className="header">
					<div className="title">请移步至EA系统填写申请开通</div>
					<div ref = "sendAddress" onClick={this.sendAddress.bind(this)} className="white-border-btn">给99U发送链接</div>
				</div>
				<div className="content">
					<div>(填表范例) 点击可查看大图</div>
					<Link onClick={(e) => helpers.goPage('thumbnailBig')}>
						<div className="img"/>
					</Link>
				</div>
				<div className="footer">
					<Link onClick={(e) => helpers.goPage(gotItAddress)}>
						<div className="white-border-btn">知道了</div>
					</Link>
				</div>
				<Index activeIndex={2} length={2} />
			</div>
		)
	}

	sendAddress(){
  /*  send address */
  let that = this
  const { selfNotice } = this.props
  const { isAddressSend } = this.state
  if(!isAddressSend){
    selfNotice(function(isSuccess){
      if(isSuccess){
        window.toast.setTxt('发送链接成功，请至PC端99U查看')
        that.setState({
          isAddressSend: true
        })
      } else {
        window.toast.setTxt('失败了！！再点一次 ~')
      }
    })
  } else {
    window.toast.setTxt('已发送,请至PC端99U查看')
  }
	}
}
