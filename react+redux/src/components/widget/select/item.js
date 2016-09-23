// TaskItem.js
import React, {Component} from 'react'
import * as helpers from 'utils/helpers'

class SelectItem extends Component {
  constructor(props){
    super()
    let isChecked = false
    props.selectResult.selectedItems && props.selectResult.selectedItems.forEach(function(item){
      if(+item.id === +props.selectItem.id){
        isChecked = true
      }
    })
    this.state = {
      isChecked: isChecked
    }
    this.style = {
      height: '60px',
      lineHeight: '60px',
      padding: '0'
    }
  }
  componentDidMount () {
    let $selectItem = this.refs.selectItem.getDOMNode()
    let $scrollPanel = document.querySelector('.js-scroll')
    helpers.scrollLoading($scrollPanel, $selectItem)
    $scrollPanel.addEventListener('scroll', function () {
      helpers.scrollLoading($scrollPanel, $selectItem)
    })
    $scrollPanel.style.height = document.documentElement.clientHeight - $scrollPanel.offsetTop - 170 + 'px'
  }

  componentWillUnmount () {
    let $selectItem = this.refs.selectItem.getDOMNode()
    let $scrollPanel = document.querySelector('.js-scroll')
    $scrollPanel.removeEventListener('scroll', function () {
      helpers.scrollLoading($scrollPanel, $selectItem)
    })
  }
  /**
   * [componentWillReceiveProps 处理全选]
   * @method componentWillReceiveProps
   * @param  {[type]}                  props [description]
   * @return {[type]}                        [description]
   */
  componentWillReceiveProps (props) {
    const {isAllChecked, selectResult} = props
    if(!selectResult.isClickCheck){
      this.setState({
        isChecked: isAllChecked
      })
    }
  }
  render () {
    const {selectItem} = this.props
    let {isChecked} = this.state
    return (
      <li onClick={this.handleSelected.bind(this)} ref="selectItem" style={this.style}>
        <span className="icon-check left"></span>
        <div className="scroll-image">
					<div className="s-image js-scroll-load" data-url={selectItem.image} ref="scrollLoad"></div>
				</div>
        <a href="javascript:void(0);" className="select-label">{selectItem.subLabel}</a>
        {isChecked && <span className="icon-checked left"></span>}
      </li>
    )
  }

  handleSelected () {
    const {selectItem} = this.props
    this.setState({
      isChecked: !this.state.isChecked
    })
    this.props.receiveSelectChecked(selectItem, !this.state.isChecked)
  }
}

export default SelectItem
