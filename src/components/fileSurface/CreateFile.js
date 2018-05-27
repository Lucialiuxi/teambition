//新建项目文件夹
import React, { Component } from 'react';
import { Icon , Modal } from 'antd';
import { connect } from 'react-redux';
import {CreateAFile}  from '@/actions/action';
import cookie from 'react-cookies';
import { createAFileServer} from '@/server/requestData'

let FileName = '';
let FileAbstract = '';

/**
 * showModal,handleOk,handleCancel是UI库弹框自带的函数
 */
class FileItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
         }
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
    }
    handleOk = () => {
        console.log('handleOk',this)
        let {dispatch} = this.props;
        this.setState({
            confirmLoading: true,
        });
        FileName = this.input1.value;
        FileAbstract = this.input2.value;
        let user = cookie.load('UserName');
        let o = {
            userLoginName:user,
            FileName,
            FileAbstract,
            fileId: Date.now()+Math.random(),
            star: false,
            inRecycleBin: false
        }
        if (FileName) {
            createAFileServer(o).then(({data})=>{
                console.log(data.lastestFileInfoData)
                dispatch(CreateAFile(data.lastestFileInfoData))
            })
            this.input1.value = '';
            this.input2.value = ''
            
            // 关闭新建遮罩
            setTimeout(() => {
                this.setState({
                    visible: false
                });
            });  
        }else{
            this.input1.focus();
        }



    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    render() {
        let { visible, confirmLoading, ModalText} = this.state;
        return ( 
                <li className="fileItem newAfile">
                    <Icon 
                        type="plus-circle" 
                        className="newAfileIcon"
                        onClick={this.showModal}
                    />
                        <Modal 
                            className="creatFileModal"
                            title="创建项目"
                            visible={visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            okText="完成并创建"
                        >
                        <div className="illustration">插图</div>
                        <p className="intro">为不同的事务建立各自的项目</p>
                        <input 
                            type="text" 
                            className="insertFileName"
                            placeholder="项目名称(必填)"
                            ref={node => {
                                this.input1 = node
                            }}
                        />
                        <input 
                            type="text" 
                            className="insertAbstract"
                            placeholder="项目简介(选填)" 
                            ref={node => {
                                this.input2 = node
                            }}   
                        />
                        </Modal>
                    <div className="tip">创建新的项目</div>
                </li>
         )
    }
}
 
export default connect()(FileItem);