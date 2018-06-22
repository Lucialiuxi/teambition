//从action.js拿 任务的action
//生成默认的项目列表 未完成 已完成 进行中 --开发显示自己看返回的数据
export  const CreateDefaultTaskItemsAction = arr => {
    return {
        type: 'Create_Default_TaskItems',
        arr
    }
}
//新建一个项目列表
export  const CreateATaskItemAction = obj => {
    return {
        type: 'Create_A_TaskItem',
        obj
    }
}
//删除一个项目列表
export  const deleteATaskItemAction = taskItemId => {
    return {
        type: 'delete_A_TaskItem_Action',
        taskItemId
    }
}
//更改一个项目列表的名字 obj->{taskItemId,taskItemName}
export const ModifyATaskItemNameAction = obj => {
    return {
        type:'MODIFY_A_TASKITEM_NAME_ACTION',
        obj
    }
}
//进入文件的时候把当前的项目列表信息存进state中
export  const TaskItemsInCurrentFileAction = arr => {
    return {
        type: 'TaskItems_In_CurrentFile_Action',
        arr
    }
}


//---------------------------各种显示框-----------------------------------
 //控制【任务编辑框】  的显示隐藏 被点击的那个【添加任务】才显示
export  const SubTaskCreatorIsShowAction = taskItemId => {
    return {
        type: 'SubTask_Creator_Is_Show_Action',
        taskItemId
    }
}
//隐藏所有的新建任务列表的【任务编辑框】
export  const HideAllSubTaskCreatorsAction = (close) => {
    return {
        type: 'Hide_All_SubTaskCreators_Action',
        close
    }
}


//控制 【任务编辑框的日历】 显示
export  const TaskItemCalenderIsShowAction = taskItemId => {
    return {
        type: 'TaskItem_Calender_IsShow_Action',
        taskItemId
    }
}

//所有的【任务编辑框的日历】 隐藏
export  const HideAllTaskItemCalenderAction = (close) => {
    return {
        type: 'Hide_All_TaskItem_Calender_Action',
        close
    }
}

//控制 【紧急选择框】 显示
export  const ShowChoiceUrgencyLevelAction = taskItemId => {
    return {
        type: 'Show_Choice_UrgencyLevel_Action',
        taskItemId
    }
}

//【紧急选择框】 隐藏
export  const HideChoiceUrgencyLevelAction = (close) => {
    return {
        type: 'Hide_Choice_UrgencyLevel_Action',
        close
    }
}

//------------------------下拉列表-----------------------------
//控制任务列表的【下拉列表框】的显示 
export  const TaskItemDropDownContainerShowAction = taskItemId => {
    return {
        type: 'TaskItem_DropDownContainer_Show_Action',
        taskItemId
    }
}
//隐藏【下拉列表框】
export  const HideTaskItemDropDownContainerAction = (close) => {
    return {
        type: 'Hide_TaskItem_DropDownContainer',
        close
    }
}
//编辑任务列表 框显示
export  const ModifyTaskItemAction = (taskItemId) => {
    return {
        type: 'Modify_TaskItem_Action',
        taskItemId
    }
}
//在此后添加新任务列表 框显示
export  const addATaskItemAfterThisAction = (taskItemId) => {
    return {
        type: 'add_A_TaskItem_After_This_Action',
        taskItemId
    }
}
//移动本任务列表所有任务 框显示
export  const moveAllSubTasksFromThisToOtherAction = (taskItemId) => {
    return {
        type: 'move_All_SubTasks_From_This_To_Other_Action',
        taskItemId
    }
}
//复制本任务列表所有任务 框显示
export  const copyAllSubTasksInsideThisAction = (taskItemId) => {
    return {
        type: 'copy_All_SubTasks_Inside_This_Action',
        taskItemId
    }
}

/**移动OR复制任务 的【项目名显示框】   显示
 * 
 * @param {taskItemId:Number,isShowCurrentTaskItemName:Boolean}
 */
