import React, { Component } from 'react';
import { Modal, Icon} from 'antd';
import './mask.css';
import MoveFileToRecycleBin from './moveFileToRecycleBin'

class ModifyFileInfoMask extends Component {
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
    handleOk = (e) => {
    console.log(e);
    this.setState({
        visible: false,
    });
    }
    handleCancel = (e) => {
    console.log(e);
    this.setState({
        visible: false,
    });
    }
    render() { 
        return ( 
            <div className="ModifyFileInfoMask">
                    <Icon type="edit" className="editFileInfo"  onClick={this.showModal}/>
                <Modal
                wrapClassName="goToModifyFileInfo"
                title="项目设置"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="保存"
                cancelText="取消"
                >
                <ul className="title">
                    <li className="active">
                        <Icon type="switcher" />
                        <span>项目信息</span>
                    </li>
                    <li>
                        <Icon type="meh" />
                        <span>项目操作</span>
                    </li>
                </ul>
                <div className="projectInfo">
                    <label>项目名称</label>
                    <input type="text" className="projectNameinput"/>
                    <label>项目简介</label>
                    <textarea type="text" placeholder="介绍一个这个项目" className="projectProfiles"></textarea>
                </div>
                <div className="projectOption">
                    <label>项目操作</label>
                    <div>您可以执行以下操作</div>
                    <MoveFileToRecycleBin/>
                </div>
                </Modal>
            </div>
         )
    }
}
 
export default ModifyFileInfoMask;