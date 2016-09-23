import React, { Component } from 'react'
import { Calendar } from 'react-nd-date'

export default
class DatePicker extends Component {

  componentDidMount() {
    let that = this
    this.setMaskHeight()
    window.addEventListener('scroll', function () {
      that.setMaskHeight()
    })
  }

  componentWillUnmount() {
    let that = this
    window.removeEventListener('scroll', function () {
      that.setMaskHeight()
    })
  }

  componentDidUpdate() {
    this.setMaskHeight()
  }

  render() {
    let {value} = this.props
    return (
      <div>
        <div className="dialog-mark" onClick={this.onCancel.bind(this)}></div>
        <div className="calendar">
          <Calendar format="YYYY-MM-DD" date={value}
            theme={{
              Calendar: {width: 240, padding: 10},
              MonthButton: { height: 26, width: 26 },
              MonthArrow: { border: '7px solid transparent' },
              MonthArrowNext: { marginLeft: 10 }
            }}
            onChange={this.handleDateChange.bind(this)} />
        </div>
      </div>
    )
  }

  onCancel(){
    let {handleChange} = this.props
    handleChange()
  }

  handleDateChange(payload) {
    let {handleChange} = this.props
    handleChange(payload)
  }

  setMaskHeight() {
   /* let dialogMark = this.refs.dialogMark.getDOMNode()
    if (dialogMark) {
      let docHeight = document.body.scrollHeight
      let winHeight = document.documentElement.clientHeight
      dialogMark.style.height = (docHeight <= winHeight ? winHeight : docHeight) + 'px'
    }*/
  }

}
