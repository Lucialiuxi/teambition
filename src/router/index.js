//路由信息
import React, { Component } from 'react';
import { routes } from './router.js'
import { Route } from 'react-router-dom';
import { concatStyleSets } from '@uifabric/styling';

class LoginOrProject extends Component {
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
   
// let arr=[
//   {
//     path:'/',
//     c:'a'
//   },
//   {
//     path:'/1',
//     c:'b',
//     child:[
//       {
//         path:'/z',
//         c:'z'
//       },
//       {
//         path:'/x',
//         c:'x'
//       }
//     ]
//   },
//   {
//     path:'/2',
//     c:'c'
//   }
// ]

// let Narr=[];
// function render(arr,Ppath){
//   console.log(Ppath)
//   arr.forEach(val=>{
//     if(val.child){
//       Narr.concat(render(val.child,val.path))
//     }else{
//       let obj = <Route 
//         key={Ppath? Ppath+val.path : val.path}
//         exact
//         path={val.path}
//         component={val.component}
//       ></Route>
//       Narr.push(obj)
//     }
//   })
//   return Narr;
// }
// console.log(render(arr))
  export default LoginOrProject;