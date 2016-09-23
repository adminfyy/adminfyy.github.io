import React, { Component } from 'react'

class ProjectGoalItemEdit extends Component {

  render () {
    const { projectItem } = this.props
    let edit = projectItem ? 'disabled' : ''
    return (
      <div className={projectItem ? 'goalItemEdit' : 'goalItemEdit newGoalItem'}
        data-id={projectItem ? 'goalItem' + projectItem.id : 'newGoalItem'}
        data-month={projectItem ? projectItem.month : ''} >
        <a className="iconfont-del" onClick={this._deleteItem.bind(this)}></a>
        <ul>
          <li className={edit}>
            <span>月份：</span>
            <select name="month" defaultValue={projectItem ? projectItem.month.substr(4) : '01'} disabled={edit}>
              <option value="01">一月</option>
              <option value="02">二月</option>
              <option value="03">三月</option>
              <option value="04">四月</option>
              <option value="05">五月</option>
              <option value="06">六月</option>
              <option value="07">七月</option>
              <option value="08">八月</option>
              <option value="09">九月</option>
              <option value="10">十月</option>
              <option value="11">十一月</option>
              <option value="12">十二月</option>
            </select>
          </li>
          <li>
            <span>营收（流水）：</span>
            <input name="income" ref="income" defaultValue={ projectItem ? projectItem.income_goal : ''}
              onChange={this._handleIncomeChange.bind(this)}/>
            <span className="err-msg hidden" ref="errMsg1"></span>
          </li>
          <li>
            <span>用户数：</span>
            <input name="userAmount" ref="userAmount" defaultValue={ projectItem ? projectItem.user_amount : ''}
              onChange={this._handleUserAmountChange.bind(this)}/>
            <span className="err-msg hidden" ref="errMsg2"></span>
          </li>
          <li>
            <span>支出成本：</span>
            <input name="cost" ref="cost" defaultValue={ projectItem ? projectItem.cost_goal : ''}
              onChange={this._handleCostChange.bind(this)}/>
            <span className="err-msg hidden" ref="errMsg3"></span>
          </li>
        </ul>
      </div>
    )
  }

  _monthSelect (value) {
    if (this.props.projectItem) {
      return this.props.projectItem.month.substr(4) === value
    } else {
      return false
    }
  }

  _deleteItem (event) {
    let targetNode = event.target.parentNode
    if (/^goalItem/.test(targetNode.getAttribute('data-id') || targetNode.dataset.id)) {
      let month = targetNode.getAttribute('data-month')
      ? targetNode.getAttribute('data-month') : (new Date().getFullYear() + targetNode.querySelector('[name="month"]').value)
      this.props.deleteProjectGoal({
        projectId: this.props.projectId,
        month: month
      })
    } else {
      targetNode.parentNode.innerText = ''
    }
  }

  checkNum (node, msgNode, value) {
    if (!/^[0-9]*$/.test(value)) {
      msgNode.classList.remove('hidden')
      msgNode.innerText = '请输入数字'
      setTimeout(function () {
        msgNode.classList.add('hidden')
      }, 1000)
    } else{
      node.classList.remove('cred')
    }
  }

  _handleIncomeChange () {
    let node = this.refs.income.getDOMNode()
    let msgNode = this.refs.errMsg1.getDOMNode()

    let nodeValue = node.value
    this.checkNum(node, msgNode, nodeValue)
  }

  _handleUserAmountChange () {
    let node = this.refs.userAmount.getDOMNode()
    let msgNode = this.refs.errMsg2.getDOMNode()

    let nodeValue = node.value
    this.checkNum(node, msgNode, nodeValue)
  }

  _handleCostChange () {
    let node = this.refs.cost.getDOMNode()
    let msgNode = this.refs.errMsg3.getDOMNode()

    let nodeValue = node.value
    this.checkNum(node, msgNode, nodeValue)
  }
}

export default ProjectGoalItemEdit
