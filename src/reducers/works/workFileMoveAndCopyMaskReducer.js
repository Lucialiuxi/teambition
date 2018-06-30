//移动和复制文件遮罩的渲染数据
const WorkFileMoveAndCopyMaskData = ( state = {} , action ) => {
    switch (action.type){
        //点击进入文件的时候把每层的文件的parentId和文件信息存下来
        case 'SAVE_A_GROUP_OF_SAME_PARENTID_WOKRFILES_ACTION':
            let { obj:{ParentId , arr} } = action;
            let a = {};
            a[ParentId]=arr;
            let newState = Object.assign({},state,a);
        return newState;

        //清空
        case 'EMPTY_A_GROUP_OF_SAME_PARENTID_WOKRFILES_ACTION':
        return state = {};

        //点击移动和复制 workfile的弹框的个人项目目录，后值只显示顶层文件
        case 'SHOW_TOP_LEVEL_WORKFILES_ACTION':
            let p = action.obj.ParentId;
            let nState = {p:action.obj.arr};
        return nState;

    default:
        return state;
    }
}

export default WorkFileMoveAndCopyMaskData;