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
    },
    {
      title: '日程',
      avatar:<Icon type="calendar" style={{ fontSize: 20, color: '#aeaeae' }} />
    },
    {
      title: '分享',
      avatar:<Icon type="file-text" style={{ fontSize: 20, color: 'grey' }} />
    },
  ];

  class CommonNav extends Component {
      constructor(props) {
          super(props);
          this.state = {  }
      }
      clickLoginOut=()=>{
          let { history } = this.props;
          cookie.remove('UserName');
          cookie.remove('BreadCrumb');
          history.replace('/login')
      }
      render() { 
          let user = cookie.load('UserName');
          return ( 
            <div className="commonNav">
                <div className="Nav-bar-left">
                    <div className="search-bar">
                        <Icon type="search"/>
                        <input type="text" className="searchProject" placeholder="搜索个人项目"/>
                    </div>
                    {/* 下拉选择项目 */}
                    <List
                        className="ProjectTypeSelect"
                        itemLayout="horizontal"
                        dataSource={ProjectTypes}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            className="ProjectTypeItem"
                            avatar={item.avatar}
                            title={<a href="https://ant.design">{item.title}</a>}
                            />
                        </List.Item>
                        )}
                    />
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