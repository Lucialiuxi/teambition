import React, { Component } from 'react';
import { Icon } from 'antd';

// 没有被选中的任务
class SubTask extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <ul className="subTasksWrap">
                <li className="subTask-card-mode">
                    <div className="subTask-card">
                        <div className="subTask-priority bg-priority-0"></div>
                        {/* 选框 */}
                        <div className="subTask-check-box check-box normal"></div>
                        {/* 小条的任务 */}
                        <div className="subTask-content-set">
                            <h4 className="subTask-Item-Title">aa</h4>
                            <div className="subTask-info-wrapper">
                                <div className="task-infos">
                                    <span className="deadline">5月50日 截止</span>
                                    <span className="icon-wrapper">
                                        <Icon type="file-text" />
                                    </span>
                                    <span className="tag tag-color-blue">标签</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul> )
    }
}
 
export default SubTask;