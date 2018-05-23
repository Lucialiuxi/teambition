import React, { Component } from 'react';
import { connect } from 'react-redux';
import './project.css';
import { withRouter } from 'react-router-dom';

import { Layout } from 'antd';
import CommonNav  from '../commons/commonNav';
import cookie from 'react-cookies';
//文件夹图片区
import FileCover from '../fileSurface/fileCover'
//点击一个文件夹，内部显示
import FileInside from './fileInside';
const { Header, Content } = Layout;


class Project  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentWillMount(){
        let user = cookie.load('UserName');
    }
    render() { 
        return ( 
           <div>
                <Layout  className="projectPage">
                    <Header className="projectPageHead">
                        {/* 公共导航 */}
                        <CommonNav/>
                    </Header>
                    <Content  className="projectPageContent">
                        {/* 首页文件图标区 */}
                        <FileCover/>
                        {/* <FileInside/> */}
                    </Content>
                </Layout>
           </div>
        )
    }
}
 
export default withRouter(connect()(Project));