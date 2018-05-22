import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css'

import {BrowserRouter as Router ,Route , Redirect , withRouter } from 'react-router-dom'
import { withCookies} from 'react-cookie';

import LoginOrProject from '@/router/index';
import { CookiesProvider } from 'react-cookie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount(){
    const { cookies,history } = this.props;
    if(cookies.get('UserName')){
      history.push('/project')
    }else{
      history.push('/login')
    }
  }
  render() {
    return (
        <div className="App">
            <LoginOrProject/>
        </div>
    );
  }
}

export default withCookies(withRouter(App));
