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
import FileCover from '../fileSurface/fileCover';
//点击一个文件夹，内部显示
import FileInside from '@/components/fileDetail/fileInside';

//引入action
import * as allActions  from '@/actions/action';
import { getAllFilesInfo } from '@/server/requestData';
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
                activeBar:''
            }
        }
    }
    componentWillMount(){
        let { dispatch , history , location } = this.props;
        if(location.pathname==='/projects'){
            this.setState({
                currentFileId:'',
                activeBar:''
            })
        }else{
            let {t} = this.props.match.params
            if( t === 'tasks'){
                this.setState({
                    activeBar:'1'
                })
            }else if(t === 'posts'){
                this.setState({
                    activeBar:'2'
                })
            }else if(t === 'works'){
                this.setState({
                    activeBar:'3'
                })
            }else if(t === 'schedules'){
                this.setState({
                    activeBar:'4'
                })
            }else if(t === 'groupchat'){
                this.setState({
                    activeBar:'5'
                })
            }

        }
        dispatch(allActions.ClearStateAction());
        //请求数据
        let user = cookie.load('UserName');
        if(!user){
            history.push('login')
        }
        getAllFilesInfo({userLoginName:user}).then(({data})=>{
            if(data.AllFilesInfoData.length>0){
                dispatch(allActions.AllFileInfoArr(data.AllFilesInfoData))
            }
        })
    }
    //点击大图标文件，进入到文件内部
    clickInToTheFile=(fileId,userLoginName)=>{
        let { history } = this.props;
        this.setState({
            currentFileId:fileId
        })
        history.push(`/project/${fileId}/tasks`);
    }
    clickTabBar=(t,k,fId)=>{
        let { history } = this.props;
        // console.log('tabBar',t,k,fId)
        this.setState({
            activeBar:k,
            currentFileId:fId
        })
        history.push(`/project/${fId}/${t}`)
    }
    componentDidMount(){
        let fileDetailAreaWrap = document.getElementById('ct');
        let contentBox = fileDetailAreaWrap.parentNode;
        let h = contentBox.offsetHeight;
        fileDetailAreaWrap.style.height = h + 'px';
    }
    render() {
        let getFileInfo = this.props.state.getFileInfo;
        let t = this.state.activeBar ? this.state.activeBar : '1';
        console.log(t,this.state.activeBar)
        return ( 
           <div className="projectPageWrap">
                <Layout  className="projectPage">
                    <Header className="projectPageHead">
                        {/* 公共导航 */}
                        <CommonNav {...this.props}/>
                    </Header>
                    <Content  className="projectPageContent">
                        <Router>
                            <div id="ct">
                                {/* 首页文件图标区 */}
                                <Route 
                                    path="/projects" 
                                    exact 
                                    render={()=><FileCover 
                                                    fileInfoData={getFileInfo}  
                                                    clickInToTheFile={this.clickInToTheFile}
                                                />
                                    }
                                />
                                {/* 项目文件详情 */}
                                <Route 
                                    exact 
                                    path={`/project/:${this.state.currentFileId}/:${t}`}
                                    render={()=><FileInside 
                                                    fileInfoData={getFileInfo}
                                                    tabBar={this.clickTabBar}
                                                    activeBar={t}
                                                />
                                    }
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