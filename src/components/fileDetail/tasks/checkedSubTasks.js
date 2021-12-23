import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { SwitchToCheckSubtaskServer } from '@/server/requestData';
import { SwitchToCheckSubtaskAction }  from '@/actions/taskAction';

// 被选中的任务
class CheckedSubTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    ToCheckSubTask = (taskItemId,subTaskId,checked) => {
        let { dispatch } = this.props;
        SwitchToCheckSubtaskServer({taskItemId,subTaskId,checked:!checked}).then(({data})=>{
            if(data.success){
                let { subTaskId, checked } = data.data;
                dispatch(SwitchToCheckSubtaskAction({ subTaskId, checked }))
            }
        })
    }
    render() { 
        let {
            subTaskName,
            tag,
            checked,
            taskItemId, 
            subTaskId
        } = this.props;
        
        return ( 
            <ul className="subTask-checked-wrap">
                <li className="subTask-card-mode">  
                    <div className="subTask-card">
                        {/* 选框 */}
                        <div className="subTask-check-box check-box normal" onClick={this.ToCheckSubTask.bind(this,taskItemId,subTaskId,checked)}>
                            <Icon type="check" />
                        </div>
                        {/* 小条的任务 */}
                        <div className="subTask-content-set">
                            <h4 className="subTask-Item-Title">{subTaskName}</h4>
                            <div className="subTask-info-wrapper">
                                <div className="task-infos">
                                    {tag.map((val,i)=><span key={i} className="tag tag-color-blue">{val}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul> )
    }
}
 
export default connect()(CheckedSubTasks);