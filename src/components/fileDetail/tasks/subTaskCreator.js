import React, { Component } from 'react';
import { Icon} from 'antd';
import { connect } from 'react-redux';
import { CreateASubTaskServer } from '@/server/requestData'
import { ShowChoiceUrgencyLevelAction  }  from '@/actions/action';
// 新建--项目列表子任务
class SubTaskCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{}
        }
    }
    setDeadline=()=>{
        // console.log('setDeadline',this.props)
        let { id , GoToChoiceSubTaskDeadline } = this.props;
        GoToChoiceSubTaskDeadline(id)
    }
    CreateASubTask=()=>{//创建子任务
        // console.log(this.subTaskValue.value ,this.props)
        let { id , dispatch , deadline} = this.props;
        let val = this.subTaskValue.value.trim();
        if(val){
            this.subTaskValue.value=''
            CreateASubTaskServer({id,subTaskName:val},deadline)
        }
    }
    goToChoiceUrgencyLevel=()=>{
        let { id, dispatch , state:{taskItemInfo} } = this.props;
        dispatch(ShowChoiceUrgencyLevelAction(id))
        let obj = taskItemInfo.filter(val=>val.taskItemId===id)[0]
        this.setState({
            data:obj
        })
    }
    render() {
        let {deadline } = this.props;
        let { IsChoiceUrgencyLevel } = this.state.data;
        console.log(IsChoiceUrgencyLevel)
        return (
        <div 
            className="subTask-creator-wrap"
        >
        <div className="task-creator fade in">
            <textarea 
                className="task-content-input form-control" 
                placeholder="任务内容"
                ref={ node => this.subTaskValue = node }  
            ></textarea>
            <div className="createUser">Lucia</div>
            <div className="date-wrap" onClick={this.setDeadline}>
                <Icon type="calendar" />
                <span className="date-text">{deadline ? deadline : '设置截止时间'}</span>
            </div>
            <div className="scenario-creators-wrap more-set">
                <div className="scenario-infos-creator-view detail-infos-wrapper">
                    <section className="detail-infos-priority-view no-border-wrapper">
                        <div className="priority-container">
                            <div className="UrgencyLevelWrap priority-aside detail-infos-aside short-version">
                            {/* 任务紧急情况 */}
                                {IsChoiceUrgencyLevel ? <ul id="taskUrgency">
                                    <li className="taskUrgencyLi">
                                        <span className="normalBtn">普通</span>
                                        <Icon type="check" className="taskUrgencyIcon"/>
                                    </li>
                                    <li className="taskUrgencyLi">
                                        <span className="urgencyBtn">紧急</span>
                                        <Icon type="check"  className="taskUrgencyIcon"/>
                                    </li>
                                    <li className="taskUrgencyLi">
                                        <span className="emtremeUrgencyBtn">非常紧急</span>
                                        <Icon type="check"  className="taskUrgencyIcon"/>
                                    </li>
                                </ul> : null }
                                <div className="icon-circle"></div>
                                <button 
                                    className="btn urgencyBtn" 
                                    onClick={this.goToChoiceUrgencyLevel}
                                >普通</button>
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
            <button id="confirmCreacteBtn" onClick={this.CreateASubTask}>创建</button>
        </div>
    </div>)
    }
}
const mapStateToProps = state => {
    return  {
        state
    }
} 
export default connect(mapStateToProps,null)(SubTaskCreator);
