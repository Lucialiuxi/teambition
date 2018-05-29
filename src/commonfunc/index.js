import React, { Component } from 'react';
import { Route, Link  } from "react-router-dom";

export function CustomeLink({ tag,to,event,className,label}) {
    return (
      <Route 
        path={to}
        children={
          ({match}) => {
              let l = <Link 
                className={className}
                to={to}>{label}
              </Link>;
            
            l = (tag && tag !== "a") ? React.createElement(tag, null, l) : l;
  
            return l
          }
        }
      >    
      </Route>
    );
  }


  // export function CustomeLink({ tag, activeClass,to, exact,label}) {
  //   return (
  //     <Route 
  //       path={to}
  //       exact={exact}
  //       children={
  //         ({match}) => {
  //             let l = <Link 
  //             className={match ? activeClass : ''}
  //               to={to}>{label}
  //             </Link>;
            
  //           l = (tag && tag !== "a") ? React.createElement(tag, null, l) : l;
  
  //           return l
  //         }
  //       }
  //     >    
  //     </Route>
  //   );
  // }