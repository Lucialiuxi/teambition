import { combineReducers } from 'redux';

const getFileInfo = (state = [], action) => {
    switch (action.type) {
        //新建文件夹
      case 'Create_A_File':
        return [
          ...state,
          action.obj
        ]
    //刷新页面请求大图标文件数据
      case 'get_All_files_Info':
        return [
            ...action
        ]
     default:
          return state
    }
  }



const allReduers = combineReducers({
    getFileInfo
})
export default allReduers;

