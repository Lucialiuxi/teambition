import { combineReducers } from 'redux';

const getFileInfo = (state = [], action) => {
    switch (action.type) {
      //每次登录的时候先清空state里面的数据
      case 'Clear_State_Action':
      return state=[]
      //新建文件夹
      case 'Create_A_File':
      // console.log('Create_A_File',state,action.obj)
        return [...state,action.obj]

      //刷新页面请求大图标文件数据
      case 'get_All_files_Info':
      // console.log('get_All_files_Info',state,action)
        return action.arr

      //修改大图标文件信息
      case 'Modify_file_Info':
      // console.log('Modify_file_Info',state,action.obj)
        return state.map(item=>{
            return item.fileId === action.obj.fileId ? item = action.obj : item
          })
       case 'Toggle_File_Star':
          return state.map(item=>{
            return item.fileId === action.obj.fileId ? {...item,star:!item.star} : item
          })
      
       //移动文件到回收站
       case 'Move_File_To_RecycleBin':
       return state.map(item=>{
        return item.fileId === action.obj.fileId ? {...item,inRecycleBin:!item.inRecycleBin} : item
       })
   
       //删除一个项目文件夹
       case 'Delete_A_Flie_Action':
       return state.filter(item=>{
        return item.fileId === action.obj.fileId ? null : item
       })
     default:
          return state
    }
  }



const allReduers = combineReducers({
    getFileInfo
})
export default allReduers;