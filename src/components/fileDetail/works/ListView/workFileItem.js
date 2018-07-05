import {  Checkbox , Icon } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    withRouter
} from 'react-router-dom';
//删除一个li的定位提醒框
import DelteWorkFileCover from '../delteCover.js';
import * as allAction from '@/actions/workAction.js';
import { CreateAWorkFileServer , 
        DeleteAWorksFileServer ,
        ModifyAWorkFileNameServer , 
        ToSwitchCheckAWorkFileServer,
        GetAllWorksFileUnderParentWorksFileServer
    } from '@/server/requestData.js';
import { timeFormat } from '@/commonfunc/index';
import MoveOrCopyWorkFilesMask from '@/components/mask/MoveOrCopyWorkFilesMask.js';
import cookie from 'react-cookies';

/**
    fileId: Number,
    parentId: String,//最外层文件是‘’
    myId: String,
    workFileName: String,
    lastestModifyTime: Number
 */


//列表模式
class WorkFileItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    TocheckAworkFileItem = (e) => {//单选
        let { ToSwitchCheckAWorkFileAction } = this.props;
        let myId= this.ccc.rcCheckbox.input.dataset.id;
        ToSwitchCheckAWorkFileServer({myId,check:e.target.checked}).then(({data})=>{
            if(data && data.success){
                let { myId , check } = data.data;
                ToSwitchCheckAWorkFileAction({myId,check})
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
    toDeleteOneWorkFile = (myId) => {//显示确认删除定位框
        let { toShowDelteCoverAction } = this.props;
        toShowDelteCoverAction(myId)
    }
    toHideTheDeleteCover = (myId) => {//隐藏显示的定位框
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
                state: { worksFile , WorkFileMoveAndCopyMaskData } ,
            } = this.props;
        let t = e.target;
        let rej = (t.classList.contains('LiCheckBox') ||
                   t.classList.contains('ant-checkbox-wrapper') ||
                   t.classList.contains('ant-checkbox') ||
                   t.classList.contains('ant-checkbox-input') ||
                   t.classList.contains('ant-checkbox-inner') ||
                   t.classList.contains('ModifyItemToolsDeleteIcon') ||
                   t.classList.contains('ModifyItemToolsCopyIcon') ||
                   t.classList.contains('ModifyItemToolsMoveIcon') ||
                   t.classList.contains('ModifyItemToolsRenameIcon') )
        if(rej) return;
        if(t.classList.contains('workFileItemInfo') ||
            t.classList.contains('workFileItemInfoWrap')
        ){  
            t = e.target.parentNode;
        }else if(t.classList.contains('aboutWorkFileItemName')){
            t = e.target.parentNode.parentNode;
        }else if(t.classList.contains('establishUser') ||
                 t.classList.contains('lastestModifyTime') ||
                 t.classList.contains('ModifyItemTools')
        ){
            t = e.target.parentNode.parentNode.parentNode;

        }else if(t.classList.contains('WorkFileIcon') || 
                t.classList.contains('workFileItemName')
        ){
            t = e.target.parentNode.parentNode.parentNode;
        }
        let myId = t.dataset.id;
        if(myId){
            let oldPath = location.pathname;
            let arr = oldPath.split('/');
            let fileId = arr[2]*1
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
                        dbClickToWorkFileInsideAction({workFileName,myId});
                        GetAllWorksFileUnderParentWorksFileAction(data.data);
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
            state:{worksFile}
        } = this.props; 
        let c = false;
        let dataId = '';//data-id
        let time = '';//显示创建/修改时间
        if(oneFileData && oneFileData.myId){
            c = oneFileData.check;
            dataId = oneFileData.myId;
            time = timeFormat(oneFileData.lastestModifyTime);
            let year = new Date().getFullYear();
            let month = new Date().getMonth()+1;
            let day = new Date().getDate();
            let modifiedDate = time.split(' ')[0];
            let y = modifiedDate.split('-')[0]*1;
            let m = modifiedDate.split('-')[1]*1;
            let d = modifiedDate.split('-')[2]*1;
            time = modifiedDate.split(' ')[0];
            if(year === y){
                if(month === m){
                    if(day === d){
                        time = '今天'
                    }else if(day > d){
                        time = day-d+'天前';
                    }
                }
            }
        }
        let username = cookie.load('UserName');
        let oneLiCanCopyOrMove = worksFile.some(val=>val.check);//群组操作的时候，单个li不能再移动复制
        return (
            <li className="workFileItemLi" onDoubleClick={this.ToInside} data-id={oneFileData?oneFileData.myId:''}>
                <Checkbox 
                    onChange={this.TocheckAworkFileItem} 
                    className="LiCheckBox"
                    checked={c}
                    ref={node=>this.ccc=node}
                    data-id={dataId}
                />
                <div className="workFileItemInfoWrap">
                    <div className="aboutWorkFileItemName">
                        <Icon type="folder"  className="WorkFileIcon"/>
                        {/* 如果是新建 / 或者修改文件名，就显示 */}
                        { forCreate || oneFileData.isModifyWorkFileName ? <input 
                            type="text" 
                            className="ModifyWorkFileItemNameInput" 
                            autoFocus 
                            placeholder="按enter新建文件"
                            onKeyUp={this.ToCreateANewWorkFile}
                            ref={node=>this.WorkFileItemNameInput = node}
                            defaultValue={oneFileData?oneFileData.workFileName:null}
                            onBlur={this.goToHideInput}
                        />:<p className="workFileItemName" title={oneFileData.workFileName}>{oneFileData.workFileName}</p>}
                    </div>
                    <div className="workFileItemInfo">
                        <span className="establishUser">{username?username:''}</span>
                        <span className="lastestModifyTime">{time}</span>
                        {oneFileData && oneFileData.myId ?
                            <div className="ModifyItemTools">
                                <Icon 
                                    type="delete" 
                                    title="删除文件夹" 
                                    className="ModifyItemToolsDeleteIcon"
                                    onClick={this.toDeleteOneWorkFile.bind(this,oneFileData.myId)}
                                />
                                {
                                    !oneLiCanCopyOrMove ? <MoveOrCopyWorkFilesMask 
                                        insideLi='true'
                                        checkedCount='1'
                                        oneFileData={oneFileData}
                                    /> :null
                                }
                                <Icon 
                                    type="edit"  
                                    title="重命名"  
                                    className="ModifyItemToolsRenameIcon"
                                    onClick={this.ModifyOneWorkFile.bind(this,oneFileData.myId)}
                                /> 
                            </div>
                            : null}
                    </div>
                </div>
                { oneFileData && oneFileData.goToDelete ? <DelteWorkFileCover 
                    myId={oneFileData?oneFileData.myId:''}
                    confirmDeleteThisWorkFile={this.confirmDeleteThisWorkFile}
                    toHideTheDeleteCover={this.toHideTheDeleteCover}
                /> : null }
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorkFileItem));