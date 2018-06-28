const worksFile = ( state = [] , action ) => {
    
    switch (action.type){
        //成功创建一个文件夹
        case 'ALREADY_CREATE_A_WORKS_FILE_ACTION':
            let addState = state.concat();
            addState.push(action.obj);
        return addState;

        //进入works文件 或者刷新的时候，把请求回来的数据保存起来
        case 'GET_ALL_WORKSFILE_UNDER_PARENT_WORKSFILE_ACTION':
            state = [...action.arr].map( val => {
                val.isModifyWorkFileName = false;//编辑文件名的显示框
                val.goToDelete = false; //确认删除定位框
                return val
            });
        return state;

        //删除一个work文件夹 myId->文件夹id
        case 'DELETE_A_WORKSFILE_ACTION':
        return state.filter(val => val.myId !== action.myId);

        //点击去修改一个work文件夹的名字 myId->文件夹id
        case 'MODIFY_A_WORKSFILENAME_ACTION':
        return state.map( val => {
            if(action.myId===val.myId){
                val.isModifyWorkFileName = true;
            }
            return val
        });
        
        //修改成功work文件名 进行更新 obj->{myId,workFileName}
        case 'ALREADY_MODIFY_A_WORKSFILENAME_ACTION':
        return state.map( val => {
            if(action.obj.myId===val.myId){
                val.workFileName = action.obj.workFileName;
                val.lastestModifyTime = action.obj.lastestModifyTime;
            }
            return val
        });

        //完成创建OR修改文件名
        case 'HIDE_INPUT_ACTION':
        return state.map( val => {
            val.isModifyWorkFileName = false;
            return val
        });

        //切换文件选中状态obj->{myId,check}
        case 'TO_SWITCH_CHECK_A_WORKFILE_ACTION':
        return state.map( val => {
            if(action.obj.myId===val.myId){
                val.check = action.obj.check;
            }
            return val
        });

        //切换全选选中状态 obj->{check}
        case 'TO_SWITCH_CHECK_ALL_WORKFILE_ACTION':
        return state.map( val => {
            val.check = action.obj.check;
            return val
        });

        //删除选中的多个work文件
        case 'DELETE_CHECKED_WORKFILES_ACTION':
            let arr = action.arr;
            state.forEach((val)=>{
                arr.forEach(e=>{
                    if(val.myId===e.myId){
                        val.delete = true;
                    }
                })
            })
        return state.filter(val=>!val.delete)

        //显示deleteCover定位框
        case 'TO_SHOW_DELETE_COVER_ACTION':
        return [...state].map(val=>{
            if(val.myId===action.myId){
                val.goToDelete = true;
            }
            return val;
        })

        //隐藏deleteCover定位框
        case 'TO_HIDE_DELETE_COVER_ACTION':
        return [...state].map(val=>{
            val.goToDelete = false;
            return val;
        })


    default:
        return state;
    }
}
export default worksFile;