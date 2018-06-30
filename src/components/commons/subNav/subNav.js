import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs ,Icon} from 'antd';
import { withRouter , Link } from 'react-router-dom';
import Groupchat from '@/components/fileDetail/groupchat/groupchat';
import Posts from '@/components/fileDetail/posts/posts';
import Schedules from '@/components/fileDetail/schedules/schedules';
import Tasks from '@/components/fileDetail/tasks/tasks';
import Works  from '@/components/fileDetail/works/works';
import { GetTaskItemServer ,
         GetAllSubTasksServer ,
         GetAllWorksFileUnderParentWorksFileServer
} from '@/server/requestData';

import * as taskActions from '@/actions/taskAction';
import * as workActions from '@/actions/workAction.js';

const TabPane = Tabs.TabPane;

class SubNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey:'1'
        }
    }
    //点击切换 任务  分享 文件 日程 群聊
    tabToOther=(activeKey)=>{
        //点击项目详情分类名字的时候传 【点击的项目详情分类名字、数字  文件id】 --到Project组件中
        let { tabBar , emptyBreadCrumbAction } = this.props;
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
            let { location:{ pathname } , GetAllWorksFileUnderParentWorksFileAction } = this.props;
            let arr = pathname.split('/');
            let fileId = arr[2]*1;
            let parentId = '';
            GetAllWorksFileUnderParentWorksFileServer({
                fileId,parentId
            }).then(({data})=>{
                if(data.success){
                    GetAllWorksFileUnderParentWorksFileAction(data.data)
                }
    
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

        if(activeKey!=='3'){//不在works页的时候，清空面包屑导航
            emptyBreadCrumbAction()

        }
    }
    componentWillMount(){
        let { 
                location , 
                match:{path} , 
                state: {getFileInfo} , 
                TaskItemsInCurrentFileAction,
                findAllSubTasksInsideAfileAction 
            } = this.props;
        //确定刷新的时候的TabPane固定在哪一个
        this.setState({
            activeKey:path.charAt(path.length-1)
        })
        let CurrentFileId = location.pathname.match(/\d+/g)[0]*1;
        if(CurrentFileId){
            //请求项目文件对应的任务列表
            GetTaskItemServer({fileId:CurrentFileId}).then(({data})=>{
                TaskItemsInCurrentFileAction(data.CurrentTaskItemInfo)
            })
            //请求任务列表数据
            GetAllSubTasksServer({fileId:CurrentFileId}).then(({data})=>{
                findAllSubTasksInsideAfileAction(data.subTasksData)
            })
            this.setState({
                fId:CurrentFileId,
            })
        }
    }
    componentWillReceiveProps(nextProps){        
        //确定刷新的时候的TabPane固定在哪一个
        let { match:{path} } = nextProps;
        this.setState({
            activeKey:path.charAt(path.length-1)
        })
    }
    shouldComponentUpdate(){
        return true;
    }
    componentWillUnmount(){//不在work页的时候，不显示面包屑导航条
        let { emptyBreadCrumbAction } = this.props;
        emptyBreadCrumbAction();
    }
    render() {
        let { location , state:{getFileInfo} } = this.props;
        let { activeKey } = this.state;
        //拿到当前项目文件的id
        let fileId = location.pathname.match(/\d+/g)[0];
        let currentFile;
        if(fileId){
            currentFile = getFileInfo.filter(val=>val.fileId===Number(fileId))[0];
        }
        return (
            <div id="subNavWrap">
                <div id="subNavLeftTool">
                    <span>
                        <Link to="/projects">首页</Link>
                    </span>
                    <Icon type="right" />
                    <span>
                        {currentFile?currentFile.FileName:''}
                        <Icon type="down" style={{ fontSize: 12}} className="down"/>
                    </span>   
                    <Icon type="star" className={currentFile&&currentFile.star ? 'starActive' : ''}/>
                </div>
                <Tabs 
                    id="subNavTab" 
                    activeKey={activeKey}
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

const mapStateToProps = state => {
    return  {
        state
    }
}
const  mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(taskActions,workActions),dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SubNav));