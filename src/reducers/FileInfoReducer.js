const getFileInfo = (state = [], action) => {
    switch (action.type) {
      //每次登录的时候先清空state里面的数据
      case 'Clear_State_Action':
        return state=[];

      //新建文件夹
      case 'Create_A_File':
        return [...state,action.obj];

      //刷新页面请求大图标文件数据
      case 'get_All_files_Info':
        return action.arr.map(val=>{
          val.isShowTaskItemCreator = false;
          return val;
        })

 
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

      //新建项目列表框 显示
      case 'TaskItem_Creator_Is_Show_Action':
        return state.map(item=>{
          item.fileId === Number(action.fileId) ? item.isShowTaskItemCreator = true : item.isShowTaskItemCreator = false;
          return item
        })

      //新建项目列表框 隐藏
      case 'Hide_TaskItem_Creator_Action':
        if(action.close==='close'){
          return state.map(item=>{
              item.isShowTaskItemCreator=false
              return item
          })
        }
      break;

     default:
          return state
    }
}
export default getFileInfo;