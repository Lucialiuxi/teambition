import React, { Component } from 'react';
import { Icon} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TaskItem from './taskItem';
import TaskItemCreator from './taskItemCreator';
import { SubTaskCreatorIsShowAction , HideAllSubTaskCreatorsAction }  from '@/actions/action';


/**
 *在新建项目文件夹的时候就创建好默认的任务列表  
  删除项目文件夹的时候要删除对应的任务列表
 */

import './tasks.css';
/** 
 任务列表 taskItem
    loginName:String,用户的登录名
    fileId: Number,项目文件id
    taskItemId: Number,任务列表id
    taskItemName: String,任务列表名
    subTaskCount: Number子任务数量
 */
/** 
 子任务 subTask
    loginName:String,用户的登录名
    fileId: Number,项目文件id
    taskItemId: Number,任务列表id
    subTaskId: Number,子任务列表id
    subTaskName: String,任务列表名
    subTaskDeadline:String,任务截止时间
    isUrgency:String,紧急程度：普通normal  紧急urgency  非常紧急emtreme urgency
    tag:String,标签

 */
class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){
        //  点击新建子任务编辑框 之外的地方  隐藏编辑框
        document.onclick=(e)=>{
            let target = e.target;
            /**\
             * 点击最外层/用户名/创建标签外层div 都没有反应
             */
            if(e.target.classList.contains('task-creator-handler-wrap') ||
                e.target.classList.contains('task-creator-handler') ||
                e.target.classList.contains('AddSubTaskIcon')

            ){
                console.log('点击弹出新建框')
            }else if(e.target.classList.contains('subTask-creator-wrap') ||
               e.target.classList.contains('createUser') ||
               e.target.classList.contains('confirmCreacteBtn-wrap') ||
               e.target.classList.contains('task-creator') ||
               e.target.classList.contains('detail-infos-priority-view') ||
               e.target.classList.contains('scenario-creators-wrap')
            ){
                console.log('不作用')
            }else if(e.target.classList.contains('task-content-input')){
                //输入任务内容
                console.log(e.target)
            }else if(e.target.classList.contains('date-wrap') ||
                     e.target.classList.contains('anticon-calendar') ||
                     e.target.classList.contains('date-text')
            ){//设置时间
                console.log('设置时间')
            }else if(e.target.classList.contains('priority-container')||
                     e.target.classList.contains('icon-circle') ||
                     e.target.classList.contains('urgencyBtn') 
            ){//设置紧急程度
                console.log('设置紧急程度')
            }else if(e.target.classList.contains('setTagBox') ||
                    e.target.classList.contains('tag-text')||
                    e.target.classList.contains('anticon-tags-o')
            ){//设置标签
                console.log('设置标签')
            }else if(e.target.classList.contains(' confirmCreacteBtn')){
                //创建子任务
                console.log('创建子任务')
            }else{
                // 关闭 新建子任务框
                let { dispatch } = this.props;
                dispatch(HideAllSubTaskCreatorsAction('close'));
            }
        } 
    }
    GoToCreateSubTask=(id)=>{// 显示 新建子任务框
        let { dispatch } = this.props;
        dispatch(SubTaskCreatorIsShowAction(id));
    }
    render() { 
        let { hasTaskList } = this.state;
        let { state } = this.props;
        //把项目文件数据按照待处理/已完成/进行中 排序
        state.taskItemInfo.sort(function(a,b){
            return a.index-b.index
        })
        return (
            <ul id="TasksWrap">
                {state.taskItemInfo.map(val=>{
                    return <li className="taskItem"  key={val.taskItemId}>
                                <TaskItem taskItemInfo={val} GoToCreateSubTask={this.GoToCreateSubTask}/>
                           </li>
                })}
                {/* 新建任务列表 */}
                <TaskItemCreator/>
            </ul> 
        )
    }
}

 const mapStateToProps = state => {
    //  console.log(state)
    return  {
        state
    }
  }
 
export default withRouter(connect(mapStateToProps,null)(Tasks));