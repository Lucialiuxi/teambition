import { combineReducers } from 'redux';
import getFileInfo from './FileInfoReducer';
import taskItemInfo from './taskItemInfoReducer';
import subTaskInfo from './subTaskInfoReducer';

const allReduers = combineReducers({
    getFileInfo,
    taskItemInfo,
    subTaskInfo
})

export default allReduers;