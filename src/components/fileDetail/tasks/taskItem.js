//-----------项目列表
import React, { Component } from 'react';
import { Icon } from 'antd';
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
import ProjectHomeLoading from '@/components/projectPage/projectHomeLoading';

class TaskItem extends Component {
    constructor(props) {
        super(props)
        this.state = {  
            allSubTasksData:[]
         }
    }
    toShowDropDownContainer=()=>{
        let { GoToShowDropDownContainer , taskItemInfo } = this.props;
        GoToShowDropDownContainer(taskItemInfo.taskItemId)
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            allSubTasksData:nextProps.subTaskInfo
        })
    }
    render() { 
        let { taskItemInfo , 
            GoToCreateSubTask , 
            GoToChoiceSubTaskDeadline ,
            deadline,
            isLoadingTaskItem
        } = this.props;
        let { allSubTasksData } = this.state;
        let SubTasksUnderCurrentTaskItem = allSubTasksData.filter(val=>val.taskItemId===taskItemInfo.taskItemId);
        let allSubTasks = SubTasksUnderCurrentTaskItem.filter(val=>val.checked===false);
        let allCheckedSubtasks =  SubTasksUnderCurrentTaskItem.filter(val=>val.checked===true);

        return ( 
            <div className="underTaskItemDiv">
                {/* 下拉编辑框 */}
                {taskItemInfo.IsShowDropDownContainer ? <DropDown taskItemInfo={taskItemInfo}/> : null}
                <header className="taskItem-head">
                    <h4>
                        <span className="task-title">{taskItemInfo.taskItemName}</span>
                        <span className="task-count">{ SubTasksUnderCurrentTaskItem.length ? '.'+ SubTasksUnderCurrentTaskItem.length : null }</span>
                    </h4>
                    {/* 下拉菜单Icon */}
                    <Icon 
                        type="down-circle-o" 
                        size="large" 
                        onClick={this.toShowDropDownContainer}
                        className="ToDropDownIcon"
                    />
                </header>
                { isLoadingTaskItem===true ? <ProjectHomeLoading/> :
                    <div className="subTasksContent dls-thin-scroll">
                        {/* 没有被选中的子任务 */}
                        { allSubTasks.map(val=><SubTask key={val.subTaskId} {...val}/>) }

                        {/* 被选中的子任务 */}
                        { allCheckedSubtasks.map(val=><CheckedSubTasks key={val.subTaskId} {...val}/>) }
                        {/* 新建子任务编辑框 */}
                        {taskItemInfo.IsCreating ? <SubTaskCreator
                            taskItemInfo={taskItemInfo}
                            deadline={deadline ? deadline : null}
                            id={taskItemInfo.taskItemId}
                            GoToChoiceSubTaskDeadline={GoToChoiceSubTaskDeadline}
                        /> : null }
                        {/*【添加任务的显示】 点击 显示新建子任务编辑框*/}
                        {!taskItemInfo.IsCreating ? <ToShowSubTaskCreator  
                            id={taskItemInfo.taskItemId} 
                            GoToCreateSubTask={GoToCreateSubTask}
                        /> : null }
                    </div>
                }
                
            </div>
         )
    }
}

export default TaskItem;