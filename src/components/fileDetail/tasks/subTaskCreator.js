import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { CreateASubTaskServer } from '@/server/requestData';
import { ShowChoiceUrgencyLevelAction , createASubTaskAction }  from '@/actions/action';
import EditableTagGroup from './editableTagGroup';

// 新建--项目列表子任务
class SubTaskCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            currentShowUrgencyLevel:'普通'
        }
    }
    setDeadline=()=>{//设置任务截止时间
        let { id , GoToChoiceSubTaskDeadline } = this.props;
        GoToChoiceSubTaskDeadline(id)
    }
    CreateASubTask=()=>{//创建子任务
        let { id , dispatch , deadline , state:{subTaskInfo}} = this.props;
        let val = this.subTaskValue.value.trim();
        if(val){
            this.subTaskValue.value='';
            let tag = this.tagsArr ? this.tagsArr : [];
            let urgencyLevel = this.state.currentShowUrgencyLevel;
            let index = 0
            if(subTaskInfo[0]){
                let arr = []
                subTaskInfo.forEach(el => {
                    arr.push(el.index)
                });
                if(arr.length>0){
                    index =  Math.max.apply(null,arr)
                }
            }
            deadline = deadline ? deadline : '';
            //发送要创建子任务的数据到后端
            CreateASubTaskServer({id,subTaskName:val,deadline,urgencyLevel,tag,index,checked:false}).then(({data})=>{
                dispatch(createASubTaskAction(data.newSubTaskInfo))
            })
        }
    }
    goToChoiceUrgencyLevel=(e)=>{//点击显示  选择任务紧急程度框
        let { id, dispatch , state:{taskItemInfo} } = this.props;
        dispatch(ShowChoiceUrgencyLevelAction(id))
        let obj = taskItemInfo.filter(val=>val.taskItemId===id)[0]
        this.setState({
            data:obj
        })
    }
    ChoiceWhichUrgencyLevel=(e)=>{//点击选择显示的紧急程度按钮是哪个
        let t = e.target;
        let c = t.getAttribute('class');
        if(c==='taskUrgencyLi'){
            t = t.firstElementChild;
        }else if(c.indexOf('taskUrgencyIcon') > 0){
            t = t.parentNode.firstElementChild;
        }
        let v = t.getAttribute('class');
        switch(v){
            case 'normalBtn':
                this.setState({
                    currentShowUrgencyLevel:'普通'
                })
                this.showUrgencyLevel.setAttribute('class','btn normal')
            break;
            case 'urgencyBtn':
                this.setState({
                    currentShowUrgencyLevel:'紧急'
                })
                this.showUrgencyLevel.setAttribute('class','btn urgency')
            break;
            case 'emtremeUrgencyBtn':
                this.setState({
                    currentShowUrgencyLevel:'非常紧急'
                })
                this.showUrgencyLevel.setAttribute('class','btn emtremeUrgency')
            break;
            default:
                this.setState({
                    currentShowUrgencyLevel:'普通'
                }) 
        }
    }
    getSetTagsArr=(arr)=>{//拿到EditableTagGroup组件中设置好的标签
        this.tagsArr = arr;
    }
    render() {
        let {deadline } = this.props;
        let { data:{IsChoiceUrgencyLevel}, currentShowUrgencyLevel } = this.state;
        return (
        <div 
            className="subTask-creator-wrap"
        >
        <div className="task-creator fade in">
            <textarea 
                className="task-content-input form-control" 
                placeholder="任务内容"
                ref={ node => this.subTaskValue = node }  
                autoFocus = "autoFocus"
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
                                {IsChoiceUrgencyLevel ? <ul id="taskUrgency" onClick={this.ChoiceWhichUrgencyLevel}>
                                    <li className="taskUrgencyLi">
                                        <span className="normalBtn">普通</span>
                                        {currentShowUrgencyLevel==='普通' ? <Icon type="check" className="taskUrgencyIcon"/> : ''}
                                    </li>
                                    <li className="taskUrgencyLi">
                                        <span className="urgencyBtn">紧急</span>
                                        {currentShowUrgencyLevel==='紧急' ? <Icon type="check" className="taskUrgencyIcon"/> : ''}
                                    </li>
                                    <li className="taskUrgencyLi">
                                        <span className="emtremeUrgencyBtn">非常紧急</span>
                                        {currentShowUrgencyLevel==='非常紧急' ? <Icon type="check" className="taskUrgencyIcon"/> : ''}
                                    </li>
                                </ul> : null }
                                <div className="icon-circle"></div>
                                <button 
                                    ref={node=>this.showUrgencyLevel=node}
                                    className="btn showUrgencyLevel" 
                                    onClick={this.goToChoiceUrgencyLevel}
                                >{currentShowUrgencyLevel}</button>
                            </div>
                        </div>
                    </section>
                    <div className="setTagBox">
                        <Icon type="tags-o"/>
                        <EditableTagGroup {...{getSetTagsArr:this.getSetTagsArr}}/>
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
