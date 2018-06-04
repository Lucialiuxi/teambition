import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs ,Icon} from 'antd';
import { withRouter } from 'react-router-dom';
import Groupchat from '@/components/fileDetail/groupchat/groupchat';
import Posts from '@/components/fileDetail/posts/posts';
import Schedules from '@/components/fileDetail/schedules/schedules';
import Tasks from '@/components/fileDetail/tasks/tasks';
import Works  from '@/components/fileDetail/works/works';
import routes from '@/router/index';
import classnames from 'classnames';
import { CreateTaskItemServer } from '@/server/requestData';
import {CreateDefaultTaskItemsAction}  from '@/actions/action';

const TabPane = Tabs.TabPane;

class SubNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey:this.props.activeBar
        }
    }
    //点击回到首页
    goToFileCoverPage=(ev)=>{
        let { history } = this.props;
        history.push('/projects');
    }
    //点击切换 任务  分享 文件 日程 群聊
    tabToOther=(activeKey)=>{
        //点击项目详情分类名字的时候传 【点击的项目详情分类名字、数字  文件id】 --到Project组件中
        let { match , tabBar } = this.props;
        let t = '';
        if( activeKey==='1' || activeKey==='' ){
            t = 'tasks';
            this.setState({
                activeKey:'1'
            })
        }else if(activeKey==='2'){
            t = 'posts';
            this.setState({
                activeKey:'2'
            })
        }else if(activeKey==='3'){
            t = 'works';
            this.setState({
                activeKey:'3'
            })
        }else if(activeKey==='4'){
            t = 'schedules';
            this.setState({
                activeKey:'4'
            })
        }else if(activeKey==='5'){
            t = 'groupchat';
            this.setState({
                activeKey:'5'
            })
        }
        tabBar(t,activeKey,this.state.fId);
    }
    componentWillMount(){
        let CurrentFileId = this.props.location.pathname.match(/\d+/g)[0];
        console.log(CurrentFileId)
        if(CurrentFileId){
            //找到当前项目文件夹的数据
            let currentFile = this.props.state.getFileInfo.filter(val=>val.fileId==CurrentFileId)[0];
            console.log(currentFile)
            //点击进入文件的时候,没有点击进入过就创建默认的三个任务列表，创建过就直接获取
            if(currentFile){
                console.log('currentFile')
                CreateTaskItemServer({fileId:CurrentFileId,loginName:currentFile.userLoginName}).then(({data})=>{
                    console.log('cccccccjjjj',data)
                    this.props.dispatch(CreateDefaultTaskItemsAction(data.CurrentTaskItemInfo))
                })
                this.setState({
                    fId:CurrentFileId,
                    CurrentFileData:currentFile
                })
            }
        }
    }
    render() {
        let {location,match,state} = this.props;
        //拿到当前项目文件的id
        let fileId = location.pathname.match(/\d+/g)[0];
        let currentFile;
        if(fileId){
            currentFile = state.getFileInfo.filter(val=>val.fileId==fileId)[0];
        }
        return (
            <div id="subNavWrap">
                <div id="subNavLeftTool">
                    <span onClick={this.goToFileCoverPage}>首页</span>
                    <Icon type="right" />
                    <span>
                        {currentFile?currentFile.FileName:''}
                        <Icon type="down" style={{ fontSize: 12}} />
                    </span>   
                    <Icon type="star" className={currentFile&&currentFile.star ? 'starActive' : ''}/>
                </div>
                <Tabs 
                    id="subNavTab" 
                    activeKey={this.state.activeKey}
                    onChange={this.tabToOther}
                >
                    <TabPane tab="任务" key="1" >
                        <Tasks/>
                    </TabPane>
                    <TabPane tab="分享" key="2">
                        <Posts/>
                    </TabPane>
                    <TabPane tab="文件" key="3">
                        <Works/>
                    </TabPane>
                    <TabPane tab="日程" key="4">
                        <Schedules/>
                    </TabPane>
                    <TabPane tab="群聊" key="5">
                        <Groupchat/>
                    </TabPane>
                </Tabs>
            </div> 
         )
    }
}
 //要修改的数据
const mapStateToProps = state => {
    return  {
        state
    }
  }
 
export default withRouter(connect(mapStateToProps,null)(SubNav));