
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
    return axios.post('/deleteAFlie',param)
}