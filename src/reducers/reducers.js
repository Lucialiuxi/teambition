import { combineReducers } from 'redux';
import getFileInfo from './tasks/FileInfoReducer';
import taskItemInfo from './tasks/taskItemInfoReducer';
import subTaskInfo from './tasks/subTaskInfoReducer';
import worksViewType from './works/worksViewReducer';
import worksFile from './works/worksFileReducer';
import worksFilrCrumb from './works/workFileCrumbRudcer';
import WorkFileMoveAndCopyMaskData from './works/workFileMoveAndCopyMaskReducer';

const allReduers = combineReducers({
    getFileInfo,//项目文件
    taskItemInfo,//任务列表
    subTaskInfo,//任务
    worksViewType,//文件显示模式
    worksFile,//文件
    worksFilrCrumb,//文件块的面包屑显示
    WorkFileMoveAndCopyMaskData,//移动和复制文件遮罩的渲染数据
})

export default allReduers;