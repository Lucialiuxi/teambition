const worksViewType = (state={},action) => {   
   
    switch (action.type){

        case 'SAVE_WORKS_VIEW_TYPE':
            let b = {forCreate:false}; //切换文件的显示模式ThumbnailView / ListView
            let s = {sortByModifyTime:'descend'};//ascend /descend
            state = {...action.obj, ...b,...s};
        return state;

        //点击创建文件夹
        case 'GO_TO_CRAETE':
            state = Object.assign({},state,{forCreate:true});
        return state;

        //隐藏创建文件夹的input
        case 'HIDE_INPUT_ACTION':
            let Nstate = Object.assign({},state,{forCreate:false});
        return Nstate;

        //切换时间排序的升序和降序
        case 'TO_CHANGE_WORKFILE_SORTTYE_ACTION':
            let nstate = Object.assign({},state,{sortByModifyTime:action.obj.sortByModifyTime});
        return nstate;


       



    default:
        return state;
    }
}
export default worksViewType;