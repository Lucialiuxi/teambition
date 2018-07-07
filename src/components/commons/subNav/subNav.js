import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs ,Icon} from 'antd';
import { withRouter , Link } from 'react-router-dom';
import Tasks from '@/components/fileDetail/tasks/tasks';
import Works  from '@/components/fileDetail/works/works';
import { GetTaskItemServer ,
         GetAllSubTasksServer ,
         GetAllWorksFileUnderParentWorksFileServer
} from '@/server/requestData';

import * as taskActions from '@/actions/taskAction';
import * as workActions from '@/actions/workAction.js';
import cookie from 'react-cookies';
import ProjectHomeLoading from '@/components/projectPage/projectHomeLoading';

const TabPane = Tabs.TabPane;

class SubNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey:'1',
            currentFile:{},
            isLoadingTask:true,
            isloadingWork:true
        }
    }
    //点击切换 任务  分享 文件 日程 群聊
    tabToOther=(activeKey)=>{
        //点击项目详情分类名字的时候传 【点击的项目详情分类名字、数字  文件id】 --到Project组件中
        let { tabBar , emptyBreadCrumbAction , emptyAGroupOfSameParentIdWorkFilesAction } = this.props;
        let t = '';
        if( activeKey==='1' || activeKey==='' ){
            t = 'tasks';
            this.setState({
                activeKey:'1'
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
            let username = cookie.load('UserName');
            GetAllWorksFileUnderParentWorksFileServer({
                username,fileId,parentId
            }).then(({data})=>{
                if(data.success){
                    GetAllWorksFileUnderParentWorksFileAction(data.data)
                }
            })
        }
        tabBar(t,activeKey,this.state.fId);

        if(activeKey!=='3'){//不在works页的时候，清空面包屑导航
            emptyBreadCrumbAction()
            emptyAGroupOfSameParentIdWorkFilesAction();

        }
    }
    componentWillMount(){
        let { 
                location , 
                match:{path} ,  
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
                if(data.success){
                    TaskItemsInCurrentFileAction(data.CurrentTaskItemInfo)
                    this.setState({
                        isLoadingTask:false
                    })
                }
            })
            //请求任务列表数据
            GetAllSubTasksServer({fileId:CurrentFileId}).then(({data})=>{
                if(data.success){
                    findAllSubTasksInsideAfileAction(data.subTasksData)
                    this.setState({
                        isloadingWork:false
                    })
                }
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
    shouldComponentUpdate(nextProps){
        return true;
    }
    componentWillUnmount(){//不在work页的时候，不显示面包屑导航条
        let { emptyBreadCrumbAction , emptyAGroupOfSameParentIdWorkFilesAction } = this.props;
        emptyBreadCrumbAction();
        emptyAGroupOfSameParentIdWorkFilesAction();
    }
    render() {
        let { location , state:{getFileInfo} } = this.props;
        let { activeKey , isLoadingTask , isloadingWork } = this.state;
        //拿到当前项目文件的id
        let fileId = location.pathname.match(/\d+/g)[0]*1;
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
                    </span>   
                    <Icon type="star" className={currentFile&&currentFile.star ? 'starActive' : ''}/>
                </div>
                <Tabs 
                    id="subNavTab" 
                    activeKey={activeKey}
                    onChange={this.tabToOther}
                >
                    <TabPane tab="任务" key="1" >
                    { !isLoadingTask ? <Tasks/> : <ProjectHomeLoading/> }
                    </TabPane>
                    <TabPane tab="文件" key="3">
                    { !isloadingWork ? <Works/> : <ProjectHomeLoading/> }
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