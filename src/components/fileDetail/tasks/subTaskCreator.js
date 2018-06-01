import React, { Component } from 'react';
import { Icon } from 'antd';

// 新建任务编辑框
class SubTaskCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="subTask-creator-wrap">
                <div className="task-creator fade in">
                    <textarea className="task-content-input form-control" placeholder="任务内容"></textarea>
                    <div className="createUser">Lucia</div>
                    <div className="date-wrap">
                        <Icon type="calendar" />
                        <span className="date-text">设置截止时间</span>
                    </div>
                    <div className="scenario-creators-wrap more-set">
                        <div className="scenario-infos-creator-view detail-infos-wrapper">
                            <section className="detail-infos-priority-view no-border-wrapper">
                                <div className="priority-container">
                                    <div className="priority-aside detail-infos-aside short-version">
                                        <div className="icon-circle"></div>
                                        <button className="btn">普通</button>
                                    </div>
                                </div>
                            </section>
                            <div className="setTagBox">
                                <Icon type="tags-o"/>
                                <div className="tag-text">添加标签</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="confirmCreacteBtn-wrap">
                    <button id="confirmCreacteBtn">创建</button>
                </div>
            </div> )
    }
}
 
export default SubTaskCreator;