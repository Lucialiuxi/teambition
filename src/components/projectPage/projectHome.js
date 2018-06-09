import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import './project.css';
import cookie from 'react-cookies';
import Login from '@/components/loginPage/login';
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
        if(location.pathname==='/projects'){//如果是大图标文件页面，就清空当前文件id和所在的项目文件区
            this.setState({
                currentFileId:'',
                activeBar:''
            })
        }else{
            let {t} = this.props.match.params;
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
        let user = cookie.load('UserName');
        //每次登录的时候先清空state里面的大图标文件数据
        dispatch(allActions.ClearStateAction());

        if(!user){
            history.push('/login');
        }
        //请求项目文件信息数据
        getAllFilesInfo({userLoginName:user}).then(({data})=>{
            if(data.AllFilesInfoData.length>0){
                dispatch(allActions.AllFileInfoArr(data.AllFilesInfoData))
            }
        })
    }
    //点击大图标文件，进入到文件内部 跳转路由 
    clickInToTheFile=(fileId,userLoginName,FileName)=>{
        let { history , dispatch } = this.props;
        this.setState({
            currentFileId:fileId
        })
        let o = {pathname:`/project/${fileId}/tasks`,state: FileName};
        history.push(o);
    }

    //点击文件内部切换 到任务/文件/群聊
    clickTabBar=(t,k,fId)=>{
        let { history } = this.props;
        console.log('tabBar',t,k,fId)
        this.setState({
            activeBar:k,
            currentFileId:fId
        })
        history.push(`/project/${fId}/${t}`)
    }
    componentDidMount(){
        if(this.state.activeBar && cookie.load('UserName')){//在项目文件详情页，自适应变化高度
            this.resizeDetailPage();
            window.onresize=()=>{
                this.resizeDetailPage();
            }
        }
    }
    resizeDetailPage=()=>{//在项目文件详情页，自适应变化高度
        let fileDetailAreaWrap = document.getElementById('ct');
        let subNavWrap = document.getElementById('subNavWrap');
        let cth=fileDetailAreaWrap.parentNode.offsetHeight
        fileDetailAreaWrap.style.height = cth + 'px';
        if(subNavWrap){
            let H1 = subNavWrap.lastElementChild.offsetHeight;
            let H2 = subNavWrap.lastElementChild.firstElementChild.offsetHeight;
            subNavWrap.lastElementChild.lastElementChild.style.height = H1 - H2 + 'px';
        }
    }
    render() {
        let t = this.state.activeBar ? this.state.activeBar : '1';
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
                                                    clickInToTheFile={this.clickInToTheFile}
                                                />
                                    }
                                />
                                {/* 项目文件详情 */}
                                <Route 
                                    exact 
                                    path={`/project/:${this.state.currentFileId}/:${t}`}
                                    render={()=><FileInside 
                                                    tabBar={this.clickTabBar}
                                                    activeBar={t}
                                                    currentFileId={this.state.currentFileId}
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