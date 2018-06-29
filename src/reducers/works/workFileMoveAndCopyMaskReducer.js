//移动和复制文件遮罩的渲染数据
const WorkFileMoveAndCopyMaskData = ( state = [] , action ) => {
    switch (action.type){
        case 'SAVE_A_GROUP_OF_SAME_PARENTID_WOKRFILES_ACTION':
            let { obj:{ParentId , arr} } = action;
            let a = {};
            a[ParentId]=arr;
            let newState = Object.assign({},state,a);
            let Arr = [];
            for(var attr in newState){
                Arr[attr] = newState[attr];
            }
        return Arr;
    default:
        return state;
    }
}

export default WorkFileMoveAndCopyMaskData;