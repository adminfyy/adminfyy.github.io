import React, { Component } from 'react'
import * as helpers from '../../../utils/helpers'

class CostTable extends Component {

  render() {
    let costData = this.props.costData
    return (
      <table>
        <tbody>
        <tr>
          <td>人员分类</td>
          <td>投入工时</td>
          <td>投入人数</td>
          <td>工时成本</td>
        </tr>
        {(costData && costData.length > 0) ? costData.map((summary, i) =>
            <tr key={summary.member_type + summary.member_count + i }>
              <td>{summary.member_type}</td>
              <td>{helpers.showValue(summary.work_time, 'h')}</td>
              <td>{helpers.showValue(summary.member_count)}</td>
              <td>{helpers.convertMoney(summary.work_cost)}</td>
            </tr>
        ) : <tr><td colSpan="4">暂无数据</td></tr>}
        </tbody>
      </table>
    )
  }

}

export default CostTable
