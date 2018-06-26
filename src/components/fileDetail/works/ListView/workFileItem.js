import {  Checkbox , Icon } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { 
    withRouter
} from 'react-router-dom';
import DelteWorkFileCover from '../delteCover.js';
import { CreateAWorkFileServer , 
        DeleteAWorksFileServer ,
        ModifyAWorkFileNameServer , 
        ToSwitchCheckAWorkFileServer
    } from '@/server/requestData.js';
import { bindActionCreators } from 'redux';
import * as allAction from '@/actions/workAction.js';
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
        this.state = {
            createPerson:''
         }
    }
    TocheckAworkFileItem = (e) => {
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
            forCreate , 
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
                if(oneFileData.workFileName!==val){
                    ModifyAWorkFileNameServer({
                        workFileName:val,
                        myId:oneFileData.myId,
                        lastestModifyTime: now
                    }).then(({data})=>{
                        if(data && data.success){
                            let { myId , workFileName } = data.data;
                            AlreadyModifyAWorkFileNameAction({myId,workFileName,lastestModifyTime: now})
                            HideInputAction()
                        }
                    })
                }
                
            }else{//新建一个文件
                CreateAWorkFileServer({
                    username,
                    fileId,
                    parentId,
                    workFileName: val,
                    lastestModifyTime: now
                }).then(({data})=>{
                    if(data && data.success){
                        AlreadyCreateAWorksFileAction(data.data)
                        HideInputAction()
                    }
                })
            }
        }
    }
    deleteOneWorkFile = (myId) => {//删除文件夹
        let { DeleteAWorksFileAction } = this.props;
        DeleteAWorksFileServer({myId})
        .then(({data})=>{
            if(data && data.success){
                DeleteAWorksFileAction(data.data.myId)
            }
        })
    }
    ModifyOneWorkFile = (myId) => {//重命名
        let { ModifyAWorkFileNameAction } = this.props;
        ModifyAWorkFileNameAction(myId)
    }
    ToInside = (e) => {//进入文件内部
        let { history , location } = this.props;
        let t = e.target;
        let rej = (t.classList.contains('LiCheckBox') ||
                   t.classList.contains('ModifyItemToolsDeleteIcon') ||
                   t.classList.contains('ModifyItemToolsCopyIcon') ||
                   t.classList.contains('ModifyItemToolsMoveIcon') ||
                   t.classList.contains('ModifyItemToolsRenameIcon') )
        if(rej) return;
        if(t.classList.contains('workFileItemInfo') ||
            t.classList.contains('workFileItemInfoWrap')
        ){
            t = e.target.parentNode;
        }else if(t.classList.contains('aboutWorkFileItemName') ||
                 t.classList.contains('establishUser') ||
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
            let newpath = `${oldPath}/${myId}`
            history.push({pathname:newpath,state:{t:'works'}})
        }
    }
    render() { 
        let { 
            forCreate, 
            oneFileData 
        } = this.props; 
        let c = false;
        let dataId = ''
        if(oneFileData && oneFileData.myId){
            c = oneFileData.check;
            dataId = oneFileData.myId;
        }
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
                        />:<p className="workFileItemName">{oneFileData.workFileName}</p>}
                    </div>
                    <div className="workFileItemInfo">
                        <span className="establishUser">lucia</span>
                        <span className="lastestModifyTime">今天</span>
                        {oneFileData && oneFileData.myId ?
                            <div className="ModifyItemTools">
                                <Icon 
                                    type="delete" 
                                    title="删除文件夹" 
                                    className="ModifyItemToolsDeleteIcon"
                                    onClick={this.deleteOneWorkFile.bind(this,oneFileData.myId)}
                                />
                                <Icon 
                                    type="copy"  
                                    title="复制文件夹" 
                                    className="ModifyItemToolsCopyIcon"
                                    />
                                <Icon 
                                    type="profile" 
                                    title="移动文件夹" 
                                    className="ModifyItemToolsMoveIcon"
                                />
                                <Icon 
                                    type="edit"  
                                    title="重命名"  
                                    className="ModifyItemToolsRenameIcon"
                                    onClick={this.ModifyOneWorkFile.bind(this,oneFileData.myId)}
                                /> 
                            </div>: null
                        }
                    </div>
                </div>
                {/* <DelteWorkFileCover/> */}
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