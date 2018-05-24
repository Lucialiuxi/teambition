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

import { createAFile , getAllFilesInfo } from '@/server/requestData'


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
        this.state = { 
            data:[]
        }
    }
    componentWillMount(){
        let user = cookie.load('UserName');
        // console.log('11111',this.props.state)
    }
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps')
        let data = nextProps.state.getFileInfo;
        //拿到新建文件的信息，发送给后端
        let beforeData = this.props.state.getFileInfo;
        console.log(data,beforeData)
        let newFileInfo = data.pop();
        if(((beforeData.length>1) && data.length!==beforeData.length)||
            beforeData.length===0
        ){
            createAFile(newFileInfo).then(({data})=>{
                console.log('新建',data)
                //如果新建文件信息在数据库存失败，就不更新界面
                if(!data.success) return;
                let arr = [...this.state.data]
                arr.push(data.lastestFileInfoData)
                this.setState({
                    data:arr
                })
            })
        }
    }
    componentWillMount(){
        let {dispatch} = this.props;
        //请求数据
        // console.log('componentDidMount');
        let user = cookie.load('UserName');
        getAllFilesInfo({userLoginName:user}).then(({data})=>{
            if(data.AllFilesInfoData.length>0){
                this.setState({
                    data:[...data.AllFilesInfoData]
                })
            }
        })
    }
    render() { 
        console.log(this.state.data)
        return ( 
           <div className="projectPageWrap">
                <Layout  className="projectPage">
                    <Header className="projectPageHead">
                        {/* 公共导航 */}
                        <CommonNav/>
                    </Header>
                    <Content  className="projectPageContent">
                        {/* 首页文件图标区 */}
                        <FileCover fileInfoData={this.state.data}/>
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
    // return {//把这个方法传给TodoList组件，再传给Todo组件
    //     createAFile: () => {
    //         dispatch(CreateAFile())
    //     }
    // }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Project));