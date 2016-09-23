import React, { Component } from 'react'
import * as helpers from '../../utils/helpers'
export default
class Navbar extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.regiserScrollEvent()
  }
  componentWillUnmount(){
    this.removeRegisterEvent()
  }

  clickAction(i){
    const {handleClick} = this.props
    if(i === 'ranklist'){
      window.toast.setProps({
        text: '排行榜改版中...',
        timeOut: 1000,
        isShow: true
      })
  //    helpers.isRefresh(false)
    } else{
      helpers.isRefresh(true)
      handleClick(i)
    }
  }
  render() {
    const{ activeIndex } = this.props
    return (
        <div className="navbar">
          <div className={`bar-item ${activeIndex === 'projectlist' ? 'active' : ''}`} onClick={this.clickAction.bind(this, 'projectlist')}>
            <div className="project-list-icon"></div>
            <div className="icon-label">项目列表</div>
          </div>
          <div className="bar-item add-project-action" onClick={this.onClick.bind(this)}>
            <div className="add-project-icon"></div>
            <div className="icon-label">新增项目</div>
          </div>
          <div className={`bar-item ${activeIndex === 'ranklist' ? 'active' : ''}`} onClick={this.clickAction.bind(this, 'ranklist')}>
            <div className="rank-list-icon"></div>
            <div className="icon-label">排行榜</div>
          </div>
        </div>
    )
  }
  onClick(){
    helpers.goPage('project/open/2')
  }

  hideNavBar(){
    let $bar = document.querySelector('.navbar')
    if($bar && !$bar.classList.contains('opacity')){
      $bar.classList.add('opacity')
    }
    setTimeout(() => {
      if($bar.classList.contains('opacity')){
        $bar.classList.remove('opacity')
      }
    }, 1000)
  }

  regiserScrollEvent(){
    let that = this
    let $el = document.querySelector('.js-scroll')
    if($el){
      $el.addEventListener('scroll', function(e){
        that.hideNavBar()
      }, false)
    } else {
      setTimeout(this.regiserScrollEvent.bind(this), 1000)
    }
  }

  removeRegisterEvent(){
  }
}
