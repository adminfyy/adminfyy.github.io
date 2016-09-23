import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import * as consts from 'constants/const'

export default class Card extends Component {

  componentDidMount(){
  }

  filter(key, value){
    if(key === 'ranking'){
      switch (value) {
        case 0:
        case 2147483647:
          return `    ------`
        default:
          return `第 ${value} 名`
      }
    }
    return value
  }

  render() {
    const {data} = this.props
    let ranking = this.filter('ranking', data.ranking)
    let score
    if(ranking === `    ------`){
      score = '未评价'
    } else {
      score = data.progress_score ? data.progress_score : '未评价'
    }
    return (
      <div className={`tr ranking-${data.ranking}`}>
        <div className={`ranking`} key={`ranking`}></div>
        <div className={`icon`}>
          <img src={helpers.getProjectIcon(data.icon_dentry_id)} onError={helpers.onError.bind(this, consts.DEFAULT_PROJECT)}/>
        </div>
        <div className={`info`} key={`info`}>
          <div className={`info-name`}>{ data.name }</div>
          <div className={`info-ranking`}>{ranking}</div>
        </div>
        <div className={`progress_score`} key={`progress_score`}>{score}</div>
      </div>
    )
  }
}
