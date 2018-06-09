//-----------项目列表
import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
//列表菜单
import DropDown from './dropdown/dropdown';
//没有被选中的子任务
import SubTask from './subTasks';
//被选中的子任务
import CheckedSubTasks from './checkedSubTasks';
// 新建子任务编辑框 
import SubTaskCreator from './subTaskCreator';
//【添加任务的显示】 点击去 显示新建子任务编辑框
import ToShowSubTaskCreator from './clickToShowSubTaskCreator';

class TaskItem extends Component {
    constructor(props) {
        super(props)
        this.state = {  
            hasTaskList:0,//子任务
         }
    }
    componentDidUpdate(){
        //子任务编辑框获取焦点
        // let SubTaskCreatorBox = document.getElementsByClassName('subTask-creator-wrap').item(0);
        // if(SubTaskCreatorBox){
        //     let SubTaskContent = SubTaskCreatorBox.getElementsByClassName('task-content-input form-control').item(0);
        //     SubTaskContent.focus();
        // } 
    }
    toShowDropDownContainer=()=>{
        // console.log('toShowDropDownContainer',this.props)
        let { GoToShowDropDownContainer , taskItemInfo } = this.props;
        GoToShowDropDownContainer(taskItemInfo.taskItemId)
    }
    render() { 
        let { taskItemInfo , 
            GoToCreateSubTask , 
            GoToChoiceSubTaskDeadline ,
            deadline
        } = this.props;
        let { hasTaskList } = this.state;
        return ( 
            <div className="underTaskItemDiv">
                {/* 下拉编辑框 */}
                {taskItemInfo.IsShowDropDownContainer ? <DropDown taskItemInfo={taskItemInfo}/> : null}
                <header className="taskItem-head">
                    <h4>
                        <span className="task-title">{taskItemInfo.taskItemName}</span>
                        <span className="task-count">{ hasTaskList ? '.'+ hasTaskList : null }</span>
                    </h4>
                    {/* 下拉菜单Icon */}
                    <Icon 
                        type="down-circle-o" 
                        size="large" 
                        onClick={this.toShowDropDownContainer}
                        className="ToDropDownIcon"
                    />
                </header>
                <div className="subTasksContent dls-thin-scroll">
                    {/* 没有被选中的子任务 */}
                    {/* <SubTask/> */}

                    {/* 被选中的子任务 */}
                    {/* <CheckedSubTasks/> */}

                    {/* 新建子任务编辑框 */}
                    {taskItemInfo.IsCreating ? <SubTaskCreator 
                        deadline={deadline ? deadline : null}
                        id={taskItemInfo.taskItemId}
                        GoToChoiceSubTaskDeadline={GoToChoiceSubTaskDeadline}
                    /> : null }
                </div>
                {/*【添加任务的显示】 点击 显示新建子任务编辑框*/}
                {!taskItemInfo.IsCreating ? <ToShowSubTaskCreator  
                    id={taskItemInfo.taskItemId} 
                    GoToCreateSubTask={GoToCreateSubTask}
                /> : null }
            </div>
         )
    }
}

export default TaskItem;