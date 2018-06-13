import React, { Component } from 'react';
import classNames from 'classnames';

// 没有被选中的任务
class SubTask extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let {
            deadline,
            subTaskName,
            tag,
            urgencyLevel
        } = this.props;
        let a ;
        if(urgencyLevel==='普通'){
            a =  'bg-priority-0'
        }else if(urgencyLevel==='紧急'){
            a =  'bg-priority-1'
        }else if(urgencyLevel==='非常紧急'){
            a =  'bg-priority-2'
        }
        let c = classNames('subTask-priority' , a)
        return ( 
            <ul className="subTasksWrap">
                <li className="subTask-card-mode">
                    <div className="subTask-card">
                        <div className={c}></div>
                        {/* 选框 */}
                        <div className="subTask-check-box check-box normal"></div>
                        {/* 小条的任务 */}
                        <div className="subTask-content-set">
                            <h4 className="subTask-Item-Title">{subTaskName}</h4>
                            <div className="subTask-info-wrapper">
                                <div className="task-infos">
                                    {deadline? <span className="deadline">{deadline}截止</span>:null}
                                    {/* <span className="icon-wrapper">
                                        <Icon type="file-text" />
                                    </span> */}
                                    {tag.map((val,i)=><span key={i} className="tag tag-color-blue">{val}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul> )
    }
}
 
export default SubTask;