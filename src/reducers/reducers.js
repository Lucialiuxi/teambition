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
        return action.arr.map(val=>{
          val.isShowTaskItemCreator = false;
          return val
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
      case 'Delete_A_Flie_Action':
        return state.map(item=>{
          return item.fileId === action.obj.fileId ? item.isShowTaskItemCreator = true : item.isShowTaskItemCreator = false;
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

    //【进入】 项目文件夹和 【刷新】 的时候请求项目列表
    case 'TaskItems_In_CurrentFile_Action':
      state =  action.arr.map((val)=>{
        val.IsCreating = false;//显示创建子任务框
        val.IsChoiceDeadline = false; //显示创建子任务框的截止时间日历
        val.IsChoiceUrgencyLevel = false;//显示任务紧急程度的框
        val.IsShowDropDownContainer = false;//显示下拉框
        //下拉列表下级的显示框 控制标识
        val.isModifyTaskItem = false; //编辑列表
        val.addATaskItemAfterThis = false;//在此后添加新列表
        val.moveAllSubTasksFromThisToOther = false;//移动本列表所有任务
        val.copyAllSubTasksInsideThis = false;//复制本列表所有任务
        val.deleteAllSubTasksInsideThis = false;//清空本列表所有任务
        val.deleteThisTaskItem = false;//清空本列表所有任务
        return val;
      })
      return state;

     //控制新建任务列表的  子任务  的显示隐藏 被点击的那个新建框才显示
    case 'SubTask_Creator_Is_Show_Action':
      return state.map((val)=>{
          (action.taskItemId===val.taskItemId) ? (val.IsCreating=true) : (val.IsCreating=false)
          return val;
        })

     //隐藏所有的新建任务列表的子任务编辑框
     case 'Hide_All_SubTaskCreators_Action':
      return state.map((val)=>{
          action.close==='close' ? val.IsCreating=false : null
          return val;
      })

     //项目列表的 子任务编辑框的日历 显示
     case 'TaskItem_Calender_IsShow_Action':
     return state.map((val)=>{
         (action.taskItemId===val.taskItemId) ? (val.IsChoiceDeadline=true) : (val.IsChoiceDeadline=false)
         return val;
       })

     //项目列表的 子任务编辑框的日历  隐藏
     case 'Hide_All_TaskItem_Calender_Action':
      return state.map((val)=>{
        action.close==='close' ? val.IsChoiceDeadline=false : null
        return val;
      })

     //项目列表的   紧急选择框 显示
     case 'Show_Choice_UrgencyLevel_Action':
     return state.map((val)=>{
         (action.taskItemId===val.taskItemId) ? (val.IsChoiceUrgencyLevel=true) : (val.IsChoiceUrgencyLevel=false)
         return val;
       })

     //项目列表的   紧急选择框  隐藏
     case 'Hide_Choice_UrgencyLevel_Action':
      return state.map((val)=>{
        action.close==='close' ? val.IsChoiceUrgencyLevel=false : null
        return val;
      })

     //项目列表的 下拉列表框 显示
     case 'TaskItem_DropDownContainer_Show_Action':
     return state.map((val)=>{
         (action.taskItemId===val.taskItemId) ? (val.IsShowDropDownContainer=true) : (val.IsShowDropDownContainer=false)
         return val;
       })

     //项目列表的 下拉列表框 隐藏
     case 'Hide_TaskItem_DropDownContainer':
      return state.map((val)=>{
        if(action.close==='close'){
          val.IsShowDropDownContainer = false;
          val.isModifyTaskItem = false; 
          val.addATaskItemAfterThis = false;
          val.moveAllSubTasksFromThisToOther = false;
          val.copyAllSubTasksInsideThis = false;
          val.deleteAllSubTasksInsideThis = false;
          val.deleteThisTaskItem = false;
        }
        return val;
      })

      //编辑任务列表 显示
      case 'Modify_TaskItem_Action':
      return state.map((val)=>{
          (action.taskItemId===val.taskItemId) ? (val.isModifyTaskItem=true) : (val.isModifyTaskItem=false)
          return val;
      })

      //在此后添加新任务列表 显示
      case 'add_A_TaskItem_After_This_Action':
      console.log(state.map((val)=>{
        (action.taskItemId===val.taskItemId) ? (val.addATaskItemAfterThis=true) : (val.addATaskItemAfterThis=false)
        return val;
    }))
      return state.map((val)=>{
          (action.taskItemId===val.taskItemId) ? (val.addATaskItemAfterThis=true) : (val.addATaskItemAfterThis=false)
          return val;
      })

      //移动本任务列表所有子任务 显示
      case 'move_All_SubTasks_From_This_To_Other_Action':
      return state.map((val)=>{
          (action.taskItemId===val.taskItemId) ? (val.moveAllSubTasksFromThisToOther=true) : (val.moveAllSubTasksFromThisToOther=false)
          return val;
      })

      //复制本任务列表所有子任务 显示
      case 'copy_All_SubTasks_Inside_This_Action':
      return state.map((val)=>{
          (action.taskItemId===val.taskItemId) ? (val.copyAllSubTasksInsideThis=true) : (val.copyAllSubTasksInsideThis=false)
          return val;
      })

      //清空本任务列表所有子任务 显示
      case 'delete_All_SubTasks_Inside_This_Action':
      return state.map((val)=>{
          (action.taskItemId===val.taskItemId) ? (val.deleteAllSubTasksInsideThis=true) : (val.deleteAllSubTasksInsideThis=false)
          return val;
      })

      //删除任务列表 显示
      case 'delete_This_TaskItem_Action':
      return state.map((val)=>{
          (action.taskItemId===val.taskItemId) ? (val.deleteThisTaskItem=true) : (val.deleteThisTaskItem=false)
          return val;
      }) 
 
      //显示下拉列表框主页
      case 'show_DropDownContainer_MainList_Action':
      return state.map((val)=>{
          if(action.taskItemId===val.taskItemId){
            val.isModifyTaskItem = false; 
            val.addATaskItemAfterThis = false;
            val.moveAllSubTasksFromThisToOther = false;
            val.copyAllSubTasksInsideThis = false;
            val.deleteAllSubTasksInsideThis = false;
            val.deleteThisTaskItem = false;
          }
          return val;
      })  

  default:
        return state
  }
}





const allReduers = combineReducers({
    getFileInfo,
    taskItemInfo
})
export default allReduers;