import React, { Component } from 'react'
import { Link } from 'react-router'
import { consts } from 'constants'
import * as helpers from 'utils/helpers'


export default class Tabs extends Component {
  constructor(){
    super()
    this.state = {
      isShow: true
    }
  }

  toggle(){
    this.setState({
      isShow: !this.state.isShow
    })
  }

  render() {
    let {projectId, activeKey} = this.props
    let {isShow} = this.state
    let hidden = [ +consts.INDEX, +consts.COLLABORATION, +consts.REPORT ].some((item) => +item === +activeKey) ? '' : ' hidden'
    let out = isShow ? '' : ' out'
    return (
      <div className={`tabs-cards ${hidden}`}>

        <div className={`tabs-card ${+activeKey === +consts.INDEX ? 'active' : ''} ${out}`} ref = "index"
           onClick={helpers.goPage.bind(helpers, `/menu/5/project/${projectId}/index`)}>
          <div className="icon-default tab-index">
          </div>
        <div className="label">首页</div>
        </div>

        <div className={`tabs-card ${+activeKey === +consts.COLLABORATION ? 'active' : ''} ${out}`} ref = "collaboration"
           onClick={helpers.goPage.bind(helpers, `/menu/1/project/${projectId}/dashboard`)}>
          <div className="icon-default tab-collaboration">
          </div>
        <div className="label">协作</div>
        </div>

        <div className={`tabs-card ${+activeKey === +consts.REPORT ? 'active' : ''} ${out}`} ref = "report"
           onClick={helpers.goPage.bind(helpers, `/menu/3/history/${projectId}`)}>
          <div className="icon-default tab-report">
          </div>
            <div className="label">报表</div>
        </div>
      </div>
    )
  }
}
