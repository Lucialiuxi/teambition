//存文件的显示模式 {worksViewType：Sting}
export const saveWorksViewTypeAction = obj => {
    return {
        type: 'SAVE_WORKS_VIEW_TYPE',
        obj
    }
}

//点击创建文件夹按钮 --显示创建文件的节点
export const GoToCreateAWorksFileAction = () => {
    return {
        type: 'GO_TO_CRAETE'
    }
}


//进入works文件 或者刷新的时候，把请求回来的数据保存起来
export const GetAllWorksFileUnderParentWorksFileAction = (arr) => {
    return {
        type: 'GET_ALL_WORKSFILE_UNDER_PARENT_WORKSFILE_ACTION',
        arr
    }
}

//成功创建一个文件夹 obj->单个文件夹的数据 
export const AlreadyCreateAWorksFileAction = (obj) => {
    return {
        type: 'ALREADY_CREATE_A_WORKS_FILE_ACTION',
        obj
    }
}

//删除一个work文件夹 myId->文件夹id
export const DeleteAWorksFileAction = (myId) => {
    return {
        type: 'DELETE_A_WORKSFILE_ACTION',
        myId
    }
}

//点击去修改一个work文件夹的名字 myId->文件夹id
export const ModifyAWorkFileNameAction = (myId) => {
    return {
        type: 'MODIFY_A_WORKSFILENAME_ACTION',
        myId
    }
}

//修改成功work文件名 进行更新 obj->{myId,workFileName}
export const AlreadyModifyAWorkFileNameAction = (obj) => {
    return {
        type: 'ALREADY_MODIFY_A_WORKSFILENAME_ACTION',
        obj
    }
}

//完成创建OR修改文件名
export const HideInputAction = () => {
    return {
        type: 'HIDE_INPUT_ACTION'
    } 
}

//切换文件选中状态obj->{myId,check}
export const ToSwitchCheckAWorkFileAction = (obj) => {
    return {
        type: 'TO_SWITCH_CHECK_A_WORKFILE_ACTION',
        obj
    }
}
//切换全选选中状态 obj->{check}
export const ToSwitchCheckAllWorkFileAction = (obj) => {
    return {
        type: 'TO_SWITCH_CHECK_ALL_WORKFILE_ACTION',
        obj
    }
}

//切换时间排序的升序和降序 {sortByModifyTime:'ascend' /'descend'}
export const ToChangeWorkFileSortTypeAction = (obj) => {
    return {
        type: 'TO_CHANGE_WORKFILE_SORTTYE_ACTION',
        obj
    }
}

//删除选中的多个work文件 arr=> [{},{},{}]
export const DeleteCheckedWorkFilesAction = (arr) => {
    return {
        type: 'DELETE_CHECKED_WORKFILES_ACTION',
        arr
    }
}