import React , { Component } from 'react';
import {Icon } from 'antd';

//删除文件夹定位框
class DelteWorkFileCover extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="delteWorkFileCover-Wrap">
                <header className="delteWorkFileCover-Head">
                    <Icon type="left" className="delteWorkFileCover-leftIcon"/>
                    <h3 className="delteWorkFileCover-Title">移到回收站</h3>
                    <Icon type="close" className="delteWorkFileCover-closeIcon"/>
                </header>
                <div className="delteWorkFileCover-Content">
                    <p className="delteWorkFileCover-Tip">您确定要永久删除该文件夹吗？</p>
                    <button className="delteWorkFile-ConfirmBtn">确认删除</button>
                </div>
            </div>
         )
    }
}
 
export default DelteWorkFileCover;