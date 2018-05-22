
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