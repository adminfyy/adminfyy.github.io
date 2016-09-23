import React, { Component } from 'react'
export default class RefreshStatus extends Component {
  /**
   * [render js-scroll-loading 表示加载dom对象 ]
   * 加载状态
   * 'data-loading':'正在加载数据…'
   * 'data-none':'未找到相关数据'
   * 'data-short':'没有数据可以显示了'
   * 'data-failed':'数据加载失败了'
   * 'data-fresh':'点击重新刷新'
   * @method render
   * @return {[type]} [description]
   */
  render() {
    let { total, length, hidden, tip } = this.props
    let loading = ''
    if (typeof total === 'undefined'){
      loading = ' data-loading'
    } else if (+total === 0){
      loading = ' data-none'
    } else if (+length === +total){
      loading = ' data-short'
    } else {
      loading = ' data-more'
    }
    let className = 'data-status js-scroll-loading' + (hidden || loading)
    let tipLabel = tip || '未找到相关数据'
    return (
      <div className={className}>
        <div className="msg">加载更多</div>
        <div className="msg">正在加载数据…</div>
        <div className="msg">
          <div className="msg-image">
            <div className="msg-label">{tipLabel}</div>
          </div>
        </div>
        <div className="msg">全部加载完毕</div>
        <div className="msg">数据加载失败了</div>
        <div className="msg">点击重新刷新</div>
      </div>
    )
  }
}
