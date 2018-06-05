import { combineReducers } from 'redux';

const getFileInfo = (state = [], action) => {
    switch (action.type) {
      //每次登录的时候先清空state里面的数据
      case 'Clear_State_Action':
        return state=[]
      //新建文件夹
      case 'Create_A_File':
        return [...state,action.obj]

      //刷新页面请求大图标文件数据
      case 'get_All_files_Info':
        return action.arr

      //修改大图标文件信息
      case 'Modify_file_Info':
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

const taskItemInfo = (state = [], action) =>{
  switch (action.type){
    //新建项目文件的时候创建默认的项目列表，开发自己看数据
    case 'Create_Default_TaskItems':
      return action.arr;

    //进入项目文件夹的时候项目列表只请求一次，存在state中，刷新不用多次请求
    case 'TaskItems_In_CurrentFile_Action':
      return action.arr;
  default:
        return state
  }
}

const allReduers = combineReducers({
    getFileInfo,
    taskItemInfo
})
export default allReduers;