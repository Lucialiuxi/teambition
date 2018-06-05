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
    console.log(arr)
    return {
        type: 'Create_Default_TaskItems',
        arr
    }
}
//进入文件的时候把当前的项目列表信息存进state中
export  const TaskItemsInCurrentFileAction = arr => {
    console.log(arr)
    return {
        type: 'TaskItems_In_CurrentFile_Action',
        arr
    }
}

