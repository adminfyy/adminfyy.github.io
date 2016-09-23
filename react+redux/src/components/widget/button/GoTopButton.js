import React, { Component } from 'react'
import { easeInOut } from '../../../utils/helpers'

class GoTopButton extends Component {

  componentDidMount() {
    this.scrollCallback = this._handleScroll.bind(this)
    let $scroll = document.querySelector('.js-scroll')
    $scroll.scrollTop = 0
    if($scroll){
      $scroll.addEventListener('scroll', this.scrollCallback, false)
    }
  }

  componentWillUnmount() {
    let $scroll = document.querySelector('.js-scroll')
    if($scroll){
      $scroll.removeEventListener('scroll', this.scrollCallback, false)
    }
  }

  render() {
    return <a className={`goTop top-btn hidden`} href="javascript:void(0)" onClick={this._handleClick.bind(this)} ref="goTop"></a>
  }

  _handleClick() {
    let $scroll = document.querySelector('.js-scroll')
    let [ b, d, t, speed ] = [ $scroll.scrollTop, 100, 0, 1 ]
    let c = -b
    if (b === 0) return
    function pageSroll() {
      $scroll.scrollTop = easeInOut(t, b, c, d)
      if (t < d) {
        t += speed
        setTimeout(pageSroll, 10)
      }
    }
    pageSroll()
  }

  _handleScroll(e) {
    let $scroll = document.querySelector('.js-scroll')
    let $top = document.querySelector('.goTop')
    if($scroll && $scroll.scrollTop > 200){
      $top.classList.remove('hidden')
    } else {
      $top.classList.add('hidden')
    }
  }
}

export default GoTopButton
