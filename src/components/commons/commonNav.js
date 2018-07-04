import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import cookie from 'react-cookies';

import { Icon , List, Avatar } from 'antd';

const ProjectTypes = [
    {
      title: '项目',
      avatar:<Icon type="folder-open" style={{ fontSize: 20, color: '#aeaeae' }} />
    },
    {
      title: '任务',
      avatar:<Icon type="check-square-o" style={{ fontSize: 20, color: '#aeaeae' }} />
    },
    {
      title: '文件',
      avatar:<Icon type="file" style={{ fontSize: 20, color: '#aeaeae' }} />
    }
  ];

  class CommonNav extends Component {
      constructor(props) {
          super(props);
          this.state = { 
              changePath:false,
           }
      }
      clickLoginOut=()=>{
          let { history } = this.props;
          let allCookies = cookie.loadAll();
          for(let attr in allCookies){
              cookie.remove(attr, { path: '/' })
          }
          history.replace('/login')
      }
      GoToOtherPath = (e) => {//跳转路由
        let t = e.target;
        let { location: {pathname} , history } = this.props;
        if(t.classList.contains('ProjectTypeSelect') ||
           t.classList.contains('ant-spin-nested-loading') ||
           t.classList.contains('ant-spin-container')
        ){
          return;  
        }else if(t.classList.contains('ant-list-item-meta-avatar')
        ){
            t = t.nextElementSibling;
        }else if(t.nodeName==='I'){
            t = t.parentNode.nextElementSibling;
        }
        let nextPath = '';
        if(t.innerText.trim()==='项目' && pathname!=='/projects'){
            nextPath = `/projects`;
        }else if(t.innerText.trim()==='任务' && pathname.indexOf('works')!==-1){
            let fileId = pathname.match(/\d+/g)[0]*1;
            nextPath = `/project/${fileId}/tasks`;
        }else if(t.innerText.trim()==='文件' && pathname.indexOf('tasks')!==-1){
            let fileId = pathname.match(/\d+/g)[0]*1;
            nextPath = `/project/${fileId}/works`;
        }
        if(nextPath){
            history.push(nextPath);
        }
        if(this._mouted){
            this.setState({
                changePath:false,
            })
        }
      }
      showOrHideProjectTypeSelect = () => {
        let { changePath } = this.state;
        this.setState({
            changePath:!changePath
        })
      }
      componentDidMount(){
        this._mouted = true;
        document.onclick = (e) => {
            let t = e.target;
            let ProjectTypeSelectTag = (
                t.classList.contains('extendBtn') ||
                t.classList.contains('ProjectTypeSelect') ||
                t.classList.contains('ant-spin-nested-loading')
            )
            if(!ProjectTypeSelectTag && this._mouted){
                this.setState({
                    changePath:false,
                })
            }
        }
      }
      componentWillUnmount(){
        this._mouted = false;
      }
      render() { 
          let { changePath } = this.state;
          let user = cookie.load('UserName');
          return ( 
            <div className="commonNav">
                <div className="Nav-bar-left">
                    <div className="search-bar">
                        <Icon type="search"/>
                        <input type="text" className="searchProject" placeholder="搜索个人项目"/>
                    </div>
                    {/* 下拉选择项目 */}
                    <Icon 
                        type="plus-circle"  
                        className="extendBtn"
                        style={{ fontSize: 20, color: '#3b93ff' }} 
                        onClick={this.showOrHideProjectTypeSelect}
                    />
                    { changePath ? <List
                        className="ProjectTypeSelect"
                        itemLayout="horizontal"
                        dataSource={ProjectTypes}
                        renderItem={item => (
                        <List.Item  onClick={this.GoToOtherPath}>
                            <List.Item.Meta
                            className="ProjectTypeItem"
                            avatar={item.avatar}
                            title={<a>{item.title}</a>}
                            />
                        </List.Item>
                        )}
                    /> : null }
                </div>
                <div  className="Nav-bar-right">
                    <span className="userAvatar">
                        <Avatar size="large" icon="user" />
                    </span>
                    <span className="loginOut" onClick={this.clickLoginOut}>登出</span>
                    <span className="mine">你好，{user}~~</span>
                </div>
            </div>
           )
      }
  }
   
  export default withRouter(connect()(CommonNav));