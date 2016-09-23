import React from 'react'
import TimeoutTransitionGroup from 'timeout-transition-group'
import Toast from 'components/widget/toast/ToastNew'
import ConfirmDialog from 'components/widget/dialog/ConfirmDialog'
import Tabs from 'components/widget/tab/index'
class App extends React.Component {

  componentDidUpdate () {
    window.toast = this.refs.toast
    window.dialog = this.refs.dialog
  }
  componentDidMount () {
    window.toast = this.refs.toast
    window.dialog = this.refs.dialog
    window.onpopstate = function(event) {
      if (window.dialog && window.dialog.getVisible()) {
        window.dialog.setOptions({visible: false})
      }
    }
  }
  render () {
    let projectId = this.props.params.id
    let activeKey = this.props.params.menu
    return (
      <TimeoutTransitionGroup component="div" transitionName="page" enterTimeout={300} leaveTimeout={300}>
        <Toast ref="toast"/>
        {React.cloneElement(this.props.children || <div/>, {key: this.props.location.pathname})}
        <ConfirmDialog ref="dialog" key={this.props.params.id}/>
        <Tabs activeKey={activeKey} projectId={projectId}/>
      </TimeoutTransitionGroup>
    )
  }
}

export default App
