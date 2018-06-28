import React , { Component } from 'react';
import {Icon } from 'antd';

//确认删除一个li文件的定位框
class DelteWorkFileCover extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    ConfirmDelteAWorkFile=(myId)=>{//确认删除这个文件夹
        let { confirmDeleteThisWorkFile } = this.props;
        confirmDeleteThisWorkFile(myId)
    }
    hideDelteCover = (myId) =>{//关于自己
         let { toHideTheDeleteCover } = this.props;
         toHideTheDeleteCover(myId)
    }
    render() { 
        let { myId } = this.props;
        return ( 
            <div className="delteWorkFileCover-Wrap">
                <header className="delteWorkFileCover-Head">
                    <Icon type="left" className="delteWorkFileCover-leftIcon"/>
                    <h3 className="delteWorkFileCover-Title">移到回收站</h3>
                    <Icon type="close" className="delteWorkFileCover-closeIcon" onClick={this.hideDelteCover.bind(this,myId)}/>
                </header>
                <div className="delteWorkFileCover-Content">
                    <p className="delteWorkFileCover-Tip">您确定要永久删除该文件夹吗？</p>
                    <button className="delteWorkFile-ConfirmBtn" onClick={this.ConfirmDelteAWorkFile.bind(this,myId)}>确认删除</button>
                </div>
            </div>
         )
    }
}
 
export default DelteWorkFileCover;