import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import ShowFileNameCover from './showFileName';
import ShowCurrentTaskItemNameCover from './showCurrentTaskItemName';
import { bindActionCreators } from 'redux';
//引入action
import * as allActions  from '@/actions/action';
// import { getAllFilesInfo } from '@/server/requestData';

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
            choosedFileName:''//选择移动或者复制到的项目名
         }
    }
    //点击弹出选择要移动到的文件 的cover框
    ChooseAnotherFile = () => {
        let { state:{taskItemInfo} , taskItemId , ToSeeShowFileNameCoverAction} = this.props;
        let currentTaskItem = taskItemInfo.filter(val=>val.taskItemId===taskItemId)[0];
        ToSeeShowFileNameCoverAction({taskItemId,isShowFileName:!currentTaskItem.isShowFileName})
    }
    //点击弹出选择要移动到的 项目列表的 cover框
    ChooseATaskItemUnderCheckedFile = () => {
        let { state:{taskItemInfo} , taskItemId , ToSeeShowCurrentTaskItemNameCoverAction } = this.props;
        let currentTaskItem = taskItemInfo.filter(val=>val.taskItemId===taskItemId)[0];
        ToSeeShowCurrentTaskItemNameCoverAction({taskItemId,isShowCurrentTaskItemName:!currentTaskItem.isShowCurrentTaskItemName})
        // console.log(this.state.choosedFileId,currentTaskItem.fileId)
        //如果选择要到的文件夹跟不是当前所在的文件夹，就需要请求
        if(this.state.choosedFileId !== currentTaskItem.fileId){

        }
    }
    //点击选择要移动到的文件 的cover框选择到的文件名和文件id
    changeFileDestination = (fileId,FileName) => {
        let { ToHideShowFileNameCoverAction } = this.props;
        this.setState({
            choosedFileId:Number(fileId),
            choosedFileName:FileName
        },function(){//下拉列表菜单里面的移动或者复制项目的选择 项目名cover框 隐藏
            ToHideShowFileNameCoverAction('close')
        })
    }
    render() {
        let { state:{taskItemInfo,getFileInfo} , taskItemId } = this.props;
        // console.log(this.state.choosedFileId)
        //从reducer中筛选出当前的项目文件信息 和 任务列表信息
        let currentTaskItemData = taskItemInfo.filter(val=>val.taskItemId===taskItemId)[0];
        let currentFile = getFileInfo.filter(val=>val.fileId===currentTaskItemData.fileId)[0];
    
        return ( 
            <div className="MoveOrCopySubTaskWrap">
                <ul className="MoveOrCopySubTaskContent">
                    <li className="MoveOrCopySubTaskList">
                        <span className="MoveOrCopySubTaskTitle">项目</span>
                        <span className="selectFileTitleSpan" onClick={this.ChooseAnotherFile}>
                            <em className="FileTitleEm">{this.state.choosedFileName ? this.state.choosedFileName : currentFile.FileName}</em>
                            <Icon type="down" className="selectFileDownICon"/>
                        </span>
                        {currentTaskItemData.isShowFileName ? <ShowFileNameCover 
                            fileId={this.state.choosedFileId ? this.state.choosedFileId : currentFile.fileId}
                            changeFileDestination={this.changeFileDestination}
                        /> : null}
                    </li>
                    <li className="MoveOrCopySubTaskList">
                        <span className="MoveOrCopySubTaskTitle">列表</span>
                        <span className="selectTaskItemTitleSpan" onClick={this.ChooseATaskItemUnderCheckedFile}>
                            <em className="TaskItemTitleEm">{this.state.choosedFileName==='' ? currentTaskItemData.taskItemName : '选择列表'}</em>
                            <Icon type="down" className="selectTaskItemDownICon"/>
                        </span>
                        {currentTaskItemData.isShowCurrentTaskItemName ? <ShowCurrentTaskItemNameCover 
                            fileId={this.state.choosedFileId ? this.state.choosedFileId : currentFile.fileId} 
                            taskItemId={currentFile.taskItemId}
                        /> : null}
                    </li>
                </ul>
                <button className="ConfirmMoveOrCopySubTaskBtn">确定</button>
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