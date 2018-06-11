import React, { Component } from 'react';
import { deleteATaskItemServer } from '@/server/requestData';
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
        let { fileId , taskItemId } = this.props;
        if(this.type==='d1'){//清空列表的子任务
            deleteATaskItemServer({fileId , taskItemId})
        }else if(this.type==='d2'){//删除此任务列表

        }
    }
    render() { 
        let { deleteAllSubTasksInsideThis , deleteThisTaskItem } = this.props;
        let tipText ;
        if(deleteAllSubTasksInsideThis){
            tipText = '您确定要把列表下的所有任务删除吗';
            this.type = 'd1';
        }else if(deleteThisTaskItem){
            tipText = '删除列表将彻底清空此列表上的所有任务，请确认是否要删除整个列表？';
            this.type = 'd2';
        }
        return ( 
            <div className="DeleteSubTaskOrDeleteTaskItemWrap">
                <div className="tips">{tipText}</div>
                <button 
                    className="confirmToDeleteSubTaskOrDeleteTaskItem"
                    onClick={this.goToDeleteSubTaskOrDeleteTaskItem}
                >确定</button>
            </div>
         )
    }
}
 
export default DeleteSubTaskOrDeleteTaskItem;