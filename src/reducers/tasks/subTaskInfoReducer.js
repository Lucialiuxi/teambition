const subTaskInfo = (state = [] , action) => {
    switch (action.type){
      //创建一个子任务
      case 'CREATE_A_SUBTASK_ACTION':
        return [...state,action.obj];
  
      //查询一个项目文件下的所有子任务
      case 'FIND_ALL_SUBTASKS_INSIDE_A_FILE_ACTION':
        return action.arr
  
      //删除一个任务列表下的子任务
      case 'DELETE_SUBTASKS_IN_A_TASKITEM_ACTION':
        state = state.filter(val=>val.taskItemId!==action.taskItemId)
        return state  
  
      //移动任务
      case 'MOVE_SUBTASKS_TO_ANOTHER_TASKITEM_ACTION':
        let { currentTaskItemId , fileId , taskItemId } = action.arr;
        return state.map(val=>{
            if(val.taskItemId===currentTaskItemId){
                val.taskItemId = taskItemId;
                val.fileId = fileId;
            }
            return val;
        })
      //复制任务 [{},{}] 数组的每个对象都是完整的一个任务数据 
      case 'COPY_SUBTASKS_FOR_ANOTHER_TASKITEM_ACTION':
        let arr = [...state].concat(action.arr);
        state = [...arr]
        return state;

      //切换任务的选中状态
      case 'SWITCH_TO_CHECK_SUBTASK_ACTIOIN':
        return state.map(val => {
          if(val.subTaskId === action.obj.subTaskId){
            val.checked = action.obj.checked;
          }
          return val
        })

    default:
      return state;
    }
}
export default subTaskInfo;