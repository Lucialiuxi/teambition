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

    default:
        return state;
    }
}
export default worksFilrCrumb;