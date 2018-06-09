import React, { Component } from 'react';
import { Icon } from 'antd';

//移动 或 复制 子任务 --到当前其他任务列表  或者到其他项目文件夹的某一任务列表

class MoveOrCopySubTask extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="MoveOrCopySubTaskWrap">
                <ul className="MoveOrCopySubTaskContent">
                    <li className="MoveOrCopySubTaskList">
                        <span className="MoveOrCopySubTaskTitle">项目</span>
                        <span className="selectFileTitleSpan">
                            <em className="FileTitleEm">项目名称</em>
                            <Icon type="down" className="selectFileDownICon"/>
                        </span>
                    </li>
                    <li className="MoveOrCopySubTaskList">
                        <span className="MoveOrCopySubTaskTitle">列表</span>
                        <span className="selectTaskItemTitleSpan">
                            <em className="TaskItemTitleEm">列表名称</em>
                            <Icon type="down" className="selectTaskItemDownICon"/>
                        </span>
                    </li>
                </ul>
                <button className="ConfirmMoveOrCopySubTaskBtn">确定</button>
            </div>
         )
    }
}
 
export default MoveOrCopySubTask;