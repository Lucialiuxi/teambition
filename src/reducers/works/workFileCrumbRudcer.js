//work面包屑导航条
const worksFilrCrumb = (state=[],action) => {    
    switch (action.type){
        //点击进入文件夹
        case 'DBCLICK_TO_WORKFILE_INSIDE_ACTION':
           let arr = [];
           arr.push(action.obj)
           let newState = state.concat(arr);
        return newState;

        //刷新有面包屑导航条的页面，把cookie存的拿出来存起来
        case 'GET_BREAD_CREAB_ACTION':
        return Object.assign([],state,action.arr)       

        //点击面包屑导航条，判断导航条的数据是否发生变化
        case 'CHANGE_BREAD_CRUMB_ACTION':
            let nState = state.concat();
            let { myId } = action;
            let I = nState.findIndex(val=>val.myId===myId);
            
           if(I>=0 && nState.length>1){
                nState.splice(I+1)
            }
        return nState;
        
        //work页回到最顶层文件的时候 和不在work页的时候，不显示面包屑导航条
        case 'EMPTY_BREAD_CRUMB_ACTION':
        return state=[];
    default:
        return state;
    }
}
export default worksFilrCrumb;