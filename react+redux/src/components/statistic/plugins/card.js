import React, { Component } from 'react'
// import {Scroll} from 'utils/helpers'

export default class Card extends Component {

  componentDidMount(){
    // setTimeout(Scroll({fnCallback: this.props.onUpload}, 0), 100)
  }
  render() {
    const { carddata, index, displayOrder } = this.props
    // this.more()
    return (
      <div className="stat-card text-middle-45">
        <div className="column-4">{+index + 1}</div>
        {
        displayOrder.map((data) =>
          <div key={index + data} className={carddata[data] + ' column-4'}>{carddata[data]}</div>
        )}
      </div>
    )
  }
}