export  const ToSeeShowFileNameCoverAction = (obj) => {
    return {
        type: 'TO_SEE_SHOW_FILENAMECOVER',
        obj
    }
}

/**移动OR复制任务 的【项目名显示框】   隐藏
 * 
 * @param 'close'
 */
export  const ToHideShowFileNameCoverAction = (close) => {
    return {
        type: 'TO_HIDE_SHOW_FILENAMECOVER',
        close
    }
}

/**移动OR复制任务 的【列表名显示框】   显示
 * 
 * @param {taskItemId:Number,isShowCurrentTaskItemName:Boolean}
 */
export  const ToSeeShowCurrentTaskItemNameCoverAction = (obj) => {
    return {
        type: 'TO_SEE_SHOW_CURRENT_TASKITEMNAMECOVER',
        obj
    }
}

/**移动OR复制任务 的【列表名显示框】   隐藏
 * 
 * @param 'close'
 */
export  const ToHideShowCurrentTaskItemNameCoverAction = (close) => {
    return {
        type: 'TO_HIDE_SHOW_CURRENT_TASKITEMNAMECOVER',
        close
    }
}

/**移动任务
 * @param {fileId:Number,taskItemId:Number,currentTaskItemId:Number}
 */
export const MoveSubTasksToAnotherTaskItemAction = (arr) => {
    return {
        type: 'MOVE_SUBTASKS_TO_ANOTHER_TASKITEM_ACTION',
        arr
    }
}

//复制任务 [{},{}] 数组的每个对象都是完整的一个任务数据 
export const CopySubTasksForAnotherTaskItemAction = arr => {
    return {
        type: 'COPY_SUBTASKS_FOR_ANOTHER_TASKITEM_ACTION',
        arr
    }
}

//清空本任务列表所有任务 框显示
export  const deleteAllSubTasksInsideThisAction = (taskItemId) => {
    return {
        type: 'delete_All_SubTasks_Inside_This_Action',
        taskItemId
    }
}
//删除任务列表 框显示
export  const deleteThisTaskItemAction = (taskItemId) => {
    return {
        type: 'delete_This_TaskItem_Action',
        taskItemId
    }
}
//显示 下拉列表框主页
export  const showDropDownContainerMainListAction = (taskItemId) => {
    return {
        type: 'show_DropDownContainer_MainList_Action',
        taskItemId
    }
}

//新建项目列表框 显示 -->标识写在getFileInfo的项目文件信息
export  const ShowTaskItemCreatorAction = (fileId) => {
    return {
        type: 'TaskItem_Creator_Is_Show_Action',
        fileId
    }
}
//新建项目列表框 隐藏
export  const HideTaskItemCreatorAction = (close) => {
    return {
        type: 'Hide_TaskItem_Creator_Action',
        close
    }
}

//------------------------任务-----------------------------
//创建一个任务
export const createASubTaskAction = (obj) => {
    return {
        type: 'create_A_SubTask_Action',
        obj
    }
}
//查询一个项目文件下的所有任务
export const findAllSubTasksInsideAfileAction = (arr) => {
    return {
        type:'find_All_SubTasks_Inside_A_file_Action',
        arr
    }
}
//删除一个任务列表下的任务
export const deleteSubTasksInATaskItemAction = (taskItemId) => {
    return {
        type:'delete_SubTasks_In_A_TaskItem_Action',
        taskItemId
    }
}

//查询一个项目列表下的任务列表
export const SaveFoundTaskItemsAction = (arr) => {
    return {
        type:'SAVE_FOUND_TASKITEMS_ACTION',
        arr
    }
}

//切换任务的选中状态 { subTaskId:Number , checked:Boolean }
export const SwitchToCheckSubtaskAction = (obj) => {
    return {
        type:'SWITCH_TO_CHECK_SUBTASK_ACTIOIN',
        obj
    }
}