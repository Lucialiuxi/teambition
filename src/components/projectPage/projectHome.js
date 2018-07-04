import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './project.css';
import cookie from 'react-cookies';
import {
    BrowserRouter as Router,
    Route,
    withRouter,
    Switch
  } from 'react-router-dom';

import { Layout } from 'antd';
import CommonNav  from '../commons/commonNav';
//文件夹图片区
import FileCover from '../fileSurface/fileCover';
//点击一个文件夹，内部显示
import FileInside from '@/components/fileDetail/fileInside';

import * as fileActions  from '@/actions/fileAction';
import * as workActions  from '@/actions/workAction';
import { getAllFilesInfo , GetWorkFileViewTypeServer } from '@/server/requestData';


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
        let { AllFileInfoArr,
            ClearStateAction,
            saveWorksViewTypeAction, 
            history , 
            location ,
        } = this.props;
        if(location.pathname==='/projects'){//如果是大图标文件页面，就清空当前文件id和所在的项目文件区
            this.setState({
                currentFileId:'',
                activeBar:''
            })
        //每次登录的时候先清空state里面的大图标文件数据
        ClearStateAction()
        }else{
            let {t} = this.props.match.params;
            let path = this.props.location.pathname;
            let arr = path.split('/');
            if(arr.length===4){
                t = arr[arr.length-1]
            }else if(arr.length===5){
                t = arr[arr.length-2]
            }
            if( t === 'tasks'){
                this.setState({
                    activeBar:'1'
                })
            }else if(t === 'works'){
                this.setState({
                    activeBar:'3'
                })
            }
        }
        let user = cookie.load('UserName');
        if(!user){//登出的时候回到登录页
            history.push('/login');
        }
        //请求项目文件信息数据
        getAllFilesInfo({userLoginName:user}).then(({data})=>{
            if(data.AllFilesInfoData.length>0){
                AllFileInfoArr(data.AllFilesInfoData)
            }
        })
        //拿到works文件是缩略图模式还是列表模式
        GetWorkFileViewTypeServer({username:cookie.load('UserName')}).then(({data})=>{
            if(data.success){
                saveWorksViewTypeAction({worksViewType:data.data.worksViewType})
            }
        })
    }
    //点击大图标文件，进入到文件内部 跳转路由 
    clickInToTheFile=(fileId,userLoginName,FileName)=>{
        let { history } = this.props;
        this.setState({
            currentFileId:fileId
        })
        let o = {pathname:`/project/${fileId}/tasks`,state: {FileName}};
        history.push(o);
    }

    //点击文件内部切换 到任务/文件/群聊
    clickTabBar=(t,k,fId)=>{
        let { history } = this.props;
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
        if(fileDetailAreaWrap){
            let cth=fileDetailAreaWrap.parentNode.offsetHeight
            fileDetailAreaWrap.style.height = cth + 'px';
            if(subNavWrap){
                let H1 = subNavWrap.lastElementChild.offsetHeight;
                let H2 = subNavWrap.lastElementChild.firstElementChild.offsetHeight;
                subNavWrap.lastElementChild.lastElementChild.style.height = H1 - H2 + 'px';
            }
        }
    }
    componentWillReceiveProps(nextProps){
        let { location:{pathname} } = nextProps;
        let arr = pathname.split('/');
        if(arr[arr.length-1]==='tasks'){
           this.setState({
                activeBar:'1'
           }) 
        }else if(arr[arr.length-1]==='works'){
            this.setState({
                 activeBar:'3'
            }) 
        }
    }
    render() {
        let t = this.state.activeBar ? this.state.activeBar : '';
        let { location: {pathname} } = this.props;
        let arr = pathname.split('/');
        let myId = ''
        if(arr[arr.length-2]==='work'){
            myId = arr[arr.length-1];
        }
        return ( 
           <div className="projectPageWrap">
                <Layout  className="projectPage">
                    <Header className="projectPageHead">
                        {/* 公共导航 */}
                        <CommonNav {...this.props}/>
                    </Header>
                    <Content  className="projectPageContent">
                        <Switch>
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
                                    path={`/project/:${this.state.currentFileId}/:${t}`}
                                    render={()=><FileInside 
                                                    tabBar={this.clickTabBar}
                                                    activeBar={t}
                                                    currentFileId={this.state.currentFileId}
                                                />
                                    }
                                />
                                {/* works文件 */}
                                <Route 
                                    path={`/project/:${this.state.currentFileId}/works/:${myId}`}
                                    render={()=><FileInside 
                                                    tabBar={this.clickTabBar}
                                                    activeBar='3'
                                                    currentFileId={this.state.currentFileId}
                                                />
                                    }
                                />
                            </div>
                        </Router>
                        </Switch>
                    </Content>
                </Layout>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return  {
        state
    }
}
 
const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign(fileActions,workActions),dispatch);
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Project));