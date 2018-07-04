import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/';

//注册
export const register = (param) => {
    return axios.post('/usersRegister',param)
}

//登录
export const login = (param) => {
    return axios.post('/userLogin',param)
}

//------------------项目文件file------------------------------------------------------------

//新建项目文件夹
export const createAFileServer = (param) => {
    return axios.post('/createFile',param)
}

//进入或者刷新大图标文件区的时候，请求文件数据 param--->{userLoginName:XXX}
export const getAllFilesInfo = (param) => {
    return axios.post('/AllFilesInfo',param)
}

//修改大图标文件的信息
export const postModifyFileInfo = (param) => {
    return axios.post('/ModifyFileInfo',param)
}

//切换文件的标星
export const ToggleFileStarServer = (param) => {
    return axios.post('/ToggleFileStar',param)
}

//移动文件到回收站
export const MoveFileToRecycleBinServer = (param) => {
    return axios.post('/MoveFileToRecycleBin',param)
}

//删除一个项目文件夹
export const DeleteAFlieServer = (param) => {
    return axios.post('/DeleteAFlie',param)
}



//--------------------------tasks任务------------------------------

//新建默认的任务列表
export const CreateTaskItemServer = (param) => {
    let arr = []
    for (let i = 0; i < 3; i++) {
        arr.push({
            ...param,
            taskItemId:Math.ceil((Math.random()-.5)*10000000+ Date.now()),
            subTaskCount:0,
            index:i
        }) 
    }
    arr[0].taskItemName='待处理';
    arr[1].taskItemName='进行中';
    arr[2].taskItemName='已完成';
    return axios.post('/CreateTaskItem', {param,arr})
}

//新建一个任务列表param:{index:XXX,taskItemName:XXX,fileId:Number}
export const CreateANewTaskItemServer = (param) => {
    return axios.post('/CreateANewTaskItem', {
        ...param,
        taskItemId:Math.ceil((Math.random()-.5)*10000000+ Date.now()),
        subTaskCount:0,
    })
}

//删除一个任务列表 param:{fileId:XXX , taskItemId:XXX }
export const deleteATaskItemServer = (param) => {
    return axios.post('/deleteATaskItem', param)
}

/**
 * 查询一个项目文件下的任务列表
 * @param {fileId: Number} param 
 */
export const GetTaskItemServer = (param) => {
    return axios.post('/GetTaskItem', param)
}

//删除一个项目问价下所有的任务列表  和 任务列表下的子任务 ----在删除一个文件的时候
export const DeleteAllTaskItemAndSubTaskInAFileServer = (param) => {
    return axios.post('/DeleteAllTaskItemAndSubTaskInAFile', param)
}


/**新建一个子任务
 * 
 * @param {checked:false , deadline:String,id:Number,index:Number,subTaskName:String,tag:Array,urgencyLevel:String}
 */
export const CreateASubTaskServer = (param) => {
    return axios.post('/CreateASubTask',param)
}


/**查询所有当前项目文件的任务列表的任务
 * 
 * @param {fileId: Number} param 
 */
export const GetAllSubTasksServer = (param) => {
    return axios.post('/GetAllSubTasks',param)
}

//删除一个任务列表下的所有任务
/**
 * @param {fileId: Number, taskItemId: Number} param 
 */
export const DeleteAllSubTasksServer = (param) => {
    return axios.post('/DeleteAllSubTasks',param)
}


/**修改项目列表的名字
*  @param {fileId:Number , taskItemId:Number , taskItemName:String} param 
*/
export const ModifyATaskItemNameServer = (param) =>{
    return axios.post('/ModifyATaskItemName',param)
}

/**复制 or 移动 一个任务列表的所有任务到另一个列表 MoveOrCopy:'move'/'copy'
 * @param {fileId:Number , taskItemId:Number , MoveOrCopy:String ,currentTaskItemId:Number } param 
 */
export const MoveOrCopySubtaskToAnotherTaskItemServer = (param) => {
    return axios.post('/MoveOrCopySubtaskToAnotherTaskItem',param)
}
/**选中一个任务
 * @param { taskItemId:Number ,subTaskId:Number , checked:Boolean } param 
 */
export const SwitchToCheckSubtaskServer = (param) => {
    return axios.post('/SwitchToCheckSubtask',param)
}

//------------------------------文件works--------------------------------------
/**查询works文件的显示模式
 * @param {username:  String} param 
 */
export const GetWorkFileViewTypeServer = (param) => {
    return axios.post('/GetWorkFileViewType',param)
}

/**新建work文件
 * 
 * @param { fileId: Number, parentId: String ,myId: String,workFileName: String,lastestModifyTime: String} param 
 */
export const CreateAWorkFileServer = (param) => {
    return axios.post('/CreateAWorkFile',param)
}

/**查询当前所在层级的所有works文件 
 * @param {username: String , fileId: Number,parentId: String } param 
 */
export const GetAllWorksFileUnderParentWorksFileServer = (param) => {
    return axios.post('/GetAllWorksFileUnderParentWorksFile',param)
}

/**删除文件夹一个项目文件夹
 * @param {myId:Srting} param 
 */
export const DeleteAWorksFileServer = (param) => {
    return axios.post('/DeleteAWorksFile',param)   
}

/**修改work文件名
 * @param {myId:Srting,workFileName:Srting} param 
 */
export const ModifyAWorkFileNameServer = (param) => {
    return axios.post('/ModifyAWorkFileName',param)
}

/**切换work文件选中状态  单选
 * @param {myId:String,check:boolean} param 
 */
export const ToSwitchCheckAWorkFileServer = (param) => {
    return axios.post('/ToSwitchCheckAWorkFile',param)
}

/**切换全选
 * @param {parentId:String,check:boolean} param 
 */
export const ToSwitchCheckAllWorkFileServer = (param) => {
    return axios.post('/ToSwitchCheckAllWorkFile',param)
}

/**多选删除
 * @param {myIdArr:Array} param 
 */
export const DeleteCheckedWorkFilesServer = (param) => {
    return axios.post('/DeleteCheckedWorkFiles',param)
}

/**切换 缩略图模式ThumbnailView / 列表模式ListView
 * @param { username:String , worksViewType:String } param 
 */
export const ChangeWorksViewTypeServer = (param) => {
    return axios.post('/ChangeWorksViewType',param)
}

/**
 * 移动OR复制一个workFile到其他文件夹下 keyWord:'复制'/'移动'
 * @param { myId: String , keyWord:Sting , NewfileId: Number , NewParentId:String } param 
 */
export const MoveOrCopyOneWorkFileServer = (param) => {
    return axios.post('/MoveOrCopyOneWorkFile',param)   
}

/**
 * 移动OR复制一组workFiles到其他文件夹下 keyWord:'复制'/'移动'
 * @param { fileId: Number , parentId:String , keyWord:Sting , NewfileId: Number , NewParentId:String } param 
 */
export const MoveOrCopyOneGroupWorkFilesServer = (param) => {
    return axios.post('/MoveOrCopyOneGroupWorkFiles',param)   
}