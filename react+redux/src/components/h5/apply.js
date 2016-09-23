import React, { Component } from 'react'
import * as helpers from '../../utils/helpers'
import Comment from 'components/widget/textarea'
import utils from 'utils'

export default
class ApplyPlugin extends Component {
  constructor() {
    super()
    this.state = {
      selected: 1
    }

    this.desDefault = {
      title: '书面说明',
      total: 256,
      placeholder: '请填写书面说明（256个字以内）',
      required: true,
      rows: 8,
      textareaCss: 'week-report-des'
    }
  }

  render() {
    const { selected } = this.state
    return (
      <div className="page-confirm">
        <div className="confirm-content">
          <ul>
            <li className="project-status">
              <div className="fl">项目状态</div>
              <div className="fr">
                <div className="report-status normal" onClick={this.handleSelected.bind(this, 1)}>
                  <span className="status-label">正常</span>
                  <span className={selected === 1 ? 'checked' : 'check'}></span>
                </div>
                <div className="report-status warn" onClick={this.handleSelected.bind(this, 2)}>
                  <span className="status-label">警告</span>
                  <span className={selected === 2 ? 'checked' : 'check'}></span>
                </div>
                <div className="report-status error" onClick={this.handleSelected.bind(this, 3)}>
                  <span className="status-label">异常</span>
                  <span className={selected === 3 ? 'checked' : 'check'}></span>
                </div>
              </div>
            </li>
            <li className="project-score">
              <div className="fl">
                项目评分
                <span className="required">*</span>
              </div>
              <div className="fr">
                <input ref="score"
                       className="score-input"
                       placeholder="请填写项目评分"
                       type="number"
                       min="1"
                       max="120"
                       onBlur={this.handleBlur.bind(this)}
                       onFocus={this.handleFocus.bind(this)}/>
              </div>
            </li>
            <li className="project-score-instruction">
              <div className="fl score-header">评分说明</div>
              <div className="fr project-instruction-detail">
                <div className="report-score">
                  <a className="score-label">{`(110-120]`}</a><span>S 卓越</span>
                </div>
                <div className="report-score">
                  <a className="score-label">{`(100-110]`}</a><span>A 非常满意</span>
                </div>
                <div className="report-score">
                  <a className="score-label">{`(90-100]`}</a><span>B 满意</span>
                </div>
                <div className="report-score">
                  <a className="score-label">{`(60-90]`}</a><span>C 需要提高</span>
                </div>
                <div className="report-score">
                  <a className="score-label">{`(0-60]`}</a><span>D 需要很大提高</span>
                </div>
              </div>
            </li>
            <li >

            </li>
            <Comment options={this.desDefault} ref="comment"/>
          </ul>
        </div>
        <div className="confirm-footer">
          <div className="confirm-center">
            <div className="btn-primary btn-sure btn-query mr0" onClick={this.sure.bind(this, 1)} ref="btn-sure">提交
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleFocus() {
    let $score = this.refs.score.getDOMNode()
    $score.classList.remove('error-container')
  }

  handleBlur() {
    let $score = this.refs.score.getDOMNode()
    let intScore = parseInt($score.value, 10).toFixed(1)
    if (intScore < 0) {
      $score.value = -intScore
    }
    if (intScore > 120) {
      $score.value = 120
    }
  }

  sure() {
    const {selected} = this.state
    const {applyReport, uid, reportId, projectId, endTime} = this.props
    const date = utils.dateTime(endTime)

    const year = date.YYYY()
    const month = date.M()

    let that = this
    let $comment = this.refs.comment
    let $score = this.refs.score.getDOMNode()

    if (!parseFloat($score.value)) {
      $score.classList.add('error-container')
      return
    }
    if (!$comment.valid()) {
      return
    }

    let option = {
      projectId: projectId,
      reportId: reportId,
      status: selected,
      uid: uid,
      comment: $comment.getValue(),
      score: $score.value
    }
    let $btn = this.refs['btn-sure'].getDOMNode()
    if ($btn.classList.contains('js-btn')) {
      return
    }
    $btn.classList.add('js-btn')
    applyReport(option, function (data) {
      $btn.classList.remove('js-btn')
      window.toast.setTxt('提交成功')
      this.props.fetchH5WeeklyReportDetail(option)
      // zhengms:modify 更新项目周报列表上的状态
      // 设置isBack为true是为了解决保持点击展开的月份；
      // isReport为true是为了改待评价的状态
      this.props.updateProjectWeeklyReport(month - 1, year, true, data.id, data.progress_status)
    }.bind(that))
  }

  handleSelected(type) {
    this.setState({
      selected: type
    })
  }

  onInput() {
    let $input = this.refs['js-comment'].getDOMNode()
    let $num = this.refs['js-num'].getDOMNode()
    helpers.keyInput($input, $num, 256)
  }
}
