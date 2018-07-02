//新建--项目列表
import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { 
    ShowTaskItemCreatorAction , 
    HideTaskItemCreatorAction ,
    CreateATaskItemAction
}  from '@/actions/taskAction';

import { withRouter } from 'react-router-dom';

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
    ConfirmCreateATaskItem=()=>{//点击新建按钮
        let taskItemName = this.stageName.value;
        let { dispatch , state:{taskItemInfo} , location } = this.props;
        let arr = [];
        taskItemInfo.forEach(el => {
            arr.push(el.index)
        });
        let largestIndex = Math.max(...arr);
        if((!arr[0]) && (arr[0]!==0)){
            largestIndex=-1;
        }
        let index = ++largestIndex;
        
        let fileId =  Number(location.pathname.match(/\d+/g)[0]);
        CreateANewTaskItemServer({taskItemName,fileId,index}).then(({data})=>{
            dispatch(CreateATaskItemAction(data.newTaskItemData))
        })
        //新建项目列表框 隐藏
        dispatch(HideTaskItemCreatorAction('close'))
    }
    render() { 
        let { fileId , getFileInfo } = this.props;
        let o = getFileInfo.filter(val=>val.fileId===Number(fileId))[0];
        return ( 
            <li className="taskItem createWrap">
                {o && !o.isShowTaskItemCreator ? 
                <div className="createTaskItem" onClick={this.GoToCreateATaskItem}>
                    <a className="taskItemCreateIconWrap">
                        <Icon type="plus" className="taskItemCreateIcon" />
                        新建任务列表
                    </a>
                </div> : null }
                {o && o.isShowTaskItemCreator ? 
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
export default withRouter(connect(mapStateToProps,null)(TaskItemCreator));