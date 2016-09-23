import React, {Component} from 'react'
import * as helpers from 'utils/helpers'
export default class Container extends Component{
  render(){
    const {title, data, Card, type, href} = this.props
    return (
      <div className="container">
        <div className="title">
          <div className={`label iconfont-${type}`}>当前{title}</div>
          {data.empty && <div className="history iconfont-entry" onClick={this.goHistoryPage.bind(this)}>历史{title}</div>}
        </div>
        {
          !data.empty ? data.items.map((item, i) =>
            <Card key={`card-key-${i}`} data={item} href={href} type={type}/>)
          : <div className={`alert`}>
            <div className="image-container">
              <div className="image-alert"></div>
            </div>
            <div className="label">{`无当前${title}`}</div>
          </div>
        }
      </div>
    )
  }
  goHistoryPage(){
    const {href} = this.props
    helpers.goPage(href)
  }
}
