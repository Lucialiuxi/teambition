
// 下拉列表菜单
import React, { Component } from 'react';
import { Icon } from 'antd';
import MoveOrCopySubTask from './moveOrCopySubTask'
import DeleteSubTaskOrDeleteTaskItem from './deleteSubTaskOrDeleteTaskItem'

/**
 * 以下列表是否显示的【标识】：
    * 编辑列表 isModifyTaskItem
    * 在此后添加新列表 addATaskItemAfterThis
    * 移动本列表所有任务 moveAllSubTasksFromThisToOther
    * 复制本列表所有任务 copyAllSubTasksInsideThis
    * 清空本列表所有任务 deleteAllSubTasksInsideThis
    * 删除列表 deleteThisTaskItem
 */
let listData = [
    {
        iconType:'edit',
        title:'编辑列表',
        index:1
    },
    {
        iconType:'plus',
        title:'在此后添加新列表',
        index:2
    },
    {
        iconType:'edit',
        title:'移动本列表所有任务',
        index:3
    },
    {
        iconType:'copy',
        title:'复制本列表所有任务',
        index:4
    },
    {
        iconType:'delete',
        title:'清空本列表所有任务',
        index:5
    },
    {
        iconType:'delete',
        title:'删除列表',
        index:6
    },
]

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    clickToNextMenu=(e)=>{
        let t = e.target
        if(!t.classList.contains('modifyItem')){
            t = e.target.parentNode;
            let w = t.innerText;
            if(w==='编辑列表'){

            }else if(w==='在此后添加新列表'){

            }else if(w==='移动本列表所有任务'){

            }else if(w==='复制本列表所有任务'){

            }else if(w==='清空本列表所有任务'){

            }else if(w==='删除列表'){

            }
        }
    }
    render() {
        let {taskItemInfo:{
                addATaskItemAfterThis,
                copyAllSubTasksInsideThis,
                deleteAllSubTasksInsideThis,
                deleteThisTaskItem,
                isModifyTaskItem,
                moveAllSubTasksFromThisToOther,
                taskItemId
            }} = this.props;

        return ( 
            <div id="dropdown-container">
                {/* 列表菜单没有className  编辑列表M_TaskItem 添加列表Add_TaskItem setDeadline*/}
                <header className="Add_TaskItem">
                    <Icon type="left" />
                    <h4 className="dropdown_title">列表菜单</h4>
                    <Icon type="close"/>
                </header>
                <hr/>
                <ul className="modifyDetailList">
                    {listData.map(val=>{
                        return <li className="modifyItem" key={val.index} onClick={this.clickToNextMenu}>
                                    <Icon type={val.iconType} />
                                    {val.title}
                                </li>
                    })}
                </ul>
                {/* 编辑或添加列表 */}
                {/* <div className="MOrAddListTaskItem">
                    <p className="createATaskItemText">新列表将被添加在当前列表之后</p>
                    <input type="text" className="MTaskItemInput add" placeholder="列表名称"/> */}
                    {/* saveModifyInputValue-->保存按钮 createATaskItemBtn-->创建按钮 */}
                    {/* <button className="createATaskItemBtn disable">创建</button>
                </div> */}
                {/* 移动 或 复制 任务 */}
                {/* <MoveOrCopySubTask/> */}
                 {/* 删除列表所有任务 或者 删除列表 */}
                {/* <DeleteSubTaskOrDeleteTaskItem/> */}
            </div>
         )
    }
}
 
export default DropDown;