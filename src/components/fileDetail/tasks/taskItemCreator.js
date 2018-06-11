//新建--项目列表
import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { 
    ShowTaskItemCreatorAction , 
    HideTaskItemCreatorAction ,
    CreateATaskItemAction
    }  from '@/actions/action';

import { CreateANewTaskItemServer } from '@/server/requestData';

class TaskItemCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    GoToCreateATaskItem=()=>{//显示新建任务列表编辑框
        let { dispatch , fileId } = this.props;
        dispatch(ShowTaskItemCreatorAction(fileId))
    }
    componentDidUpdate(){
        let input = document.getElementsByClassName('stage-name')[0]
        if(input){
            input.focus()
        }
    }
    cancleCreateTaskItem=()=>{//取消新建 隐藏任务列表编辑框
        let { dispatch } = this.props;
        dispatch(HideTaskItemCreatorAction('close'))
    }
    ConfirmCreateATaskItem=()=>{
        let taskItemName = this.stageName.value;
        let { dispatch , state:{taskItemInfo} } = this.props;
        let arr = [];
        taskItemInfo.forEach(el => {
            arr.push(el.index)
        });
        let largestIndex = Math.max(...arr);
        let index = ++largestIndex;
        let userLoginName = taskItemInfo[0].userLoginName;
        let fileId =  taskItemInfo[0].fileId;
        CreateANewTaskItemServer({taskItemName,userLoginName,fileId,index}).then(({data})=>{
            dispatch(CreateATaskItemAction(data.newTaskItemData))
        })
    }
    render() { 
        let { fileId , getFileInfo } = this.props;
        let o = getFileInfo.filter(val=>val.fileId===Number(fileId))[0]
        return ( 
            <li className="taskItem createWrap">
                {!o.isShowTaskItemCreator ? 
                <div className="createTaskItem" onClick={this.GoToCreateATaskItem}>
                    <a className="taskItemCreateIconWrap">
                        <Icon type="plus" className="taskItemCreateIcon" />
                        新建任务列表
                    </a>
                </div> : null }
                {o.isShowTaskItemCreator ? 
                <div className="creator-form-wrap">
                    <input 
                        type="text" 
                        placeholder="新建任务列表..." 
                        className="stage-name"
                        ref={node=>this.stageName = node}
                    />
                    <div className="taskItemCreator-btns">  
                        <a className="btn submit" onClick={this.ConfirmCreateATaskItem} >保存</a> 
                        <a className="btn cancel" onClick={this.cancleCreateTaskItem}>取消</a>
                    </div>
                </div> : null }
            </li>

         )
    }
}
const mapStateToProps = state => {
    return  {
        state
    }
}
export default connect(mapStateToProps,null)(TaskItemCreator);