import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import * as helpers from '../../utils/helpers'

@connect(state => ({ login: state.login }), actionCreators)
class Login extends React.Component {

  componentDidMount() {
    document.querySelector('.loginForm').style.height = window.innerHeight + 'px'

    let that = this
    window.addEventListener('keydown', function(e) {
      that.submitForm(e)
    })
  }

  componentWillUnmount() {
    let that = this
    window.removeEventListener('keydown', function (e) {
      that.submitForm(e)
    })
  }

  render() {
    return (
      <div className="loginForm">
        <div className="loginTitle">项目官网</div>
          <ul>
             <li className="login-msg" ref="message"></li>
             <li><input placeholder="工号@组织名" ref="loginName" /></li>
             <li><input type="password" placeholder="密码" ref="password" /></li>
            <li><button type="submit" onClick={this.handleLogin.bind(this)}>登录</button></li>
          </ul>
      </div>
    )
  }

  submitForm(event) {
    if(event.keyCode === 13){
      this.handleLogin()
    }
  }

  handleLogin() {
    this.setState({
      isLoading: true
    })
    const that = this
    const loginName = this.refs.loginName.getDOMNode().value
    const password = this.refs.password.getDOMNode().value
      // const {login} = this.props
    if (this._checkInput(loginName, password)) {
      this.props.login({
        'login_name': loginName,
        password: helpers.md5(password)
      }, function(msg) {
        that.refs.message.getDOMNode().innerText = msg
          // that.props.projectsPage.setState({
          //   isValid: true
          // })
      })
    }
  }

  _checkInput(loginName, password) {
    const msg = this.refs.message.getDOMNode()
    if (!loginName || !password) {
      msg.innerText = '用户名或密码不能为空'
      return false
    }
    if (!/^[_0-9a-zA-Z]{1,20}@[_0-9a-zA-Z]{1,20}$/.test(loginName)) {
      msg.innerText = '用户名格式为 工号@组织名'
      return false
    }
    return true
  }
  }

export default Login
