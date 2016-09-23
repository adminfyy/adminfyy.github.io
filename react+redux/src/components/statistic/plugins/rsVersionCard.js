import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
// import { createHashHistory } from 'history'
import * as utils from 'utils'

export default class VersionCard extends Component {

  componentDidMount(){
    // setTimeout(Scroll({fnCallback: this.props.onUpload}, 0), 500)
  }
  handleCardClick(){
    const { carddata, clickable } = this.props
    if(!clickable){
      return
    }
    // let histroy = new createHashHistory()
    let projectId = carddata.project_id
    let project = {
      'project_info': {
        name: carddata.name
      }
    }
    utils.setStorage('project', JSON.stringify(project))
    if(projectId){
      helpers.goPage(`/menu/2/versions/${projectId}`)
    }
  }

  render() {
    const {carddata, index, displayOrder} = this.props
    return (
      <div className="stat-card text-middle-55" onClick={this.handleCardClick.bind(this)}>
        <div className="column-3">{0 + index + 1}</div>
        {
        displayOrder.map((data) =>
          <div key={ index + '-' + data } className={carddata[data] + ' column-3'}>{carddata[data]}</div>
        )}
      </div>
    )
  }
}
