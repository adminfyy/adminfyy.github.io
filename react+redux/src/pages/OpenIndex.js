import React, { Component } from 'react'
import Index from 'components/widget/index/index'
import { Link } from 'react-router'
import * as helpers from 'utils/helpers'
export default class OpenIndex extends Component {
	render() {
  return (
			<div className ="OpenIndexContainer">
				<div className="mapBg">
				</div>
				<div className="subscript">您还没有项目在项目官网进行，<br/>快去申请开通吧~</div>
				<div className="colorfulBg">
					<Link onClick={(e) => helpers.goPage(`/project/open/2`)}>
						<div className="transparentBg">
							立即开通
						</div>
					</Link>
				</div>
				<Index activeIndex={1} length={2} />
			</div>
		)
	}
}
