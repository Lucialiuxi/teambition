import React, { Component } from 'react';
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
    render() { 
        return ( 
            <div className="DeleteSubTaskOrDeleteTaskItemWrap">
                <div className="tips">您确定要把列表下的所有任务移到回收站吗？</div>
                {/* <div className="tips">删除列表将彻底清空此列表上的所有任务，请确认是否要删除整个列表？</div> */}
                <button className="confirmToDeleteSubTaskOrDeleteTaskItem">确定</button>
            </div>
         )
    }
}
 
export default DeleteSubTaskOrDeleteTaskItem;