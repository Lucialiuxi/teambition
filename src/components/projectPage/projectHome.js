import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import './project.css';
import { withRouter } from 'react-router-dom';
import cookie from 'react-cookies';

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
                pathName:'',
            }
        }
    }
    componentWillMount(){
        let { location } = this.props;
        this.setState({
            pathName:location.pathname
        })
        console.log( 'componentWillMount',this.props)
        let { dispatch} = this.props
        //请求数据
        let user = cookie.load('UserName');
        getAllFilesInfo({userLoginName:user}).then(({data})=>{
            if(data.AllFilesInfoData.length>0){
                dispatch(allActions.AllFileInfoArr(data.AllFilesInfoData))
            }
        })
    }
    //点击大图标文件，进入到文件内部
    clickInToTheFile=(fileId,userLoginName)=>{
        let { history , location} = this.props;
        console.log('clickInToTheFile',fileId,userLoginName,this.props)
        history.push(`/project/${fileId}`)
        this.setState({
            pathName:location.pathname
        })
    }
    render() {
        let getFileInfo = this.props.state.getFileInfo;
        // console.log(this.props)
        let {pathName} = this.state ;
        console.log(pathName)
        let pageShow;
        if(pathName==='/project'){
            pageShow = <FileCover fileInfoData={getFileInfo} clickInToTheFile={this.clickInToTheFile}/> 
        }else if(pathName!=='/project'&&pathName.split(0,9)==='/project/'){
            pageShow = <FileInside/>;
        }
        return ( 
           <div className="projectPageWrap">
                <Layout  className="projectPage">
                    <Header className="projectPageHead">
                        {/* 公共导航 */}
                        <CommonNav {...this.props}/>
                    </Header>
                    <Content  className="projectPageContent">
                        {/* 首页文件图标区 */}
                        {pageShow}
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

// //要提交的动作
// const mapDispatchToProps = dispatch => {
//     return bindActionCreators(allActions,dispatch)
// }  
export default withRouter(connect(mapStateToProps,null)(Project));