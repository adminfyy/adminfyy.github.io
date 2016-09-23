import React, { Component } from 'react'
import Apply from 'components/h5/apply'
import * as helpers from 'utils/helpers'
export default class ProjectReport extends Component {
  constructor() {
    super()
  }
  getScoreText(score){
    let scoreNum = parseFloat(score)
    let performLevel
    let perform
    if(scoreNum && scoreNum <= 60){
      performLevel = 'D'
      perform = '需要很大提高'
    } else
    if(scoreNum <= 90){
      performLevel = 'C'
      perform = '需要提高'
    } else
    if(scoreNum <= 100){
      performLevel = 'B'
      perform = '满意'
    } else
    if(scoreNum <= 110){
      performLevel = 'A'
      perform = '非常满意'
    } else {
      performLevel = 'S'
      perform = '卓越'
    }
    // return `${score}分( ${performLevel} ${perform} )`
    return {
      scoreText: scoreNum,
      performLevel: performLevel,
      perform: perform
    }
  }
  componentDidMount() {
    let $el = this.refs['js-virKeybord'].getDOMNode()
    helpers.refreshTouch($el)
  }
  render() {
    const {h5ReportDetail, projectInfo, projectId, uid} = this.props
    let pStatus = h5ReportDetail.progress_status
    let reportId = h5ReportDetail.id
    let score = h5ReportDetail.progress_score
    let {scoreText, performLevel, perform} = this.getScoreText(score)
    let statusExp = h5ReportDetail.progress_status === 2 ? 'warn' : 'error'
    let statusTxt = h5ReportDetail.progress_status === 2 ? '警告' : '异常'
    let statusCss = h5ReportDetail.progress_status === 1 ? 'normal' : statusExp
    let statusStr = h5ReportDetail.progress_status === 1 ? '正常' : statusTxt
    let isHidden = pStatus === 0 ? ' hidden' : ''
    let versionLength = h5ReportDetail.report_versions && h5ReportDetail.report_versions.length
    let styles = {
      padding: '0',
      height: 30 * versionLength + 'px',
      lineHeight: 30 * versionLength + 'px'
    }
    let defaultStyles = {
      marginLeft: '0'
    }
    return (
      <div className="report-detail  overflow-y js-virKeybord" ref="js-virKeybord">
      <ul>
        <li>
          <div className="fl">项目名称</div>
          <div className="fr">
            <div className="fr-ml5">
              {projectInfo.name}
            </div>
          </div>
        </li>
        <li>
          <div className="fl">评价周期</div>
          <div className="fr">
            <div className="fr-ml5">
              {`${helpers.dateTime(h5ReportDetail.progress_start_time, 'yyyy/MM/dd')} - ${helpers.dateTime(h5ReportDetail.progress_end_time, 'yyyy/MM/dd')}`}
            </div>
          </div>
        </li>
        <li>
          <div className="fl" style={versionLength > 1 ? styles : defaultStyles}>当前里程碑</div>
          <div className={'fr ' + (versionLength > 1 ? 'miles' : '')}>
            <div className="fr-ml5">
            {versionLength > 0 ? h5ReportDetail.report_versions.map((version, i) =>
              <div key={version.project_version_id} className="mile">{version.version_title}</div>
            ) : '无'}
            </div>
          </div>
        </li>
        <li className={'project-status' + isHidden}>
          <div className="fl">项目状态</div>
          <div className="fr">
            <div className={'report-status ' + statusCss }>
              <span className="status-label">{statusStr}</span>
              <span className="icon_check"></span>
            </div>
          </div>
        </li>
        <li className={`${isHidden}`}>
          <div className="fl">项目评分</div>
          <div className="fr">
            <div className={'report-score ' + performLevel }>
              <span className="score-label display">{`${scoreText} ${performLevel} ${perform}`}</span>
            </div>
          </div>
        </li>
        <li className={'border-bottom0 ' + isHidden}>
          <div className="fl">书面说明</div>
        </li>
        <li className={'border-bottom0 padding0 break-word ' + isHidden}>
          <div className="info">{h5ReportDetail.progress_description}</div>
        </li>
      </ul>
      { pStatus === 0 && <Apply {...this.props} endTime={h5ReportDetail.progress_end_time} reportId={reportId} projectId={projectId} uid={uid}/>
        }
      </div>
    )
  }

}
