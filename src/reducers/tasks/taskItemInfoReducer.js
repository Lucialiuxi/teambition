const taskItemInfo = (state = [], action) =>{
    switch (action.type){
      //新建项目文件的时候创建默认的项目列表，开发自己看数据
      case 'CREATE_DEFAULT_TASKITEMS_ACTION':
        return action.arr;
  
      //新建一个项目列表   
      case 'CREATE_A_TASKITEM_ACTION':
        return [...state,action.obj];
  
      //删除一个项目列表   
      case 'DELETE_A_TASKITEM_ACTION':
        state = state.filter(val=>val.taskItemId!==action.taskItemId)
        return state;
  
      //更改一个项目列表的名字
      case 'MODIFY_A_TASKITEM_NAME_ACTION':
        return state.map(val=>{
          if(val.taskItemId===action.obj.taskItemId){
            val.taskItemName = action.obj.taskItemName;
          }
          return val;
        })

      //【进入】 项目文件夹和 【刷新】 的时候请求项目列表
      case 'TASKITEMS_IN_CURRENTFILE_ACTION':
        return action.arr.map((val)=>{
            val.IsCreating = false;//显示创建子任务框
            val.IsChoiceDeadline = false; //显示创建子任务框的截止时间日历 的框
            val.IsChoiceUrgencyLevel = false;//显示任务紧急程度的框
            val.IsShowDropDownContainer = false;//显示下拉框
            //下拉列表下级的显示框 控制标识
            val.isModifyTaskItem = false; //编辑列表 的框
            val.addATaskItemAfterThis = false;//在此后添加新列表 的框
            val.moveAllSubTasksFromThisToOther = false;//移动本列表所有任务 的框
            val.copyAllSubTasksInsideThis = false;//复制本列表所有任务 的框
            val.deleteAllSubTasksInsideThis = false;//清空本列表所有任务 的框
            val.deleteThisTaskItem = false;//清空本列表所有任务 的框
            val.isShowFileName = false;//在移动或者复制任务显示所有项目名 的框
            val.isShowCurrentTaskItemName = false;//在移动或者复制任务显示列表名 的框
            return val;
          })
  
       //控制新建任务列表的  子任务  的显示隐藏 被点击的那个新建框才显示
      case 'SUBTASK_CREATOR_IS_SHOW_ACTION':
        return state.map((val)=>{
            (action.taskItemId===val.taskItemId) ? (val.IsCreating=true) : (val.IsCreating=false)
            return val;
          })
          
       //隐藏所有的新建任务列表的子任务编辑框
       case 'HIDE_ALL_SUBTASK_CREATORS_ACTION':
        return state.map((val)=>{
          if(action.close==='close'){
            val.IsCreating=false
          }
            return val;
        })
  
       //项目列表的 子任务编辑框的日历 显示
       case 'TASKITEM_CALENDER_IS_SHOW_ACTION':
        return state.map((val)=>{
            (action.taskItemId===val.taskItemId) ? (val.IsChoiceDeadline=true) : (val.IsChoiceDeadline=false)
            return val;
          })
          
       //项目列表的 子任务编辑框的日历  隐藏
       case 'HIDE_ALL_TASKITEM_CALENDER_ACTION':
          return state.map((val)=>{
            if(action.close==='close'){
              val.IsChoiceDeadline=false
            }
            return val;
          })
  
       //项目列表的   紧急选择框 显示
       case 'SHOW_CHOICE_URGENCY_LEVEL_ACTION':
          return state.map((val)=>{
              (action.taskItemId===val.taskItemId) ? (val.IsChoiceUrgencyLevel=true) : (val.IsChoiceUrgencyLevel=false)
              return val;
            })
  
       //项目列表的   紧急选择框  隐藏
       case 'HIDE_CHOICE_URGENCY_LEVEL_ACTION':
          return state.map((val)=>{
            if(action.close==='close'){
              val.IsChoiceUrgencyLevel=false
            }
            return val;
          })
  
       //项目列表的 下拉列表框 显示
       case 'TASKITEM_DROPDOWN_CONTAINER_SHOW_ACTION':
          return state.map((val)=>{
              (action.taskItemId===val.taskItemId) ? (val.IsShowDropDownContainer=true) : (val.IsShowDropDownContainer=false)
              return val;
            })
  
       //项目列表的 下拉列表框 隐藏
       case 'HIDE_TASKITEM_DROPDOWN_CONTAINER_ACTION':
          return state.map((val)=>{
            if(action.close==='close'){
              val.IsShowDropDownContainer = false;
              val.isModifyTaskItem = false; 
              val.addATaskItemAfterThis = false;
              val.moveAllSubTasksFromThisToOther = false;
              val.copyAllSubTasksInsideThis = false;
              val.deleteAllSubTasksInsideThis = false;
              val.deleteThisTaskItem = false;
              val.isShowFileName = false; 
              val.isShowCurrentTaskItemName = false; 
            }
            return val;
          })
  
        //编辑任务列表 显示
        case 'MODIFY_TASKITEM_ACTION':
          return state.map((val)=>{
              (action.taskItemId===val.taskItemId) ? (val.isModifyTaskItem=true) : (val.isModifyTaskItem=false)
              return val;
          })
  
        //在此后添加新任务列表 显示
        case 'ADD_A_TASKITEM_AFTER_THIS_ACTION':
          return state.map((val)=>{
              (action.taskItemId===val.taskItemId) ? (val.addATaskItemAfterThis=true) : (val.addATaskItemAfterThis=false)
              return val;
          })
  
        //移动本任务列表所有子任务 显示
        case 'MOVE_ALL_SUBTASKS_FROM_THIS_TO_OTHER_ACTION':
          return state.map((val)=>{
              (action.taskItemId===val.taskItemId) ? (val.moveAllSubTasksFromThisToOther=true) : (val.moveAllSubTasksFromThisToOther=false)
              return val;
          })
  
        //复制本任务列表所有子任务 显示
        case 'COPEY_ALL_SUBTASKS_IINSIDE_THIS_ACTION':
          return state.map((val)=>{
              (action.taskItemId===val.taskItemId) ? (val.copyAllSubTasksInsideThis=true) : (val.copyAllSubTasksInsideThis=false)
              return val;
          })

        //移动OR复制任务 的【项目名显示框】   显示
        case 'TO_SEE_SHOW_FILENAMECOVER':
          return state.map((val)=>{
              if(action.obj.taskItemId===val.taskItemId){
                val.isShowFileName= action.obj.isShowFileName
              }
              return val;
          })

         //移动OR复制任务 的【项目名显示框】   隐藏
         case 'TO_HIDE_SHOW_FILENAMECOVER':
            if(action.close==='close'){
              state.forEach((val)=>val.isShowFileName= false)
            }
            return state;

        //移动OR复制任务 的【列表名显示框】   显示
        case 'TO_SEE_SHOW_CURRENT_TASKITEMNAMECOVER':
          return state.map((val)=>{
              if(action.obj.taskItemId===val.taskItemId){
                val.isShowCurrentTaskItemName= action.obj.isShowCurrentTaskItemName
              }
              return val;
          })
         
        //移动OR复制任务 的【列表名显示框】   隐藏
        case 'TO_HIDE_SHOW_CURRENT_TASKITEMNAMECOVER':
            if(action.close==='close'){
              state.forEach((val)=>val.isShowCurrentTaskItemName= false)
            }
            return state;


        //清空本任务列表所有子任务 显示
        case 'DELETE_ALL_SUBTASKS_INSIDE_THIS_ACTION':
          return state.map((val)=>{
              (action.taskItemId===val.taskItemId) ? (val.deleteAllSubTasksInsideThis=true) : (val.deleteAllSubTasksInsideThis=false)
              return val;
          })
  
        //删除任务列表 显示
        case 'DELETE_THIS_TASKITEM_ACTION':
          return state.map((val)=>{
              (action.taskItemId===val.taskItemId) ? (val.deleteThisTaskItem=true) : (val.deleteThisTaskItem=false)
              return val;
          }) 
   
        //显示下拉列表框主页
        case 'SHOW_DROPDOWN_CONTAINER_MAINLIST_ACTION':
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
  
        //把查询到的任务列表的数据存到state中
        case 'SAVE_FOUND_TASKITEMS_ACTION':
          let Fid = action.arr[0].fileId;
          let bl = state.some(el=>el.fileId===Fid);
          if(!bl){
            let newArr = action.arr.map(val=>{
              val.isShowTaskItemCreator = false;
              return val;
            })
            return state.concat(newArr)
          }else{
            return state
          }

    default:
          return state
    }
  }

  export default taskItemInfo;