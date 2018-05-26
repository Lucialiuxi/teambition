import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Route , withRouter } from 'react-router-dom'
import './login.css'

import { Modal, Button } from 'antd';

import Project from '@/components/projectPage/projectHome';
import {register,login} from '@/server/requestData';
import {CustomeLink} from '@/commonfunc/index';
import routes from '@/router/router';
import cookie from 'react-cookies'

//注册登录的提醒弹框
function success(content) {
    const modal = Modal.success({
      title: '提醒',
      content: content,
    });
    setTimeout(() => modal.destroy(), 1000);
  }


class Login  extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:'',
            password:'',
            stateTip:'',
            id:''
         }
    }
    changeUsernameValue=(ev)=>{
        let val = this.refs.username.value
        if(val.trim()==='') return
        this.setState({
            username:val
        })
    }
    changePasswordValue=(ev)=>{
        let pw = this.refs.pw.value
        if(pw.trim()==='') return
        this.setState({
            password:pw
        })
    }
    registerClick=()=>{
        let o = this.state
        register({...o}).then(({data})=>{
            this.setState({
                stateTip:data.message
            })
            success(this.state.stateTip)
            if(this.state.stateTip!=='注册成功'){
                this.refs.username.value = ''
                this.refs.pw.value = ''
            }else{
                if(this.state.stateTip==='注册成功'){
                    this.setState({
                        id:data.userInfo._id
                    })
                    this.setUserCookie()
                    this.props.history.replace('/project')
                }
            }
            
        })
    }
    loginClick=()=>{
        let o = this.state;
        login({...o}).then(({data})=>{
            this.setState({
                stateTip:data.message
            })
            
            success(this.state.stateTip)
            if(this.state.stateTip=='登录成功'){
                if(this.state.stateTip==='登录成功'){
                    this.setState({
                        id:data.userInfo._id
                    })
                    this.setUserCookie()
                    this.props.history.replace('/project')
                }
            }else{
                this.refs.username.value = ''
                this.refs.pw.value = ''
            }
        })
    }
    setUserCookie(){
        let username = this.state.username;
        if(username){
            cookie.save('UserName',username)
        }
        
    }
    render() { 
        if(cookie.load('UserName')){
            return <Route path="/project" component={Project}/>
        }
        return (
        <section className="loginPage">
            <form>
                <h1 className="logo">Teambition</h1>
                <input 
                    type="text" 
                    className="username" 
                    ref="username"
                    placeholder="用户名"
                    onKeyUp = {this.changeUsernameValue}
                />
                <input 
                    type="password" 
                    className="pw" 
                    ref="pw"
                    placeholder="密码"
                    onKeyUp = {this.changePasswordValue}
                />
                <span 
                    className="login"
                    onClick= {this.loginClick}
                >登录</span>
                <span 
                    className="register"
                    onClick= {this.registerClick}
                >注册</span>
            </form>
        </section>
        )
    }
}
 
export default withRouter(Login);