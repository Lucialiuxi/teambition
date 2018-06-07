import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TaskItem from './taskItem';
import TaskItemCreator from './taskItemCreator';
import { 
    SubTaskCreatorIsShowAction , 
    HideAllSubTaskCreatorsAction ,
    TaskItemDropDownContainerShowAction,
    HideTaskItemDropDownContainerAction,
    TaskItemCalenderIsShowAction
}  from '@/actions/action';

import CanlenderMode from './calenderMode';

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
        //     if(e.target.classList.contains('task-creator-handler-wrap' || 
        //     'task-creator-handler'||
        //     'AddSubTaskIcon'
        //     )){
        //         console.log('点击弹出新建框')
        //     }else if(e.target.classList.contains('subTask-creator-wrap' ||'createUser' ||
        //     'confirmCreacteBtn-wrap' ||'task-creator' ||'detail-infos-priority-view' ||
        //     'scenario-creators-wrap' || 'CommonCanlender' || 'ant-alert' ||
        //     'ant-alert-message' || 'ant-alert-description' || 'ant-fullcalendar-header' ||
        //      'ant-select-sm'  || 'ant-select-selection'  || 'ant-select-selection__rendered' ||
        //      'ant-select-selection-selected-value' || 'ant-select-arrow' ||
        //      'ant-radio-group'  || 'ant-radio-button-wrapper' || 'ant-radio-button' ||
        //      'ant-radio-button-input'  || 'ant-radio-button-inner' || 'ant-fullcalendar' ||   
        //     'ant-fullcalendar-calendar-body'  || 'ant-fullcalendar-date' || 'ant-fullcalendar-value' ||   
        //      'ant-fullcalendar-content' || 'clear' || 'confirm') ||
        //     e.target.nodeName==="TABLE" ||  
        //     e.target.nodeName==="THEEAD" ||
        //     e.target.nodeName==="TBODY" ||  
        //     e.target.nodeName==="TR" ||
        //     e.target.nodeName==="TD" || 
        //     e.target.nodeName==="TT"  
        //  ){
        //      console.log('不作用')
        //  }
         
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
               e.target.classList.contains('scenario-creators-wrap') ||
                // 日历
               e.target.classList.contains('CommonCanlender')||
               e.target.classList.contains('ant-alert')||
               e.target.classList.contains('ant-alert-message') ||
               e.target.classList.contains('ant-alert-description') ||
               e.target.classList.contains('ant-fullcalendar-header') ||
               e.target.classList.contains('ant-select-sm') ||
               e.target.classList.contains('ant-select-selection') ||
               e.target.classList.contains('ant-select-selection__rendered') ||
               e.target.classList.contains('ant-select-selection-selected-value') ||
               e.target.classList.contains('ant-select-arrow') ||
               e.target.classList.contains('ant-radio-group') ||
               e.target.classList.contains('ant-radio-button-wrapper')||
               e.target.classList.contains('ant-radio-button') ||
               e.target.classList.contains('ant-radio-button-input') ||   
               e.target.classList.contains('ant-radio-button-inner') ||   
               e.target.classList.contains('ant-fullcalendar') ||   
               e.target.classList.contains('ant-fullcalendar-calendar-body') ||   
               e.target.nodeName==="TABLE" ||  
               e.target.nodeName==="THEEAD" ||
               e.target.nodeName==="TBODY" ||  
               e.target.nodeName==="TR" ||
               e.target.nodeName==="TD" || 
               e.target.nodeName==="TT" ||
               e.target.classList.contains('ant-fullcalendar-date') ||   
               e.target.classList.contains('ant-fullcalendar-value') ||   
               e.target.classList.contains('ant-fullcalendar-content')  ||   
               e.target.classList.contains('clear') ||   
               e.target.classList.contains('confirm')   
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
            }else if(e.target.classList.contains('confirmCreacteBtn')){
                //创建子任务
                console.log('创建子任务')
            }else{
                // 关闭 新建子任务框
                let { dispatch } = this.props;
                dispatch(HideAllSubTaskCreatorsAction('close'));
            }

            if(e.target.classList.contains('dropdown-container') || 
                e.target.classList.contains('Add_TaskItem')  ||
                e.target.classList.contains('anticon-left')  ||
                e.target.classList.contains('dropdown_title')  ||
                e.target.classList.contains('anticon-close')  ||
                e.target.classList.contains('modifyDetailList')  ||
                e.target.classList.contains('modifyItem')  ||
                e.target.classList.contains('anticon-edit')  ||
                e.target.classList.contains('anticon-plus')  ||
                e.target.classList.contains('anticon-copy') ||
                e.target.classList.contains('anticon-delete') ||
                e.target.classList.contains('anticon-down-circle-o')
            ){
                console.log('下拉菜单')
            }else{//隐藏下拉菜单
                let { dispatch } = this.props;
                dispatch(HideTaskItemDropDownContainerAction('close'));
            }
        } 
    }
    GoToCreateSubTask=(id)=>{// 显示 新建子任务框
        let { dispatch } = this.props;
        dispatch(SubTaskCreatorIsShowAction(id));
        dispatch(HideTaskItemDropDownContainerAction('close'));//隐藏下拉菜单
    }
    GoToShowDropDownContainer=(id)=>{// 显示下拉列表菜单
        let { dispatch } = this.props;
        dispatch(TaskItemDropDownContainerShowAction(id))
    }
    GoToChoiceSubTaskDeadline=(id)=>{//显示选择被创建的子任务 的截止时间日历
        let { dispatch } = this.props;
        dispatch(TaskItemCalenderIsShowAction(id))
    }
    render() { 
        let { hasTaskList } = this.state;
        let { state } = this.props;
        //把项目文件数据按照待处理/已完成/进行中 排序
        state.taskItemInfo.sort(function(a,b){
            return a.index-b.index
        })
        console.log(state.taskItemInfo)
        return (
            <ul id="TasksWrap">
                {state.taskItemInfo.map(val=>{
                    return <li className="taskItem"  key={val.taskItemId}>
                                {val.IsChoiceDeadline ? <CanlenderMode/> : null}
                                <TaskItem 
                                    taskItemInfo={val} 
                                    GoToCreateSubTask={this.GoToCreateSubTask}
                                    GoToShowDropDownContainer={this.GoToShowDropDownContainer}
                                    GoToChoiceSubTaskDeadline={this.GoToChoiceSubTaskDeadline}
                                />
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