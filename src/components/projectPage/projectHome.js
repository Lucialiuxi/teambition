import React, { Component } from 'react';
import './project.css'
import { BrowserRouter as Router, Route , withRouter } from 'react-router-dom'

import { Layout } from 'antd';
import CommonNav  from '../commons/commonNav.js'
import FileCover from '../fileSurface/fileCover.js'

const { Header, Content } = Layout;


class Project  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
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
                    </Content>
                </Layout>
           </div>
        )
    }
}
 
export default withRouter(Project);