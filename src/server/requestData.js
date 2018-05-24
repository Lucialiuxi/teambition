
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/';

//注册
export const register = (param) => {
    // console.log(param)
    return axios.post('/usersRegister',param)
}

//登录
export const login = (param) => {
    // console.log(param)
    return axios.post('/userLogin',param)
}

//新建项目文件夹
export const createAFile = (param) => {
    console.log('createAFile',param)
    return axios.post('/createFile',param)
}

//进入或者刷新大图标文件区的时候，请求文件数据 param--->{userLoginName:XXX}
export const getAllFilesInfo = (param) => {
    // console.log(param)
    return axios.post('/AllFilesInfo',param)
}