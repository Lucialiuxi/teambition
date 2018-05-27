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
import FileInside from './fileInside';

//引入action
import * as allActions  from '@/actions/action';
import { getAllFilesInfo } from '@/server/requestData'


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
            data:[]
        }
    }
    componentWillMount(){
        // console.log( 'componentWillMount')
        let { dispatch} = this.props
        //请求数据
        let user = cookie.load('UserName');
        getAllFilesInfo({userLoginName:user}).then(({data})=>{
            if(data.AllFilesInfoData.length>0){
                dispatch(allActions.AllFileInfoArr(data.AllFilesInfoData))
            }
        })
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