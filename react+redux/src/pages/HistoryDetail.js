import React, { Component } from 'react'
import { connect } from 'react-redux'
import CostTable from 'components/history/projectCost/CostTable'
import * as helpers from 'utils/helpers'
@connect(state => ({history: state.history}))
export default class HistoryDetail extends Component {
  componentWillUnmount() {
    this.props.clearHistoryDetail()
  }
  componentDidMount() {
    let $el = document.querySelector('.histories')
    helpers.refreshTouch($el)
  }
  render() {
    const {history} = this.props
    return (
      <div className="count-table">
        <div className="header-bar">
          <span className="title">
            投入成本{history.currentMonth ? `（${history.currentMonth}）` : ''}
          </span>
        </div>
        <CostTable costData={history && history.items || []}/>
      </div>
    )
  }
}
