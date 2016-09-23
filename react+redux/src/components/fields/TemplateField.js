import React, { Component } from 'react'
import Templates from 'components/fields/widgets/Templates'

export default
class TemplateField extends Component{
  componentWillMount(){
    this.data = this.props.data
    this.state = {
      isShowingSelection: false
    }
  }


  render(){
    if(!this.data || !this.data.ext || this.data.ext.template_items.length === 0){
      return <div>没有模板</div>
    }

    return (
      <div className="header-actions">
        <button className="iconfont-add" onClick={this.show.bind(this, true)}></button>
        {
        this.state.isShowingSelection &&
        <Templates enums={ this.data.ext} tpl={this}/>
          }
      </div>
    )
  }

  show(show){
    this.state.isShowingSelection = show
    this.setState(this.state)
  }

}
