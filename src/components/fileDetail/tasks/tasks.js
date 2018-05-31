import React, { Component } from 'react';
import { Icon } from 'antd';
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
                    {/* 下拉列表菜单 */}
                    <div id="dropdown-container">
                        <header>
                            <h4 className="dropdown_title">列表菜单</h4>
                            <Icon type="close"/>
                        </header>
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
                    </div>
                    <header className="taskItem-head">
                        <h4>
                            <span className="task-title">待处理</span>
                            <span className="task-count">{ hasTaskList ? '.'+ hasTaskList : null }</span>
                        </h4>
                        <Icon type="down-circle-o" size="large"/>
                    </header>
                    <div className="subTasksContent dls-thin-scroll">
                        {/* 没有被选中的任务 */}
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
                        </ul>

                        {/* 被选中的任务 */}
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
                        </ul>

                        {/* 新建任务编辑框 */}
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
                        </div>
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
            </ul> 
        )
    }
}
 
export default Tasks;