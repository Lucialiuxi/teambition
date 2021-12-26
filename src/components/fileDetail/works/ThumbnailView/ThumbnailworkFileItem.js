import React , { Component } from 'react';
import {  Icon , Checkbox } from 'antd';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
//复制移动删除文件夹的定位框
import ModifyMenuCover from '../ModifyMenuCover.js';
//确认删除文件夹的定位框    
import DelteWorkFileCover from '../delteCover.js';
import * as allAction from '@/actions/workAction.js';

import { CreateAWorkFileServer , 
    DeleteAWorksFileServer ,
    ModifyAWorkFileNameServer , 
    ToSwitchCheckAWorkFileServer,
    GetAllWorksFileUnderParentWorksFileServer
} from '@/server/requestData.js';
import classnames from 'classnames';

//缩略图模式

class ThumbNailWorkFileItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentWillMount(){ 
        //把当前所在的项目文件下的数据存到reducer中
        let { 
          location: { pathname }, 
          state:{ worksFile },
          saveAGroupOfSameParentIdWorkFilesAction
        } = this.props;
        let pathArr = pathname.split('/');
        if(pathArr.length===4){//显示顶层的work文件
          saveAGroupOfSameParentIdWorkFilesAction({ ParentId: '' , arr:worksFile });
        }else if(pathArr.length===5){
          saveAGroupOfSameParentIdWorkFilesAction({ ParentId: pathArr[4]  ,  arr:worksFile });
        }
      }
    TocheckAworkFileItem = (e) => {//单选
        let { ToSwitchCheckAWorkFileAction } = this.props;
        let myId= this.ccc.rcCheckbox.input.dataset.id;
        ToSwitchCheckAWorkFileServer({myId,check:e.target.checked}).then(({data})=>{
            if(data && data.success){
                ToSwitchCheckAWorkFileAction(data.data)
            }
        })

    }
    ToCreateANewWorkFile = (e) => {//点击enter的时候新建一个文件/修改文件的名字
        let { 
            location: { pathname } , 
            state: { getFileInfo } , 
            AlreadyCreateAWorksFileAction ,
            AlreadyModifyAWorkFileNameAction ,
            HideInputAction ,
            oneFileData 
        } = this.props;
        let val = this.WorkFileItemNameInput.value.trim();
        let arr = pathname.split('/');
        let parentId = '';
        //网址结尾不是works的话，那最后的字符串就是父级的文件id
        if(arr[arr.length-1]!=='works'){
            parentId = arr[arr.length-1];
        }
        let fileId = arr[2]*1;
        let now = Date.now();
        let username = getFileInfo.find(val=>val.fileId===fileId).userLoginName;
        if(e.keyCode===13){
            if(this.props.oneFileData){//修改文件的名字
                if(oneFileData.workFileName!==val && val!==''){
                    ModifyAWorkFileNameServer({
                        workFileName:val,
                        myId:oneFileData.myId,
                        lastestModifyTime: now
                    }).then(({data})=>{
                        if(data && data.success){
                            let { myId , workFileName } = data.data;
                            AlreadyModifyAWorkFileNameAction({myId,workFileName,lastestModifyTime: now})
                        }
                    })
                }    
            }else{//新建一个文件
                if(val!==''){
                    CreateAWorkFileServer({
                        username,
                        fileId,
                        parentId,
                        workFileName: val,
                        lastestModifyTime: now
                    }).then(({data})=>{
                        if(data && data.success){
                            AlreadyCreateAWorksFileAction(data.data)
                        }
                    })
                }
            }
            HideInputAction()
        }
    }
    toShowModifyWorkFileMenuCover = (myId) => {//显示文件夹菜单的显示框
        let { toShowModifyWorkFileMenuCoverAction } = this.props;
        toShowModifyWorkFileMenuCoverAction(myId)
    }
    toHideTheDeleteCover = () => {//隐藏显示确认删除定位框
        let { toHideDelteCoverAction } = this.props;
        toHideDelteCoverAction()
    }
    confirmDeleteThisWorkFile = (myId) => {//删除myId对应的work文件夹
        let { DeleteAWorksFileAction , toHideDelteCoverAction } = this.props;
        DeleteAWorksFileServer({myId}).then(({data})=>{
            if(data && data.success){
                DeleteAWorksFileAction(data.data.myId);
            }
        }).then(()=>{
            toHideDelteCoverAction()
        })

    }
    ModifyOneWorkFile = (myId) => {//重命名input框显示
        let { ModifyAWorkFileNameAction } = this.props;
        ModifyAWorkFileNameAction(myId)
    }
    ToInside = (e) => {//进入文件内部
        let { 
                history , 
                location , 
                GetAllWorksFileUnderParentWorksFileAction ,
                dbClickToWorkFileInsideAction ,
                state: { worksFile , WorkFileMoveAndCopyMaskData } 
            } = this.props;
        let t = e.target;
        let rej = (//点击到的是文件夹
                   t.classList.contains('check-frame-checkIcon') ||
                   t.classList.contains('ant-checkbox-wrapper') ||
                   t.classList.contains('ant-checkbox') ||
                   t.classList.contains('ant-checkbox-checked') ||
                   t.classList.contains('ant-checkbox-input') ||
                   t.classList.contains('ant-checkbox-inner') ||
                   t.classList.contains('anticon') ||
                   t.classList.contains('anticon-down') ||
                   t.classList.contains('check-frame-downIcon') ||
                   t.classList.contains('title-bar') ||
                   t.classList.contains('elastic-title') 
                )
        
        let ModifyMenuCoverTag = (//点击到的是文件夹菜单、移动复制弹框
                t.getAttribute('id') === 'ModifyMenuCoverWrap' ||
                t.classList.contains('ModifyMenuCover-head') ||
                t.classList.contains('ModifyMenuCover-head-title') ||
                t.classList.contains('ModifyMenuCover-closeIcon') ||
                t.classList.contains('ModifyMenuCover-content') ||
                t.classList.contains('ModifyMenuList') ||
                t.classList.contains('ModifyMenuList-MoveIcon') ||
                t.classList.contains('ModifyMenuList-title') ||
                t.classList.contains('ModifyMenuList-DeleteIcon') ||
                t.classList.contains('check-frame-downIcon') ||
                t.classList.contains('ModifyMenuList-CopyIcon') ||
                t.classList.contains('MoveOrCopyWorkFilesMaskWrap') ||
                t.classList.contains('moveAndCopyWorkFileWrap') ||
                t.classList.contains('moveCheckedWorkFile') ||
                t.classList.contains('copyCheckedWorkFile') ||
                t.classList.contains('moveCheckedWorkFileIcon') ||
                t.classList.contains('copyCheckedWorkFileIcon') ||
                t.classList.contains('MoveOrCopyWorkFilesMaskWrap') ||
                t.classList.contains('moveAndCopyWorkFileWrap') ||
                t.classList.contains('moveCheckedWorkFile') ||
                t.classList.contains('moveCheckedWorkFileIcon') ||
                t.classList.contains('copyCheckedWorkFile') ||
                t.classList.contains('copyCheckedWorkFileIcon') ||
                t.classList.contains('MoveOrCopyWorkFilesMask') ||
                t.classList.contains('MoveOrCopyWorkFilesMaskContent') ||
                t.classList.contains('projectFileMenuContainer') ||
                t.classList.contains('projectFileMenuTitle') ||
                t.classList.contains('projectFileMenuList') ||
                t.classList.contains('projectFileMenuItem') ||
                t.classList.contains('projectFileMenuItem active') ||
                t.classList.contains('WorkFilesMenuWrap') ||
                t.classList.contains('WorkFilesMenu') ||
                t.classList.contains('WorkFilesMenuList') ||
                t.classList.contains('WorkFilesMenuItem') ||
                t.classList.contains('WorkFilesMenuItem active') ||
                t.classList.contains('ant-modal-content') ||
                t.classList.contains('ant-modal-header') ||
                t.classList.contains('ant-modal-title') ||
                t.classList.contains('ant-modal-body') ||
                t.classList.contains('ant-modal-footer')
            )
        if(rej || ModifyMenuCoverTag) return;
        let myId = t.dataset.id;
        if(myId){
            let oldPath = location.pathname;
            let arr = oldPath.split('/');
            let fileId = arr[2]*1;
            let newpath = '';
            if(arr[arr.length-2] === 'works'){
                oldPath = arr.splice(0,arr.length-1).join('/');
                newpath = `${oldPath}/${myId}`;
            }else{
                oldPath = arr.splice(0,arr.length-1).join('/')+'/works';
                newpath = `${oldPath}/${myId}`;
            }
            if(worksFile){
                //被点击的文件的文件名
                let workFileName = worksFile.find(val=>val.myId===myId).workFileName;
                history.push({pathname:newpath,state:{t:'works'}})
                GetAllWorksFileUnderParentWorksFileServer({
                    fileId,parentId:myId
                }).then(({data})=>{
                    if(data.success){
                        dbClickToWorkFileInsideAction({workFileName,myId})//记录面包屑
                        GetAllWorksFileUnderParentWorksFileAction(data.data)
                        localStorage.setItem('WorkFileMoveAndCopyMaskData',JSON.stringify(WorkFileMoveAndCopyMaskData)) 
                    }
                })

            }
        }
    }
    goToHideInput = () => {//修改文件名的input失去焦点隐藏时    
        let { 
            location: { pathname } , 
            state: { getFileInfo } , 
            AlreadyCreateAWorksFileAction ,
            AlreadyModifyAWorkFileNameAction ,
            HideInputAction ,
            oneFileData 
        } = this.props;
        let val = this.WorkFileItemNameInput.value.trim();
        let arr = pathname.split('/');
        let parentId = '';
        //网址结尾不是works的话，那最后的字符串就是父级的文件id
        if(arr.length===5){
            parentId = arr[arr.length-1];
        }
        let fileId = arr[2]*1;
        let now = Date.now();
        let username = getFileInfo.find(val=>val.fileId===fileId).userLoginName;
        if(this.props.oneFileData){//修改文件的名字
            if(oneFileData.workFileName!==val && val!==''){
                ModifyAWorkFileNameServer({
                    workFileName:val,
                    myId:oneFileData.myId,
                    lastestModifyTime: now
                }).then(({data})=>{
                    if(data && data.success){
                        let { myId , workFileName } = data.data;
                        AlreadyModifyAWorkFileNameAction({myId,workFileName,lastestModifyTime: now})
                    }
                })
            }
            
        }else{//新建一个文件
            if(val!==''){
                CreateAWorkFileServer({
                    username,
                    fileId,
                    parentId,
                    workFileName: val,
                    lastestModifyTime: now
                }).then(({data})=>{
                    if(data && data.success){
                        AlreadyCreateAWorksFileAction(data.data)
                    }
                })
            }
        }
        HideInputAction()
    }
    render() {         
        let { 
            forCreate, 
            oneFileData,
            state:{worksViewType}
        } = this.props; 
        let c = false;
        let dataId = '';//data-id
        if(oneFileData && oneFileData.myId){
            c = oneFileData.check;
            dataId = oneFileData.myId;
        }
        return ( 
            <li className={classnames({"ThumbNailWorkFileItemLi":true,'active':c})} >
                <div className="check-frame" onDoubleClick={this.ToInside} data-id={oneFileData?oneFileData.myId:''}>
                    <Checkbox 
                        className="check-frame-checkIcon"
                        checked={c}
                        onChange={this.TocheckAworkFileItem}
                        ref={node=>this.ccc=node}
                        data-id={dataId} 
                    />
                    <Icon 
                        type="down" 
                        className="check-frame-downIcon" 
                        onClick={this.toShowModifyWorkFileMenuCover.bind(this,oneFileData?oneFileData.myId:'')}
                    />
                    { oneFileData && oneFileData.isModifyWorkFileMenu ? <ModifyMenuCover oneFileData={oneFileData}/> : null}
                    { oneFileData && oneFileData.goToDelete ? 
                        <DelteWorkFileCover
                            myId={oneFileData?oneFileData.myId:''}
                            confirmDeleteThisWorkFile={this.confirmDeleteThisWorkFile}
                            toHideTheDeleteCover={this.toHideTheDeleteCover}
                            worksViewType = {worksViewType.worksViewType}
                        /> : null
                    }
                </div>
                <div className="title-bar">
                    {
                        forCreate || oneFileData.isModifyWorkFileName ? <input  
                            type="text" 
                            className="title-edit-input" 
                            autoFocus
                            onKeyUp={this.ToCreateANewWorkFile}
                            ref={node=>this.WorkFileItemNameInput = node}
                            defaultValue={oneFileData?oneFileData.workFileName:null}
                            onBlur={this.goToHideInput}
                        /> : <p className="elastic-title" 
                                title={oneFileData && oneFileData.workFileName ? oneFileData.workFileName:''}
                                onClick={this.ModifyOneWorkFile.bind(this,oneFileData.myId)}
                        >{oneFileData && oneFileData.workFileName ? oneFileData.workFileName : null}</p>
                    }
                </div>
            </li>
         )
    }
}
const mapStateToProps = state => {
    return  {
        state
    }
}

const  mapDispatchToProps = (dispatch) => {
    return bindActionCreators(allAction,dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ThumbNailWorkFileItem)); 
