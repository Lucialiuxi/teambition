import { combineReducers } from 'redux';
import getFileInfo from './tasks/FileInfoReducer';
import taskItemInfo from './tasks/taskItemInfoReducer';
import subTaskInfo from './tasks/subTaskInfoReducer';

const allReduers = combineReducers({
    getFileInfo,
    taskItemInfo,
    subTaskInfo
})

export default allReduers;