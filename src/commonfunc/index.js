import React from 'react';
import { Route, Link  } from "react-router-dom";

export function CustomeLink({ tag,to,event,className,label}) {
    return (
      <Route 
        path={to}
        children={
          ({match}) => {
              let l = <Link
                        className={className}
                        to={to}
                      >{label}
              </Link>;
            
            l = (tag && tag !== "a") ? React.createElement(tag, null, l) : l;
  
            return l
          }
        }
      >    
      </Route>
    );
  }

//补零
export function add0(m){return m<10?'0'+m:m }
//时间戳转化成时间格式
export function timeFormat(timestamp){
  //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
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