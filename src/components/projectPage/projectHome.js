import React, { Component } from 'react';
import './project.css'
import { BrowserRouter as Router, Route , withRouter } from 'react-router-dom'

import { Layout } from 'antd';
import CommonNav  from '../commons/commonNav';
import { withCookies} from 'react-cookie';
//文件夹图片区
import FileCover from '../fileSurface/fileCover'
//点击一个文件夹，内部显示
import FileInside from './fileInside'
const { Header, Content } = Layout;


class Project  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentWillMount(){
        let {cookies} = this.props;
        let user = cookies.get('UserName');
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
 
export default withCookies(withRouter(Project));