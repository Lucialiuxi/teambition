import React, { Component } from 'react';
import { Icon  } from 'antd';

class ModifyMenuCover extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div id="ModifyMenuCoverWrap">
                <header className="ModifyMenuCover-head">
                    <h3>文件夹菜单</h3>
                    <Icon type="close" className="ModifyMenuCover-closeIcon"/>
                </header>
                <ul className="ModifyMenuCover-content">
                    <li className="ModifyMenuList">
                        <Icon type="profile" className="ModifyMenuList-MoveIcon"/>
                        <span className="ModifyMenuList-title">移动文件夹</span>
                    </li>
                    <li className="ModifyMenuList">
                        <Icon type="copy" className="ModifyMenuList-CopyIcon"/>
                        <span className="ModifyMenuList-title">复制文件夹</span>
                    </li>
                    <li className="ModifyMenuList">
                        <Icon type="delete" className="ModifyMenuList-DeleteIcon"/>
                        <span className="ModifyMenuList-title">删除文件夹</span>
                    </li>
                </ul>
            </div>
         )
    }
}
 
export default ModifyMenuCover;