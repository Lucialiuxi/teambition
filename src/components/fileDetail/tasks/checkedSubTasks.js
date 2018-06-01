import React, { Component } from 'react';
import { Icon } from 'antd';

// 被选中的任务
class CheckedSubTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <ul className="subTask-checked-wrap">
                <li className="subTask-card-mode">  
                    <div className="subTask-card">
                        {/* 选框 */}
                        <div className="subTask-check-box check-box normal">
                            <Icon type="check" />
                        </div>
                        {/* 小条的任务 */}
                        <div className="subTask-content-set">
                            <h4 className="subTask-Item-Title">aa</h4>
                            <div className="subTask-info-wrapper">
                                <div className="task-infos">
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
 
export default CheckedSubTasks;