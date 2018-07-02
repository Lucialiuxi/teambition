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

//点击进入文件内部，记录文件信息  {myId: String,workFileName: String}
export const dbClickToWorkFileInsideAction = (obj) => {
    return {
        type: 'DBCLICK_TO_WORKFILE_INSIDE_ACTION',
        obj
    }
}

//刷新有面包屑导航条的页面，把cookie存的拿出来存起来
export const getBreadCrumbAction = (arr) => {
    return {
        type: 'GET_BREAD_CREAB_ACTION',
        arr
    }
}

//点击面包屑导航条，判断导航条的数据是否发生变化
export const changeBreadCrumbAction = myId => {
    return {
        type: 'CHANGE_BREAD_CRUMB_ACTION',
        myId
    }
}

//work页回到最顶层文件的时候 和不在work页的时候，不显示面包屑导航条
export const emptyBreadCrumbAction = () => {
    return {
        type: 'EMPTY_BREAD_CRUMB_ACTION'
    }
}


//显示deleteCover定位框
export const toShowDelteCoverAction = (myId) => {
    return {
        type: 'TO_SHOW_DELETE_COVER_ACTION',
        myId
    }
}

//隐藏deleteCover定位框
export const toHideDelteCoverAction = () => {
    return {
        type: 'TO_HIDE_DELETE_COVER_ACTION'
    }
}

/**
 * 每点击进入下一层文件夹的时候，弹框就会挂载一次，把请求到的每一次的文件的数据存WorkFileMoveAndCopyMaskData
 * @param { ParentId: String  ,  arr:[{},{},...] } obj 
 */
export const saveAGroupOfSameParentIdWorkFilesAction = obj => {
    return {
        type: 'SAVE_A_GROUP_OF_SAME_PARENTID_WOKRFILES_ACTION',
        obj
    }
}

//路由走到'/project/fileId/works'-->清空复制和移动workfiles弹框存的数据,
export const emptyAGroupOfSameParentIdWorkFilesAction = () => {
    return {
        type: 'EMPTY_A_GROUP_OF_SAME_PARENTID_WOKRFILES_ACTION',
    }
}

/**点击移动和复制 workfile的弹框的个人项目目录，后只显示顶层文件
 * { ParentId: String  ,  arr:[{},{},...] }
 */
export const showTopLevelWorkFilesAction = obj => {
    return {
        type: 'SHOW_TOP_LEVEL_WORKFILES_ACTION',
        obj
    }  
}

/**
 * 点击最后一个WorkFilesMenuList下的li，把请求到的数据放到reducer中
 * { ParentId:String , arr:[{},{},...] }
 */
export const pushAWorkFilesMenuListAction = obj => {
    return {
        type: 'PUSH_A_WORKFILESMENULIST_ACTION',
        obj
    } 
}

/**
 * 点击的不是最后一个WorkFilesMenuList下的li，parentId 有ulDataId重复的，之后的都删除
 * { ulDataId:String , ParentId:String }
 */
export const UpdateWorkFileMoveAndCopyMaskDataAction = obj => {
    return {
        type:'UPDATE_WORKFILE_MOVE_AND_COPY_MASKDATA_ACTION',
        obj
    }
}

/**
 * 关闭移动复制弹框，数据回答打开之前的状态
 */

export const closeWorkFileMoveAndCopyMaskAction = obj => {
    return {
        type:'CLOSE_WORKFILEMOVEANDCOPYMASK_ACTION',
        obj
    }   
}