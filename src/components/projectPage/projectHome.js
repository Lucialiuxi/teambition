import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import './project.css';
import cookie from 'react-cookies';
import Login from '../loginPage/login';import LoginOrProject from '@/router/index';

import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter
  } from 'react-router-dom';

import { Layout } from 'antd';
import CommonNav  from '../commons/commonNav';
//文件夹图片区
import FileCover from '../fileSurface/fileCover'
//点击一个文件夹，内部显示
import FileInside from './fileDetail/fileInside';

//引入action
import * as allActions  from '@/actions/action';
import { getAllFilesInfo } from '@/server/requestData'
import routes from '@/router/router';


const { Header, Content } = Layout;
/** 项目文件信息  
    loginName:String,用户的登录名是唯一的
    FileName:  String,
    FileAbstract: String,
    fileId: Number,
    star: Boolean, 
    inRecycleBin: Boolean
 */

class Project  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                currentFileId:'',
            }
        }
    }
    componentWillMount(){
        // console.log('componentWillMount')
        let { dispatch , history } = this.props
        dispatch(allActions.ClearStateAction());
        //请求数据
        let user = cookie.load('UserName');
        if(!user){
            history.push('login')
        }
        getAllFilesInfo({userLoginName:user}).then(({data})=>{
            // console.log(data.AllFilesInfoData)
            if(data.AllFilesInfoData.length>0){
                dispatch(allActions.AllFileInfoArr(data.AllFilesInfoData))
            }
        })
    }
    //点击大图标文件，进入到文件内部
    clickInToTheFile=(fileId,userLoginName)=>{
        let { history , location} = this.props;
        this.setState({
            currentFileId:fileId
        })
    }
    componentDidUpdate(){
        // console.log('componentDidUpdate',this.props)
    }
    render() {
        let getFileInfo = this.props.state.getFileInfo;
        return ( 
           <div className="projectPageWrap">
                <Layout  className="projectPage">
                    <Header className="projectPageHead">
                        {/* 公共导航 */}
                        <CommonNav {...this.props}/>
                    </Header>
                    <Content  className="projectPageContent">
                        <Router>
                            <div>
                                {/* 首页文件图标区 */}
                                <Route 
                                    path="/projects" 
                                    exact 
                                    render={()=><FileCover 
                                                    fileInfoData={getFileInfo}  
                                                    clickInToTheFile={this.clickInToTheFile} 
                                                    goToFileCoverPage={this.goToFileCoverPage}
                                                />
                                    }
                                />
                                {/* 项目文件详情 */}
                                <Route 
                                    exact 
                                    path={`/project/:${this.state.currentFileId}/tasks`} 
                                    component={FileInside}
                                />
                            </div>
                        </Router>
                    </Content>
                </Layout>
           </div>
        )
    }
}
//要修改的数据
const mapStateToProps = state => {
    // console.log(state)
    return  {
        state
    }
  }
 
export default withRouter(connect(mapStateToProps,null)(Project));