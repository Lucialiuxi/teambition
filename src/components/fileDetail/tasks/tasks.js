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
    TaskItemCalenderIsShowAction,
    HideAllTaskItemCalenderAction,
    HideChoiceUrgencyLevelAction
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
    userLoginName:String,用户的登录名
    fileId: Number,项目文件id
    taskItemId: Number,任务列表id
    subTaskId: String,子任务列表id  //从这里开始，id由后端生成
    subTaskName: String,任务列表名
    deadline:String,任务截止时间
    urgencyLevel:String,紧急程度：普通normal  紧急urgency  非常紧急emtreme urgency
    tag:String,标签
    index:Number

 */
class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deadlineData:{}
        }
    }
    componentDidMount(){
        //  点击新建子任务编辑框 之外的地方  隐藏编辑框
        let { dispatch } = this.props;
        document.onclick=(e)=>{
            let target = e.target;
            /**\
             * 点击最外层/用户名/创建标签外层div 都没有反应
             */
            //日历所有标签
            let CanlenderCondition = (target.classList.contains('CommonCanlender')||
                target.classList.contains('ant-alert')||
                target.classList.contains('ant-alert-message') ||
                target.classList.contains('ant-alert-description') ||
                target.classList.contains('ant-fullcalendar-header') ||
                target.classList.contains('ant-select-sm') ||
                target.classList.contains('ant-select-selection') ||
                target.classList.contains('ant-select-selection__rendered') ||
                target.classList.contains('ant-select-selection-selected-value') ||
                target.classList.contains('ant-select-arrow') ||
                target.classList.contains('ant-radio-group') ||
                target.classList.contains('ant-radio-button-wrapper')||
                target.classList.contains('ant-radio-button') ||
                target.classList.contains('ant-radio-button-input') ||   
                target.classList.contains('ant-radio-button-inner') ||   
                target.classList.contains('ant-fullcalendar') ||   
                target.classList.contains('ant-fullcalendar-calendar-body') ||   
                target.nodeName==="TABLE" ||  
                target.nodeName==="THEEAD" ||
                target.nodeName==="TBODY" ||  
                target.nodeName==="TR" ||
                target.nodeName==="TD" || 
                target.nodeName==="TT" ||
                target.classList.contains('ant-fullcalendar-date') ||   
                target.classList.contains('ant-fullcalendar-value') ||   
                target.classList.contains('ant-fullcalendar-content'))

            //紧急选择框
            let urgencyBox = (target.classList.contains('ant-fullcalendar-content') ||
                target.getAttribute('id')==='taskUrgency' ||
                target.classList.contains('taskUrgencyLi') ||
                target.classList.contains('normalBtn') ||
                target.classList.contains('urgencyBtn') ||
                target.classList.contains('emtremeUrgencyBtn') ||
                target.classList.contains('normal') ||
                target.classList.contains('urgency') ||
                target.classList.contains('emtremeUrgency') ||
                target.classList.contains('anticon-check') ||
                target.classList.contains('taskUrgencyIcon')  ||
                target.classList.contains('showUrgencyLevel') )

            //设置子任务的标签
            let aboutTags = (target.classList.contains('editableTagGroupWrap') || 
                target.classList.contains('goToAddTagIcon') || 
                target.classList.contains('ant-tag') ||
                target.classList.contains('setTagBox') ||
                target.classList.contains('tag-text')||
                target.classList.contains('anticon-tags-o') ||
                target.classList.contains('anticon-cross') ||
                target.classList.contains('setSubTaskTagInput'))


            if(target.classList.contains('task-creator-handler-wrap') ||
                target.classList.contains('task-creator-handler') ||
                target.classList.contains('AddSubTaskIcon')
            ){
                console.log('点击弹出新建框')
            }else if(target.classList.contains('subTask-creator-wrap') ||
               target.classList.contains('createUser') ||
               target.classList.contains('confirmCreacteBtn-wrap') ||
               target.classList.contains('task-creator') ||
               target.classList.contains('detail-infos-priority-view') ||
               target.classList.contains('scenario-creators-wrap') || 
               target.classList.contains('UrgencyLevelWrap') ||
                // 日历
                CanlenderCondition ||   
                //日历 关闭 确定按钮
                target.classList.contains('clear') ||   
                target.classList.contains('confirm') ||
                // 紧急选择框
                urgencyBox
            ){
                // console.log('不作用')
                if(!CanlenderCondition){//关闭日历
                    dispatch(HideAllTaskItemCalenderAction('close'));
                }
                if(!(target.classList.contains('showUrgencyLevel') ||
                target.classList.contains('normal') ||
                target.classList.contains('urgency') ||
                target.classList.contains('emtremeUrgency'))){//关闭任务紧急情况选择框
                    dispatch(HideChoiceUrgencyLevelAction('close'));
                }
            }else if(target.classList.contains('task-content-input')){
                //输入任务内容
                // console.log('输入任务内容')
                //关闭日历
                dispatch(HideAllTaskItemCalenderAction('close'));
            }else if(target.classList.contains('date-wrap') ||
                     target.classList.contains('anticon-calendar') ||
                     target.classList.contains('date-text')
            ){//设置时间
                console.log('设置时间')
            }else if(target.classList.contains('priority-container')||
                     target.classList.contains('icon-circle') && 
                     (!target.classList.contains('showUrgencyLevel'))
            ){//设置紧急程度
                console.log('关闭设置紧急程度')
                dispatch(HideChoiceUrgencyLevelAction('close'));
            }else if(aboutTags){//设置标签
                console.log('设置标签')
                ////关闭任务紧急情况选择框
                dispatch(HideChoiceUrgencyLevelAction('close'));
            }else if(target.classList.contains('confirmCreacteBtn')){
                //创建子任务
                console.log('创建子任务')
            }else{
                    dispatch(HideChoiceUrgencyLevelAction('close'));
                // 关闭 新建子任务框
                dispatch(HideAllSubTaskCreatorsAction('close'));
                //关闭日历
                dispatch(HideAllTaskItemCalenderAction('close'));
                this.setState({
                    deadlineData:{}
                })
            }
//----------------------------控制下拉菜单--------------------------------------------
            if(target.classList.contains('dropdown-container') || 
                target.classList.contains('Add_TaskItem')  ||
                target.classList.contains('anticon-left')  ||
                target.classList.contains('dropdown_title')  ||
                target.classList.contains('anticon-close')  ||
                target.classList.contains('modifyDetailList')  ||
                target.classList.contains('modifyItem')  ||
                target.classList.contains('anticon-edit')  ||
                target.classList.contains('anticon-plus')  ||
                target.classList.contains('anticon-copy') ||
                target.classList.contains('anticon-delete') ||
                target.classList.contains('anticon-down-circle-o')
            ){
                console.log('下拉菜单')
            }else{//隐藏下拉菜单
                dispatch(HideTaskItemDropDownContainerAction('close'));
            }

        } 
    }
    GoToCreateSubTask=(id)=>{// 显示 新建子任务框
        let { dispatch } = this.props;
        dispatch(SubTaskCreatorIsShowAction(id));
        dispatch(HideTaskItemDropDownContainerAction('close'));//隐藏下拉菜单
        //关闭日历
        dispatch(HideAllTaskItemCalenderAction('close'));
    }
    GoToShowDropDownContainer=(id)=>{// 显示下拉列表菜单
        let { dispatch } = this.props;
        dispatch(TaskItemDropDownContainerShowAction(id))
    }
    GoToChoiceSubTaskDeadline=(id)=>{//显示选择被创建的子任务 的截止时间日历
        let { dispatch } = this.props;
        console.log(id,'显示选择被创建的子任务 的截止时间日历')
        dispatch(TaskItemCalenderIsShowAction(id))
        //子任务编辑框失去焦点
        let SubTaskCreatorBox = document.getElementsByClassName('subTask-creator-wrap').item(0);
        if(SubTaskCreatorBox){
            let SubTaskContent = SubTaskCreatorBox.getElementsByClassName('task-content-input form-control').item(0);
            SubTaskContent.blur();
        } 
    }
    getDeadline=(id,time)=>{//拿到日历选中的时间
        // console.log(id,time)
        this.setState({
            deadlineData:{id,time}
        })
    }
    render() { 
        let { hasTaskList , deadlineData } = this.state;
        let { state } = this.props;
        //把项目文件数据按照待处理/已完成/进行中 排序
        state.taskItemInfo.sort(function(a,b){
            return a.index-b.index
        })
        // console.log(state.taskItemInfo)
        console.log(deadlineData)
        return (
            <ul id="TasksWrap">
                {state.taskItemInfo.map(val=>{
                    return <li className="taskItem"  key={val.taskItemId}>
                                {val.IsChoiceDeadline ? <CanlenderMode {...{taskItemId:val.taskItemId,getDeadline:this.getDeadline}}/> : null}
                            
                                <TaskItem 
                                    deadline={val.taskItemId === deadlineData.id ? deadlineData.time : null}
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