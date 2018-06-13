import { combineReducers } from 'redux';
import getFileInfo from './FileInfoReducer';
import taskItemInfo from './taskItemInfoReducer';
import subTaskInfo from './subTaskInfoReducer';

console.log('qqqqqqqq')
const allReduers = combineReducers({
    getFileInfo,
    taskItemInfo,
    subTaskInfo
})

export default allReduers;