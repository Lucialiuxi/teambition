import { combineReducers } from 'redux';

const getFileInfo = (state = [], action) => {
    console.log('reducer',state,action)
    switch (action.type) {

        //新建文件夹
      case 'Create_A_File':
      console.log('Create_A_File',state,action.obj)
        return [...state,action.obj]

    //刷新页面请求大图标文件数据
      case 'get_All_files_Info':
      // console.log('get_All_files_Info',state,action)
        return action.arr

      case 'Modify_file_Info':
      // console.log('Modify_file_Info',state,action.obj)
        return state.map(item=>{
            console.log(item.fileId === action.obj.fileId ? item = action.obj : item)
            return item.fileId === action.obj.fileId ? item = action.obj : item
          })
        
     default:
          return state
    }
  }



const allReduers = combineReducers({
    getFileInfo
})
export default allReduers;