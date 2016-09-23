import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import * as consts from 'constants/const'

export default class Card extends Component {

  // componentDidMount(){
  //   let that = this
  //   setTimeout(function () {
  //     helpers.Scroll({ fnCallback: that.props.onUpload })
  //   }, 500)
  // }

  filter(key, value){
    if(key === 'ranking'){
      switch (value) {
        case 0:
        case 2147483647:
          return '--'
        case 1:
          return '1st'
        case 2:
          return '2nd'
        case 3:
          return '3rd'
        default:
          return value
      }
    }
    return value
  }

  render() {
    const {data} = this.props
    let ranking = this.filter('ranking', data.ranking)
    let score
    if(ranking === '--'){
      score = '未评价'
    } else {
      score = data.progress_score ? data.progress_score : '未评价'
    }
    return (
      <div className={`tr ranking-${data.ranking} ${data.isFirst ? 'first' : ''}`}>
        <div className={`ranking`} key={`ranking`}>{ranking}</div>
        <div className="icon">
          <img className={``} src={helpers.getProjectIcon(data.icon_dentry_id)} onError={helpers.onError.bind(this, consts.DEFAULT_PROJECT)}/>
          <div className={`crown`}></div>
        </div>
        <div className={`name`} key={`name`}><div>{ data.name }</div></div>
        <div className={`progress_score`} key={`progress_score`}>{score}</div>
      </div>
    )
  }
}
