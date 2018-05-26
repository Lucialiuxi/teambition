//新建项目
export  const CreateAFile = obj => {
    return {
        type: 'Create_A_File',
        obj
    }
}

//刷新页面请求大图标文件数据
export  const AllFileInfoArr = arr => {
    // console.log(arr)
    return {
        type: 'get_All_files_Info',
        arr
    }
}

//修改大图标文件信息
export  const ModifyAFileInfo = obj => {
    // console.log(obj)
    return {
        type: 'Modify_file_Info',
        obj
    }
}