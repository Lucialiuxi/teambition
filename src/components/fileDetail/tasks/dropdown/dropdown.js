import React, { Component } from 'react';
import { Icon } from 'antd';
//日历
import CanlenderMode from './calenderMode';
import MoveOrCopySubTask from './moveOrCopySubTask'
import DeleteSubTaskOrDeleteTaskItem from './deleteSubTaskOrDeleteTaskItem'

// 下拉列表菜单
class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return ( 
            <div id="dropdown-container">
                {/* 列表菜单没有className  编辑列表M_TaskItem 添加列表Add_TaskItem setDeadline*/}
                <header className="Add_TaskItem">
                    <Icon type="left" />
                    <h4 className="dropdown_title">移到回收站</h4>
                    <Icon type="close"/>
                </header>
                <hr/>
                <ul className="modifyDetailList">
                    <li className="modifyItem">
                        <Icon type="edit" />
                        编辑列表
                    </li>
                    <li className="modifyItem">
                        <Icon type="plus" />
                        在此后添加新列表
                    </li>
                    <li className="modifyItem">
                        <Icon type="calendar" />
                        设置本列表所有任务截止时间
                    </li>
                    <li className="modifyItem">
                        <Icon type="edit" />
                        移动本列表所有任务
                    </li>
                    <li className="modifyItem">
                        <Icon type="copy" />
                        复制本列表所有任务
                    </li>
                    <li className="modifyItem">
                        <Icon type="delete" />
                        本列表所有任务移到回收站
                    </li>
                    <li className="modifyItem">
                        <Icon type="delete" />
                        删除列表
                    </li>
                </ul>
                {/* 编辑或添加列表 */}
                <div className="MOrAddListTaskItem">
                    <p className="createATaskItemText">新列表将被添加在当前列表之后</p>
                    <input type="text" className="MTaskItemInput add" placeholder="列表名称"/>
                    {/* saveModifyInputValue-->保存按钮 createATaskItemBtn-->创建按钮 */}
                    <button className="createATaskItemBtn disable">创建</button>
                </div>
                {/* 选择截止时间 */}
                <div className="choiceDeadline">
                    <CanlenderMode/>
                </div>
                {/* 移动 或 复制 任务 */}
                <MoveOrCopySubTask/>
                 {/* 删除列表所有任务 或者 删除列表 */}
                <DeleteSubTaskOrDeleteTaskItem/>
            </div>
         )
    }
}
 
export default DropDown;