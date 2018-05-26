import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './project.css';
import { withRouter } from 'react-router-dom';
import cookie from 'react-cookies';

import { Layout } from 'antd';
import CommonNav  from '../commons/commonNav';
//文件夹图片区
import FileCover from '../fileSurface/fileCover'
//点击一个文件夹，内部显示
import FileInside from './fileInside';

//引入action
import * as allActions  from '@/actions/action';
import { createAFileServer , getAllFilesInfo } from '@/server/requestData'


const { Header, Content } = Layout;
/** 项目文件信息  
    loginName:String,用户的登录名是唯一的
    FileName:  String,
    FileAbstract: String,
    fileId: Number,
    star: Boolean
 */

class Project  extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillReceiveProps=(nextProps)=>{
        let { dispatch , createAFile } = this.props
        // console.log(nextProps.state.getFileInfo)
        // console.log(this.props.state.getFileInfo)
        let data = nextProps.state.getFileInfo;
        //拿到新建文件的信息，发送给后端
        let beforeData = this.props.state.getFileInfo;
        let newFileInfo = data.pop();
        console.log(newFileInfo)
        if(((beforeData.length>1) && data.length!==beforeData.length)||
            beforeData.length===0
        ){
            createAFileServer(newFileInfo).then(({data})=>{
                console.log(data.lastestFileInfoData)
                //如果新建文件信息在数据库存失败，就不更新界面
                if(!data.success) return;
                console.log(data)
                dispatch(createAFile(data.lastestFileInfoData))
            })
        }
    }
    componentWillMount(){
        let { dispatch , AllFileInfoArr } = this.props
        //请求数据
        let user = cookie.load('UserName');
        // getAllFilesInfo({userLoginName:user}).then(({data})=>{
        //     if(data.AllFilesInfoData.length>0){
        //         dispatch(AllFileInfoArr(data.AllFilesInfoData))
        //     }
        // })
    }
    render() { 
        console.log(this.props)
        let getFileInfo = this.props.state.getFileInfo;
        return ( 
           <div className="projectPageWrap">
                <Layout  className="projectPage">
                    <Header className="projectPageHead">
                        {/* 公共导航 */}
                        <CommonNav/>
                    </Header>
                    <Content  className="projectPageContent">
                        {/* 首页文件图标区 */}
                        <FileCover fileInfoData={getFileInfo}/>
                        {/* <FileInside/> */}
                    </Content>
                </Layout>
           </div>
        )
    }
}
//要修改的数据
const mapStateToProps = state => {
    console.log(state)
    return  {
        state
    }
  }
//要提交的动作
const mapDispatchToProps = dispatch => {
    return bindActionCreators(allActions,dispatch)
  }  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Project));