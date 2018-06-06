//新建--项目列表
import React, { Component } from 'react';
import { Icon } from 'antd';

class TaskItemCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
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

         )
    }
}
 
export default TaskItemCreator;