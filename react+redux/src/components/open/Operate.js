import React, { Component } from 'react'

export default class Search extends Component {
  stop(event) {
    event.stopPropagation()
  }

  handleNext() {
    this.props.linkTo()
  }

  render() {
    const {projectsAll, stats} = this.props
    let val = this.props.params.val
    let isSelected

    if (projectsAll && projectsAll.items) {
      projectsAll.items.forEach(item => {
        if (item.isSelected){
          isSelected = true
        }
      })
    }

    return (
      <div className="operate">
        {val
          ? <div className="btns">
            <button onClick={this.props.backTo.bind(this, stats.all_count)}>返回</button>
            <button className={(isSelected && !this.props.isExist) ? 'active' : 'disabled'}
              onClick={(isSelected && !this.props.isExist) ? this.handleNext.bind(this) : this.stop.bind(this)}>
              下一步
            </button>
          </div>
        : <div className="btns">
            <button className="disabled">下一步</button>
          </div>
        }

        <div className="steps">
          <strong>1</strong>
          <span></span>
        </div>
      </div>
    )
  }

}
