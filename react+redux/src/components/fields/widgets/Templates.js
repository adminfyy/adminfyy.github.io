import React, { Component } from 'react'
import { Link } from 'react-router'

class Templates extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    let that = this
    this.setMaskHeight()
    window.addEventListener('scroll', function () {
      that.setMaskHeight()
    })

    this.setState({
      value: this.props.value
    })
  }

  componentWillUnmount() {
    const that = this
    window.removeEventListener('scroll', function () {
      that.setMaskHeight()
    })
  }

  componentDidUpdate() {
    this.setMaskHeight()
  }

  setMaskHeight() {
    let dialogMark = this.refs.dialogMark && this.refs.dialogMark.getDOMNode()
    if (dialogMark) {
      let docHeight = document.body.scrollHeight
      let winHeight = document.documentElement.clientHeight
      dialogMark.style.height = (docHeight <= winHeight ? winHeight : docHeight) + 'px'
    }
  }

  render() {
    let { enums, tpl } = this.props
    let projectId = enums.projectId
    let versionId = enums.versionId
    enums = enums.template_items

    return (
      <div>
        <div className="dialog-mark" data-role="dialogMark" ref="dialogMark"></div>
        <div className="dialog-notifytype" ref="dialogConfirm">
          <div className="dialog-notifytype-content" data-role="content">

            <div className="dialog-notifytype-head" data-role="head">
              <div className="dialog-notifytype-title" data-role="title">主题类型</div>
            </div>

            <div className="dialog-notifytype-main" data-role="main">
              <ul className="role-selector">
                {
                  enums.map(item => (
                    <li className="modify-link-color" key={item.template_id}>
                      <Link to={`/project/${projectId}/version/${versionId}/group/tpl/${item.template_id}`}>
                      <span>{item.template_name}</span></Link>
                    </li>
                  ))
                  }
              </ul>

            </div>
            <div className="dialog-notifytype-footer" data-role="footer">
              <div className="dialog-notifytype-title" data-role="title" onClick={tpl.show.bind(tpl, false)}>取消</div>
            </div>
          </div>
        </div>

      </div>
    )
  }


}

export default Templates
