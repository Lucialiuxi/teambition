import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css'

//路由
/**
 * BrowserRouter as Router 意思就是从react-router-dom引入BrowserRouter取名Router
 */
import {BrowserRouter as Router ,Route , Link } from 'react-router-dom'
// import routes from '@/router/router'
import Login from '@/components/loginPage/login';
import Project from '@/components/projectPage/projectHome';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
            <Route path="/login" component={Login}/>
        </Router>
        <Router>
            <Route path="/project" component={Project}/>
        </Router>
      </div>
    );
  }
}

export default App;
