import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import ShowFileNameCover from './showFileName';
import ShowCurrentTaskItemNameCover from './showCurrentTaskItemName';
import { ToSeeShowFileNameCoverAction , ToSeeShowCurrentTaskItemNameCoverAction }  from '@/actions/action';
// import { getAllFilesInfo } from '@/server/requestData';

//移动 或 复制 子任务 --到当前其他任务列表  或者到其他项目文件夹的某一任务列表

/**
 * 移动列表的任务：确认移动的时候，把任务列表的taskItemId改为移动到的那个项目列表的taskItemId
 * 赋值所有的任务： 找到taskItemId符合所有任务复制，改taskItemId之后保存
 */
class MoveOrCopySubTask extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    ChooseAnotherFile = () => {
        let { dispatch , state:{taskItemInfo} , taskItemId } = this.props;
        let currentTaskItem = taskItemInfo.filter(val=>val.taskItemId===taskItemId)[0];
        console.log(currentTaskItem.isShowFileName)
        dispatch(ToSeeShowFileNameCoverAction({taskItemId,isShowFileName:!currentTaskItem.isShowFileName}))
    }
    ChooseATaskItemUnderCheckedFile = () => {
        console.log('5555')
    }
    render() {
        let { state:{taskItemInfo,getFileInfo} , taskItemId } = this.props;
        //从reducer中筛选出当前的项目文件信息 和 任务列表信息
        let currentTaskItemData = taskItemInfo.filter(val=>val.taskItemId===taskItemId)[0];
        let currentFile = getFileInfo.filter(val=>val.fileId===currentTaskItemData.fileId)[0];
        console.log(currentTaskItemData.isShowFileName,currentTaskItemData.isShowCurrentTaskItemName)
        return ( 
            <div className="MoveOrCopySubTaskWrap">
                <ul className="MoveOrCopySubTaskContent">
                    <li className="MoveOrCopySubTaskList">
                        <span className="MoveOrCopySubTaskTitle">项目</span>
                        <span className="selectFileTitleSpan" onClick={this.ChooseAnotherFile}>
                            <em className="FileTitleEm">{currentFile.FileName}</em>
                            <Icon type="down" className="selectFileDownICon"/>
                        </span>
                        {currentTaskItemData.isShowFileName ? <ShowFileNameCover fileId={currentFile.fileId}/> : null}
                    </li>
                    <li className="MoveOrCopySubTaskList">
                        <span className="MoveOrCopySubTaskTitle">列表</span>
                        <span className="selectTaskItemTitleSpan" onClick={this.ChooseATaskItemUnderCheckedFile}>
                            <em className="TaskItemTitleEm">{currentTaskItemData.taskItemName}</em>
                            <Icon type="down" className="selectTaskItemDownICon"/>
                        </span>
                        {currentTaskItemData.isShowCurrentTaskItemName ? <ShowCurrentTaskItemNameCover fileId={currentFile.fileId}/> : null}
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
export default connect(mapStateToProps,null)(MoveOrCopySubTask);