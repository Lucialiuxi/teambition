//每次登录的时候先清空state里面的数据
export  const ClearStateAction = () => {
    return {
        type: 'Clear_State_Action'
    }
}

//新建项目
export  const CreateAFile = obj => {
    return {
        type: 'Create_A_File',
        obj
    }
}

//刷新页面请求大图标文件数据
export  const AllFileInfoArr = arr => {
    return {
        type: 'get_All_files_Info',
        arr
    }
}

//修改大图标文件信息
export  const ModifyAFileInfo = obj => {
    return {
        type: 'Modify_file_Info',
        obj
    }
}

//切换标星
export  const ToggleFileStar = obj => {
    return {
        type: 'Toggle_File_Star',
        obj
    }
}

//移动文件到回收站
export  const MoveFileToRecycleBin = obj => {
    return {
        type: 'Move_File_To_RecycleBin',
        obj
    }
}

//删除一个项目文件夹
export  const DeleteAFlieAction = obj => {
    return {
        type: 'Delete_A_Flie_Action',
        obj
    }
}

// -------------------------------
//生成默认的项目列表 未完成 已完成 进行中 --开发显示自己看返回的数据
export  const CreateDefaultTaskItemsAction = arr => {
    return {
        type: 'Create_Default_TaskItems',
        arr
    }
}
//进入文件的时候把当前的项目列表信息存进state中
export  const TaskItemsInCurrentFileAction = arr => {
    return {
        type: 'TaskItems_In_CurrentFile_Action',
        arr
    }
}



 //控制【子任务编辑框】  的显示隐藏 被点击的那个【添加任务】才显示
export  const SubTaskCreatorIsShowAction = taskItemId => {
    return {
        type: 'SubTask_Creator_Is_Show_Action',
        taskItemId
    }
}
//隐藏所有的新建任务列表的【子任务编辑框】
export  const HideAllSubTaskCreatorsAction = (close) => {
    return {
        type: 'Hide_All_SubTaskCreators_Action',
        close
    }
}



//控制 【子任务编辑框的日历】 显示
export  const TaskItemCalenderIsShowAction = taskItemId => {
    return {
        type: 'TaskItem_Calender_IsShow_Action',
        taskItemId
    }
}

//所有的【子任务编辑框的日历】 隐藏
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





//控制任务列表的【下拉列表菜单】的显示 
export  const TaskItemDropDownContainerShowAction = taskItemId => {
    return {
        type: 'TaskItem_DropDownContainer_Show_Action',
        taskItemId
    }
}
//隐藏【下拉列表菜单】
export  const HideTaskItemDropDownContainerAction = (close) => {
    return {
        type: 'Hide_TaskItem_DropDownContainer',
        close
    }
}
