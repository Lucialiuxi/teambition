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



//--------------------------任务列表------------------------------
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
    arr[1].taskItemName='已完成';
    arr[2].taskItemName='进行中';
    return axios.post('/CreateTaskItem', {param,arr})
}

//新建一个任务列表param:{index:XXX,taskItemName:XXX}
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
//---------------子任务-----------------------------------------------
//查询一个项目文件下的任务列表 和任务列表下 子任务 --子任务还没有写
export const GetTaskItemServer = (param) => {
    return axios.post('/GetTaskItem', param)
}

//删除一个项目问价下所有的任务列表  和 任务列表下的子任务
export const DeleteAllTaskItemAndSubTaskInAFileServer = (param) => {
    return axios.post('/DeleteAllTaskItemAndSubTaskInAFile', param)
}

//新建一个子任务
export const CreateASubTaskServer = (param) => {
    return axios.post('/CreateASubTask',param)
}

//查询所有当前项目文件的任务列表的任务
export const GetAllSubTasksServer = (param) => {
    return axios.post('/GetAllSubTasks',param)
}

//删除一个任务列表下的所有任务
export const DeleteAllSubTasksServer = (param) => {
    return axios.post('/DeleteAllSubTasks',param)
}