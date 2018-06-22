const worksViewType = (state={},action) => {        
    switch (action.type){
        case 'SAVE_WORKS_VIEW_TYPE':
        state = {...action.obj};
        return state;
    default:
        return state;
    }
}
export default worksViewType;