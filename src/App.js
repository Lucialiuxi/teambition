import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//引入action
import * as allActions  from '@/actions/action';
import './App.css';
import 'antd/dist/antd.css'

import {BrowserRouter as Router , withRouter } from 'react-router-dom'

import LoginOrProject from '@/router/index';
import cookie from 'react-cookies';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount(){
    const {history } = this.props;
    if(cookie.load('UserName')){
      history.push('/project')
    }else{
      history.push('/login')
    }
  }
  render() {
    return (
        <div className="App">
            <LoginOrProject dispatch={this.props.dispatch}/>
        </div>
    );
  }
}

export default withRouter(connect()(App));
