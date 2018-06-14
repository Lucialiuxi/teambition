//文件回收站组件
import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import { MoveFileToRecycleBin , DeleteAFlieAction }  from '@/actions/action';
import { MoveFileToRecycleBinServer , DeleteAFlieServer } from '@/server/requestData';


const confirm = Modal.confirm;

class FileItemInRecyCleBin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    showConfirm=()=>{
        let { dispatch } = this.props;
        confirm({
            title: '恢复项目',
            content: '恢复项目后，您就可以正常使用该项目了',
            className:'GoBackwardMaskBox',
            maskClosable:true,
            onOk:()=>{
                MoveFileToRecycleBinServer({...this.props,inRecycleBin:false}).then(({data})=>{
                    dispatch(MoveFileToRecycleBin(data.afterModifyData))                    
                })
            }
        });
    }
    showDeleteConfirm=()=>{
        let { dispatch , state:{taskItemInfo,subTaskInfo}} = this.props;
        confirm({
          title: '删除项目',
          content: '一旦你删除了项目「333」，所有与项目有关的信息将会被永久删除。这是一个不可恢复的操作，请谨慎对待！',
          className:'deleteRecycleFileBox',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          maskClosable:true,
          onOk:()=>{
            DeleteAFlieServer(this.props).then(({data})=>{
                dispatch(DeleteAFlieAction(data.deletedFileInfo))
            })

          }
        })
    }
    render() { 
        let { FileName , FileAbstract , fileId } = this.props;
        if(!FileName){
            return null
        }
        return ( 
                <li className="fileItem" data-id={fileId}>
                    <Icon 
                        type="reload" 
                        className="GoBackward"
                        onClick={this.showConfirm}
                    />
                    <Icon 
                        type="delete"  
                        className="deleteRecycleFile"
                        onClick={this.showDeleteConfirm}
                    />
                    <h3>{FileName}</h3>
                    <h4>{FileAbstract}</h4>
                </li>
         )
    }
}
const mapStateToProps = state => {
    return {
        state
    }
}
export default connect(mapStateToProps,null)(FileItemInRecyCleBin);