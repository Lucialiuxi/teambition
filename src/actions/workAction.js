//存文件的显示模式 {worksViewType：Sting}
export const saveWorksViewTypeAction = obj => {
    return {
        type: 'SAVE_WORKS_VIEW_TYPE',
        obj
    }
}
//点击创建文件夹按钮
export const GoToCreateAWorksFileAction = () => {
    return {
        type: 'GO_TO_CRAETE'
    }
}