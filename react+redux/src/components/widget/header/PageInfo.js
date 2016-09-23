import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import { Link } from 'react-router'
import utils from 'utils'

export default class PageInfo extends Component {
  render() {
    return (
      <div className="page-info">
        <div className="back">
          {!utils.isFromAppForHash() &&
          <a onClick={this.backFunction.bind(this)}>
            返回
          </a>}
        </div>
        <div className="page-title">
          <p>{this.props.projectTitle}</p>
        </div>
        <div className="goto-index">
              <Link onClick={(e) => helpers.goPage(`/`)}/>
        </div>
      </div>
    )
  }

  backFunction() {
    let backUrl = this.props.backUrl
    helpers.goPage(backUrl)
  }
}
