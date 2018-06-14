import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import 'antd/dist/antd.css';

import { withRouter } from 'react-router-dom'

import LoginOrProject from '@/router/index';
import cookie from 'react-cookies';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount(){
    const { history , location } = this.props;
    if(location.pathname.slice(0,9)!=='/project/'){
      if(cookie.load('UserName')){
        history.push('/projects')
      }else{
        history.replace('/login')
      }
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

const mapStateToProps = state => {
  return  {
      state
  }
}

export default withRouter(connect(mapStateToProps,null)(App));
