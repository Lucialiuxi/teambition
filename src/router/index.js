//路由信息
import React from 'react';
import { routes } from './router.js'
import { Route } from 'react-router-dom';

class LoginOrProject extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  }
    }
    render() {
      return ( 
        <div className="LoginOrProject">
            {
              routes.map((item) => {
                return (
                    <Route 
                      key={item.path}
                      exact
                      path={item.path}
                      component={item.component}
                    ></Route> 
                )
              })
            }
        </div>
      )
    }
  }

  export default LoginOrProject;