import React, { Component } from 'react';
import { deleteATaskItemServer , DeleteAllSubTasksServer } from '@/server/requestData';
import { deleteATaskItemAction , 
         HideTaskItemDropDownContainerAction , 
         deleteSubTasksInATaskItemAction 
}  from '@/actions/taskAction';
 
import { connect } from 'react-redux';
/**
 * 1.删除此任务列表和下面的所有子任务
 * 2.清空此任务列表下的所有子任务  
 *   
 */
class DeleteSubTaskOrDeleteTaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    goToDeleteSubTaskOrDeleteTaskItem=()=>{
        let { fileId , taskItemId , dispatch } = this.props;
        if(this.type==='d1'){//清空列表的子任务
            DeleteAllSubTasksServer({fileId , taskItemId}).then(({data})=>{
                dispatch(HideTaskItemDropDownContainerAction('close'))
                dispatch(deleteSubTasksInATaskItemAction(taskItemId))
            })
        }else if(this.type==='d2'){//删除此任务列表
            deleteATaskItemServer({fileId , taskItemId}).then(({data})=>{
                dispatch(deleteATaskItemAction(data.deletedTaskItemData.taskItemId))
            })
        }
    }
    render() { 
        let { deleteAllSubTasksInsideThis , 
            deleteThisTaskItem , 
            state:{subTaskInfo},
            taskItemId
        } = this.props;

        let tipText ;
        let thisTaskItemSubTasks = subTaskInfo.filter(val=>val.taskItemId===taskItemId);
        let btn;
        if(deleteAllSubTasksInsideThis){//删除改任务列表下的所有任务
            tipText = '您确定要把列表下的所有任务删除吗';
            this.type = 'd1';
            btn = thisTaskItemSubTasks[0]?
                    <button 
                        className="confirmToDeleteSubTaskOrDeleteTaskItem"
                        onClick={this.goToDeleteSubTaskOrDeleteTaskItem}
                    >确定</button> : null;
        }else if(deleteThisTaskItem){//删除此任务列表
            if(thisTaskItemSubTasks[0]){
                tipText = '请先清空此列表上的任务，然后再删除这个列表';
            }else{
                tipText = '请确认是否要删除这个列表？';
            }
            btn = !thisTaskItemSubTasks[0]?<button 
                className="confirmToDeleteSubTaskOrDeleteTaskItem"
                onClick={this.goToDeleteSubTaskOrDeleteTaskItem}
            >确定</button> : null;
            this.type = 'd2';
        }
        
        return ( 
            <div className="DeleteSubTaskOrDeleteTaskItemWrap">
                <div className="tips">{tipText}</div>
               {btn}
            </div>
         )
    }
}
const mapStateToProps = state => {
    return  {
        state
    }
}
export default connect(mapStateToProps,null)(DeleteSubTaskOrDeleteTaskItem);