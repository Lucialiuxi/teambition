import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//引入action
import * as allActions  from '@/actions/action';
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

//要修改的数据
const mapStateToProps = state => {
  return  {
      state
  }
}
//要提交的动作
const mapDispatchToProps = dispatch => {
  return bindActionCreators(allActions,dispatch)
} 
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
