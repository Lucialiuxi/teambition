import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import ShowFileNameCover from './showFileName';
import ShowCurrentTaskItemNameCover from './showCurrentTaskItemName';
import { bindActionCreators } from 'redux';
import * as allActions  from '@/actions/taskAction';
import { GetTaskItemServer , MoveOrCopySubtaskToAnotherTaskItemServer } from '@/server/requestData';

//移动 或 复制 子任务 --到当前其他任务列表  或者到其他项目文件夹的某一任务列表

/**
 * 移动列表的任务：确认移动的时候，把任务列表的taskItemId改为移动到的那个项目列表的taskItemId
 * 赋值所有的任务： 找到taskItemId符合所有任务复制，改taskItemId之后保存
 */
class MoveOrCopySubTask extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            choosedTaskItemName:'选择列表',//选择移动或者复制到的项目文件名 下的列表名
            choosedFileId:0,//选择移动或者复制到的项目id
            choosedFileName:'',//选择移动或者复制到的项目名
            choosedTaskItemId:0
         }
    }
    componentDidMount(){
        let { state:{taskItemInfo} , taskItemId } = this.props;
        //从reducer中筛选出当前的项目文件信息 和 任务列表信息
        let currentTaskItemData = taskItemInfo.filter(val=>val.taskItemId===taskItemId)[0];
        this.setState({
            choosedTaskItemName:currentTaskItemData.taskItemName,
            choosedTaskItemId:taskItemId,
            choosedFileId:currentTaskItemData.fileId
        })

    }
    //点击弹出选择要移动到的文件 的cover框
    ChooseAnotherFile = () => {
        let { state:{taskItemInfo} , taskItemId , ToSeeShowFileNameCoverAction } = this.props;
        let currentTaskItem = taskItemInfo.filter(val=>val.taskItemId===taskItemId)[0];
        ToSeeShowFileNameCoverAction({taskItemId,isShowFileName:!currentTaskItem.isShowFileName})
    }
    //点击弹出选择要移动到的 项目列表的 cover框
    ChooseATaskItemUnderCheckedFile = () => {
        let { state:{taskItemInfo} , 
              taskItemId , 
              ToSeeShowCurrentTaskItemNameCoverAction , 
              SaveFoundTaskItemsAction 
            } = this.props;
        let { choosedFileId } = this.state;
        let currentTaskItem = taskItemInfo.filter(val=>val.taskItemId===taskItemId)[0];
        ToSeeShowCurrentTaskItemNameCoverAction({taskItemId,isShowCurrentTaskItemName:!currentTaskItem.isShowCurrentTaskItemName})

        //如果选择要到的文件夹跟不是当前所在的文件夹，就需要请求
        if(choosedFileId !== currentTaskItem.fileId){
            GetTaskItemServer({fileId:choosedFileId}).then(({data})=>{
                if(data.CurrentTaskItemInfo){
                    SaveFoundTaskItemsAction(data.CurrentTaskItemInfo)
                }
            })
        }
    }
    //点击选择要移动到的文件 的cover框选择到的文件名和文件id
    changeFileDestination = (fileId,FileName) => {
        let { ToHideShowFileNameCoverAction , taskItemId , state:{taskItemInfo} } = this.props;
        let currentItem = taskItemInfo.find(el=>el.taskItemId === taskItemId);
        if(currentItem.fileId !== fileId){
            this.setState({
                choosedFileId:Number(fileId),
                choosedFileName:FileName,
                choosedTaskItemName:'选择列表'
            },function(){//下拉列表菜单里面的移动或者复制项目的选择 项目名cover框 隐藏
                ToHideShowFileNameCoverAction('close')
            })
        }else{
            this.setState({
                choosedFileId:Number(fileId),
                choosedFileName:FileName
            },function(){//下拉列表菜单里面的移动或者复制项目的选择 项目名cover框 隐藏
                ToHideShowFileNameCoverAction('close')
            })

        }
    }
    //点击选择要移动到的项目列表 
    changeTaskItemDestination = (taskItemId ,taskItemName) => {
        let { ToHideShowCurrentTaskItemNameCoverAction } = this.props;
        this.setState({
            choosedTaskItemName:taskItemName,
            choosedTaskItemId:taskItemId
        },function(){
            ToHideShowCurrentTaskItemNameCoverAction('close');
        })
    }
    //点击确认移动或者复制
    ConfirmMoveOrCopySubTask = () => {
        let { taskItemId , 
              MoveSubTasksToAnotherTaskItemAction, 
              HideTaskItemDropDownContainerAction,
              CopySubTasksForAnotherTaskItemAction
            } = this.props;
        let { choosedFileId , choosedTaskItemId } = this.state;
        let S = document.getElementById('dropdown-container').innerText;

        if(choosedTaskItemId!==taskItemId){
           if(S.indexOf('移动本列表所有任务')!==-1){
                MoveOrCopySubtaskToAnotherTaskItemServer({fileId:choosedFileId,
                        taskItemId:choosedTaskItemId,
                        MoveOrCopy:'move',
                        currentTaskItemId:taskItemId
                    })
                .then(({data})=>{
                    if(data.code === 201){
                        MoveSubTasksToAnotherTaskItemAction({
                            fileId:choosedFileId,
                            taskItemId:choosedTaskItemId,
                            currentTaskItemId:taskItemId
                        })
                        HideTaskItemDropDownContainerAction('close')
                    }
                })
           }else if(S.indexOf('复制本列表所有任务')!==-1){
                MoveOrCopySubtaskToAnotherTaskItemServer({fileId:choosedFileId,
                    taskItemId:choosedTaskItemId,
                    MoveOrCopy:'copy',
                    currentTaskItemId:taskItemId
                }).then(({data})=>{
                    if(data.code === 201){
                        CopySubTasksForAnotherTaskItemAction(data.data)
                        HideTaskItemDropDownContainerAction('close')
                    }
                })
           }
        }
    }
    render() {
        let { state:{taskItemInfo,getFileInfo} , taskItemId } = this.props;
        let { choosedFileName , choosedFileId , choosedTaskItemName } = this.state;
        //从reducer中筛选出当前的项目文件信息 和 任务列表信息
        let currentTaskItemData = taskItemInfo.filter(val=>val.taskItemId===taskItemId)[0];
        let currentFile = getFileInfo.filter(val=>val.fileId===currentTaskItemData.fileId)[0];
        return ( 
            <div className="MoveOrCopySubTaskWrap">
                <ul className="MoveOrCopySubTaskContent">
                    <li className="MoveOrCopySubTaskList">
                        <span className="MoveOrCopySubTaskTitle">项目</span>
                        <span className="selectFileTitleSpan" onClick={this.ChooseAnotherFile}>
                            <em className="FileTitleEm">{ choosedFileName ? choosedFileName : currentFile.FileName}</em>
                            <Icon type="down" className="selectFileDownICon"/>
                        </span>
                        {currentTaskItemData.isShowFileName ? <ShowFileNameCover 
                            fileId={ choosedFileId ? choosedFileId : currentFile.fileId}
                            changeFileDestination={this.changeFileDestination}
                        /> : null}
                    </li>
                    <li className="MoveOrCopySubTaskList">
                        <span className="MoveOrCopySubTaskTitle">列表</span>
                        <span className="selectTaskItemTitleSpan" onClick={this.ChooseATaskItemUnderCheckedFile}>
                            <em className="TaskItemTitleEm">{ choosedTaskItemName}</em>
                            <Icon type="down" className="selectTaskItemDownICon"/>
                        </span>
                        {currentTaskItemData.isShowCurrentTaskItemName ? <ShowCurrentTaskItemNameCover 
                            fileId={ choosedFileId ? choosedFileId : currentFile.fileId} 
                            taskItemId={currentFile.taskItemId}
                            changeTaskItemDestination = {this.changeTaskItemDestination}
                        /> : null}
                    </li>
                </ul>
                <button className="ConfirmMoveOrCopySubTaskBtn" onClick={this.ConfirmMoveOrCopySubTask}>确定</button>
            </div>
         )
    }
}
const mapStateToProps = state => {
    return  {
        state
    }
} 
const mapDispatchToProps = dispatch => {
    return bindActionCreators(allActions,dispatch)
} 
export default connect(mapStateToProps,mapDispatchToProps)(MoveOrCopySubTask);