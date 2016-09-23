import React, { Component } from 'react'
import * as helpers from 'utils/helpers'
import {consts} from 'constants'

export default class VersionCard extends Component {
  // componentDidMount(){
    // setTimeout(Scroll({fnCallback: this.props.onUpload}, 0), 500)
  // }
  handleCardClick(){
    const { carddata, roles } = this.props
    let projectId = carddata.project_id
    let isVC = helpers.checkPermission(consts.PERMISSION_TYPE.editVersion, null, roles)

    if(projectId && isVC){
      helpers.goPage(`/menu/2/versions/${projectId}`)
    }
  }

  render() {
    const {carddata, index, displayOrder} = this.props
    return (
      <div className="stat-card text-middle-55">
        <div className="column-4">{0 + index + 1}</div>
        {
        displayOrder.map((data) =>
          <div key={ index + '-' + data } className={carddata[data] + ' column-4'}>{carddata[data]}</div>
        )}
      </div>
    )
  }
}
