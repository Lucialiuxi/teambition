//修改文件信息的弹框
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Icon} from 'antd';
import './mask.css';
//项目设置里，把项目移动到回收站
import MoveFileToRecycleBin from './moveFileToRecycleBin';
import { postModifyFileInfo } from '@/server/requestData'
import cookie from 'react-cookies';
import { ModifyAFileInfo } from '@/actions/action';

class ModifyFileInfoMask extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            visible: false,
            FileName:'',
            FileAbstract:''
         }
    }
    /**
     * showModal、handleOk、handleCancel是弹框组件自带的
     */
    showModal = () => {
        let { FileAbstract , FileName } = this.props;
        this.setState({
          visible: true,
          FileName:FileName,
          FileAbstract:FileAbstract
        });
        setTimeout(()=>{
            let goToModifyFileInfo = document.getElementsByClassName('goToModifyFileInfo')[0];
            let btn = goToModifyFileInfo.getElementsByClassName('ant-btn-primary').item(0);
            this.save = btn;
            this.save.setAttribute('disabled','disabled');
        })
    }
    handleOk = (e) => {
        let userLoginName = cookie.load('UserName')
        if(!this.save.getAttribute("disabled")){
            // console.log('可以点击保存')
            this.setState({
                visible: false,
            });
            console.log(this.props)
            let { fileId , dispatch , star } = this.props;
            let { FileName , FileAbstract } = this.state;
            postModifyFileInfo({fileId,FileName,FileAbstract,userLoginName , star}).then(({data})=>{
                // console.log(data.afterModifyData)
                let o = data.afterModifyData;
                dispatch(ModifyAFileInfo(data.afterModifyData))
            })
        }
    }
    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }
    //修改项目信息的弹框遮罩切换选项卡
    ClickProjectInfoTitle=(e)=>{
        let target = e.target;
        if(target.nodeName==="UL") return;
        if(target.nodeName==="SPAN"){
           target = target.parentNode;
        }
        let ul = this.title;
        let lis = ul.getElementsByTagName('li')
        let projectInfo = ul.nextElementSibling;
        let projectOption = projectInfo.nextElementSibling;
        //弹框footer
        let foot = target.parentNode.parentNode.parentNode.lastElementChild
        if(e.target.innerText.trim()==='项目信息'){
            projectInfo.style.display = 'block';
            projectOption.style.display = 'none';
            [...lis].forEach(item=>item.className='')
            target.className = 'active';
            foot.style.display = 'block';
            //保存按钮设置为disabled
            this.save.setAttribute('disabled','disabled');
        }else{
            projectInfo.style.display = 'none';
            projectOption.style.display = 'block';
            [...lis].forEach(item=>item.className='')
            target.className = 'active';
            foot.style.display = 'none';
        }
    }
    //修改项目名称输入框的值
    ModifyProjectName=()=>{
        this.setState({
            FileName:this.projectNameinput.value
        },function(){
            this.saveBtnIsDisabled();
        })
    }
    //修改项目描述框的值
    ModifyProjectProfiles=()=>{
        this.setState({
            FileAbstract:this.FileAbstract.value
        },function(){
            this.saveBtnIsDisabled()
        })
    }
    //调整 修改文件的保存按钮 是否disabled
    saveBtnIsDisabled=()=>{
        let { FileAbstract , FileName } = this.props
        if(this.projectNameinput.value === FileName &&
            this.FileAbstract.value === FileAbstract
        ){
            this.save.setAttribute('disabled','disabled')
        }else{
            this.save.removeAttribute('disabled')
        }
    }
    componentDidUpdate(){
        console.log('componentDidUpdate')
        let goToModifyFileInfoModal = document.getElementsByClassName('goToModifyFileInfoModal')[0];
        console.log(goToModifyFileInfoModal)
    }
    render() { 
        // console.log(this.props)
        let { FileName , FileAbstract } = this.state;
        return ( 
            <div 
                className="ModifyFileInfoMask"
            >
                    <Icon type="edit" className="editFileInfo"  onClick={this.showModal}/>
                <Modal
                    wrapClassName="goToModifyFileInfo"
                    className="goToModifyFileInfoModal"
                    title="项目设置"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="保存"
                    cancelText="取消"
                    maskClosable="true"
                >
                <ul className="title"
                    onClick={this.ClickProjectInfoTitle}
                    ref={node => {
                        this.title = node
                    }}
                >
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
                    <input 
                        type="text" 
                        className="projectNameinput" 
                        value={FileName}
                        ref={node=>{
                            this.projectNameinput = node;
                        }}
                        onChange={this.ModifyProjectName}
                    />
                    <label>项目简介</label>
                    <textarea 
                        type="text" 
                        placeholder="介绍一个这个项目" 
                        className="projectProfiles"
                        ref={node=>{
                            this.FileAbstract = node;
                        }}
                        value={FileAbstract}
                        onChange={this.ModifyProjectProfiles}
                    ></textarea>
                </div>
                <div className="projectOption">
                    <label>项目操作</label>
                    <div>您可以执行以下操作</div>
                    <MoveFileToRecycleBin {...this.props}/>
                </div>
                </Modal>
            </div>
         )
    }
}

export default connect()(ModifyFileInfoMask);