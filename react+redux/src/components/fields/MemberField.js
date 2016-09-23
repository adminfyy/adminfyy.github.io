import React, { Component } from 'react'
import Members from 'components/fields/widgets/members'


export default
class MemberField extends Component{
  componentWillMount(){
    this.data = this.props.data
    this.item = this.props.item
    this.state = {
      isShowingSelection: false
    }
  }

  componentWillUnmount() {
    this.setState({
      isShowingSelection: false
    })
  }


  render(){
    if(!this.data || !this.data.ext || !this.item){
      return null
    }
    return (
      <div>

        <div className="removeRelative">
          <div className="iconfont-edit member-sub-admin" onClick={this.show.bind(this, true)}></div>
        </div>
        {
        this.state.isShowingSelection && <Members data={this.data.ext} item={this.item} instance={this}/>
          }
      </div>
    )
  }

  show(show, event){
    this.state.isShowingSelection = show
    this.setState(this.state)
    event && event.stopPropagation()
    return false
  }

}
