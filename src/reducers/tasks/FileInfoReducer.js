const getFileInfo = (state = [], action) => {
    switch (action.type) {
      //每次登录的时候先清空state里面的数据
      case 'CLEAR_STATE_ACTION':
        return state=[];

      //新建文件夹
      case 'CREATE_A_FILE':
        return [...state,action.obj];

      //刷新页面请求大图标文件数据
      case 'ALL_FILE_INFO_ARR':
        return action.arr.map(val=>{
          val.isShowTaskItemCreator = false;
          return val;
        })

      //修改大图标文件信息
      case 'MODIFY_A_FILE_INFO':
        return state.map(item=>{
            return item.fileId === action.obj.fileId ? item = action.obj : item
          })

      case 'TOGGLE_FILE_STAR':
        return state.map(item=>{
          return item.fileId === action.obj.fileId ? {...item,star:!item.star} : item
        })
      
      //移动文件到回收站
      case 'MOVE_FILE_TO_RECYCLEBIN':
        return state.map(item=>{
          return item.fileId === action.obj.fileId ? {...item,inRecycleBin:!item.inRecycleBin} : item
        })
   
      //删除一个项目文件夹
      case 'DELETE_A_FILE_ACTION':
        return state.filter(item=>{
          return item.fileId === action.obj.fileId ? null : item
        })

      //新建项目列表框 显示
      case 'SHOW_TASKITEM_CREATOR_ACTION':
        return state.map(item=>{
          item.fileId === Number(action.fileId) ? item.isShowTaskItemCreator = true : item.isShowTaskItemCreator = false;
          return item
        })

      //新建项目列表框 隐藏
      case 'HIDE_TASKITEM_CREATOR_ACTION':
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