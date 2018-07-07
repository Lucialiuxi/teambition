//从action.js拿 项目文件的action
//每次登录的时候先清空state里面的数据
export  const ClearStateAction = () => {
    return {
        type: 'CLEAR_STATE_ACTION'
    }
}

//新建项目文件夹
export  const CreateAFile = obj => {
    return {
        type: 'CREATE_A_FILE',
        obj
    }
}

//刷新页面请求大图标文件数据
export  const AllFileInfoArr = arr => {
    return {
        type: 'ALL_FILE_INFO_ARR',
        arr
    }
}

//修改大图标文件信息
export  const ModifyAFileInfo = obj => {
    return {
        type: 'MODIFY_A_FILE_INFO',
        obj
    }
}

//切换标星
export  const ToggleFileStar = obj => {
    return {
        type: 'TOGGLE_FILE_STAR',
        obj
    }
}

//移动文件到回收站
export  const MoveFileToRecycleBin = obj => {
    return {
        type: 'MOVE_FILE_TO_RECYCLEBIN',
        obj
    }
}

//删除一个项目文件夹
export  const DeleteAFlieAction = obj => {
    return {
        type: 'DELETE_A_FILE_ACTION',
        obj
    }
}