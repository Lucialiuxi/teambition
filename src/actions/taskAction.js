//从action.js拿 任务的action
//生成默认的项目列表 未完成 已完成 进行中 --开发显示自己看返回的数据
export  const CreateDefaultTaskItemsAction = arr => {
    return {
        type: 'CREATE_DEFAULT_TASKITEMS_ACTION',
        arr
    }
}
//新建一个项目列表
export  const CreateATaskItemAction = obj => {
    return {
        type: 'CREATE_A_TASKITEM_ACTION',
        obj
    }
}
//删除一个项目列表
export  const deleteATaskItemAction = taskItemId => {
    return {
        type: 'DELETE_A_TASKITEM_ACTION',
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
        type: 'TASKITEMS_IN_CURRENTFILE_ACTION',
        arr
    }
}


//---------------------------各种显示框-----------------------------------
 //控制【任务编辑框】  的显示隐藏 被点击的那个【添加任务】才显示
export  const SubTaskCreatorIsShowAction = taskItemId => {

    return {
        type: 'SUBTASK_CREATOR_IS_SHOW_ACTION',
        taskItemId
    }
}
//隐藏所有的新建任务列表的【任务编辑框】
export  const HideAllSubTaskCreatorsAction = (close) => {

    return {
        type: 'HIDE_ALL_SUBTASK_CREATORS_ACTION',
        close
    }
}


//控制 【任务编辑框的日历】 显示
export  const TaskItemCalenderIsShowAction = taskItemId => {

    return {
        type: 'TASKITEM_CALENDER_IS_SHOW_ACTION',
        taskItemId
    }
}

//所有的【任务编辑框的日历】 隐藏
export  const HideAllTaskItemCalenderAction = (close) => {

    return {
        type: 'HIDE_ALL_TASKITEM_CALENDER_ACTION',
        close
    }
}

//控制 【紧急选择框】 显示
export  const ShowChoiceUrgencyLevelAction = taskItemId => {
    return {
        type: 'SHOW_CHOICE_URGENCY_LEVEL_ACTION',
        taskItemId
    }
}

//【紧急选择框】 隐藏
export  const HideChoiceUrgencyLevelAction = (close) => {
    return {
        type: 'HIDE_CHOICE_URGENCY_LEVEL_ACTION',
        close
    }
}

//------------------------下拉列表-----------------------------
//控制任务列表的【下拉列表框】的显示 
export  const TaskItemDropDownContainerShowAction = taskItemId => {
    return {
        type: 'TASKITEM_DROPDOWN_CONTAINER_SHOW_ACTION',
        taskItemId
    }
}
//隐藏【下拉列表框】
export  const HideTaskItemDropDownContainerAction = (close) => {
    return {
        type: 'HIDE_TASKITEM_DROPDOWN_CONTAINER_ACTION',
        close
    }
}
//编辑任务列表 框显示
export  const ModifyTaskItemAction = (taskItemId) => {
    return {
        type: 'MODIFY_TASKITEM_ACTION',
        taskItemId
    }
}
//在此后添加新任务列表 框显示
export  const addATaskItemAfterThisAction = (taskItemId) => {
    return {
        type: 'ADD_A_TASKITEM_AFTER_THIS_ACTION',
        taskItemId
    }
}
//移动本任务列表所有任务 框显示
export  const moveAllSubTasksFromThisToOtherAction = (taskItemId) => {
    return {
        type: 'MOVE_ALL_SUBTASKS_FROM_THIS_TO_OTHER_ACTION',
        taskItemId
    }
}
//复制本任务列表所有任务 框显示
export  const copyAllSubTasksInsideThisAction = (taskItemId) => {
    return {
        type: 'COPEY_ALL_SUBTASKS_IINSIDE_THIS_ACTION',
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
        type: 'DELETE_ALL_SUBTASKS_INSIDE_THIS_ACTION',
        taskItemId
    }
}
//删除任务列表 框显示
export  const deleteThisTaskItemAction = (taskItemId) => {
    return {
        type: 'DELETE_THIS_TASKITEM_ACTION',
        taskItemId
    }
}
//显示 下拉列表框主页
export  const showDropDownContainerMainListAction = (taskItemId) => {
    return {
        type: 'SHOW_DROPDOWN_CONTAINER_MAINLIST_ACTION',
        taskItemId
    }
}

//新建项目列表框 显示 -->标识写在getFileInfo的项目文件信息
export  const ShowTaskItemCreatorAction = (fileId) => {
    return {
        type: 'SHOW_TASKITEM_CREATOR_ACTION',
        fileId
    }
}
//新建项目列表框 隐藏
export  const HideTaskItemCreatorAction = (close) => {
    return {
        type: 'HIDE_TASKITEM_CREATOR_ACTION',
        close
    }
}

//------------------------任务-----------------------------
//创建一个任务
export const createASubTaskAction = (obj) => {
    return {
        type: 'CREATE_A_SUBTASK_ACTION',
        obj
    }
}
//查询一个项目文件下的所有任务
export const findAllSubTasksInsideAfileAction = (arr) => {
    return {
        type:'FIND_ALL_SUBTASKS_INSIDE_A_FILE_ACTION',
        arr
    }
}
//删除一个任务列表下的任务
export const deleteSubTasksInATaskItemAction = (taskItemId) => {
    return {
        type:'DELETE_SUBTASKS_IN_A_TASKITEM_ACTION',
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