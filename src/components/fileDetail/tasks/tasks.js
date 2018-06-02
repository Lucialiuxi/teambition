import React, { Component } from 'react';
import { Icon } from 'antd';
import DropDown from './dropdown/dropdown';
import SubTask from './subTasks';
import CheckedSubTasks from './checkedSubTasks';
import SubTaskCreator from './subTaskCreator'


import './tasks.css';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasTaskList:0
         }
    }
    com
    render() { 
        let { hasTaskList } = this.state;
        return (
            <ul id="TasksWrap">
                <li className="taskItem">
                    {/* 下拉编辑框 */}
                    <DropDown/>
                    {/*  */}
                    <header className="taskItem-head">
                        <h4>
                            <span className="task-title">待处理</span>
                            <span className="task-count">{ hasTaskList ? '.'+ hasTaskList : null }</span>
                        </h4>
                        <Icon type="down-circle-o" size="large"/>
                    </header>
                    <div className="subTasksContent dls-thin-scroll">
                        {/* 没有被选中的任务 */}
                        <SubTask/>

                        {/* 被选中的任务 */}
                        <CheckedSubTasks/>

                        {/* 新建任务编辑框 */}
                        <SubTaskCreator/>
                        <div className="invisible-wrapper"></div>
                    </div>

                    {/* 点击添加任务 */}
                    <div className="task-creator-handler-wrap">
                        <a className="task-creator-handler link-add-handler">
                            <Icon type="plus-circle" style={{ fontSize: 15, color: '#3da8f5' , marginRight:'10px'}}/>
                            添加任务
                        </a>
                    </div> 
                </li>
                {/* 新建任务列表 */}
                <li className="taskItem createWrap">
                    <div className="createTaskItem">
                        <a>
                            <Icon type="plus" />
                            新建任务列表
                        </a>
                    </div>
                    <div className="creator-form-wrap">
                        <input type="text" placeholder="新建任务列表..." className="stage-name"/>
                        <div className="btns">  
                            <a className="btn submit" >保存</a> 
                            <a className="btn cancel">取消</a>
                        </div>
                    </div>
                </li>
            </ul> 
        )
    }
}
 
export default Tasks;