const subTaskInfo = (state = [] , action) => {
    switch (action.type){
      //创建一个子任务
      case 'create_A_SubTask_Action':
        return [...state,action.obj];
  
      //查询一个项目文件下的所有子任务
      case 'find_All_SubTasks_Inside_A_file_Action':
        return action.arr
  
      //删除一个任务列表下的子任务
      case 'delete_SubTasks_In_A_TaskItem_Action':
        state = state.filter(val=>val.taskItemId!==action.taskItemId)
        return state  
  
    default:
      return state;
    }
}
export default subTaskInfo;