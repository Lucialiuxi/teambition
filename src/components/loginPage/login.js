import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import './login.css'
import { withRouter } from 'react-router-dom'
class Login  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <section className="loginPage">
            <form>
                <h1 className="logo">Teambition</h1>
                <input type="text" className="username" placeholder="用户名"/>
                <input type="password" className="pw" placeholder="密码"/>
                <span className="register">注册</span>
                <span className="login">登录</span>
            </form>
        </section>
        )
    }
}
 
export default withRouter(Login);