// AddTasks.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import Search from 'components/widget/select/search'
import utils from 'utils'
@connect(state => ({
  selectResult: state.selectResult
}), actionCreators)
class AddTasks extends Component {
  constructor(props) {
    super()
    // 初始化设置参数
    let selectResult = props.selectResult.isCache ? JSON.parse(utils.getStorage('w_select')) : props.selectResult
    /**
     * [state 参数说明]
     * isRequest: true,   //是否接口请求
       isCache: false,    //是否从storage取值
       isClickCheck: true, //组件内部更新
       title: '选择联系人', //select标题
       subTitle: '项目成员',//select次标题
       selectedName: '人', //显示已选单位
       total: data.total,  //总数
       data: data.users.items,  //从接口请求的数据或者自定义的数据   {id:1,label:'yaolx',image:'图片地址',subLabel:'姓名后面括号内容'}
       selectedItems: selectedItems, //单击选择、全选 时保存的items
       selectedConfirmItems: selectedConfirmItems   //  点击确定时，保存最后的数据
     * @type {Object}
     */
    this.state = {
      isRequest: false,
      title: '',
      ...selectResult,
      subTitle: '搜索结果'
    }
  }
  componentDidMount(){
    // 刷新时会清空state，从storage取
  /*  if(this.props.selectResult.isCache){
      this.props.receiveSelectOptions(JSON.parse(utils.getStorage('w_select')))
    }*/
  }
  componentWillUnmount(){
    const {selectResult} = this.props
    if(selectResult.isSearch){
      selectResult.data = JSON.parse(utils.getStorage('w_select')).data
      this.props.receiveSelectOptions(selectResult)
    }
  }
  render(){
    const projectId = this.props.params.pid
    if (!this.props.selectResult.isSearch){
      return (
        <div>
          <div className="page-loading"></div>
        </div>
        )
    } else {
      return (
        <div className="task-wrap widget-select">
          <Search projectId={projectId} {...this.state} {...this.props} hideInfo="true"/>
        </div>
      )
    }
  }

}

export default AddTasks
