// Toast2.js
import React, {Component} from 'react'
// import * as helpers from 'utils/helpers'

export default
class ToastNew extends Component {
  constructor(props) {
    super(props)
    // console.log(props.hints)
    this.state = {
      ...props
    }
  }
  componentDidMount(){
    const {hints} = this.props
    this.setState({
      hints: hints
    })
  }
  componentWillUnmount(){
    this.setState({
      hints: []
    })
  }
  render() {
    let {hints} = this.state
    let isShow = hints[0] && hints[0].isShow || false
    let icon = hints[0] && hints[0].icon || 'danger'
    let title = hints[0] && hints[0].title || '无标题'
    let info = hints[0] && hints[0].info || '内容'
    return (
      <div className={`violent-hint  ${ isShow ? '' : 'hidden'}`}>
        <div className={`icon-container`}>
					<div className={`${icon}`}></div>
        </div>
        <div className={`hint-content`}>
          <div className="title">{title}</div>
          <div className="info">{info}</div>
        </div>
        <a className="hint-close" href="javascript:void(0);" onClick={this.hide.bind(this)}>X</a>
      </div>
    )
  }

  hide() {
    let NextHint = this.state.hints
    NextHint.shift()
    this.setState({hints: NextHint})
  }

  setProps(option) {
    if (option) {
      this.setState({
        ...option
      })
    }
  }
}
