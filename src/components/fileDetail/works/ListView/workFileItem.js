import {  Checkbox , Icon } from 'antd';
import React from 'react';
import DelteWorkFileCover from '../delteCover.js';
//列表模式
class WorkFileItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    TocheckAworkFileItem(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    render() { 
        return (
            <li className="workFileItemLi">
                <Checkbox onChange={this.TocheckAworkFileItem} className="LiCheckBox"/>
                <div className="workFileItemInfoWrap">
                    <div className="aboutWorkFileItemName">
                        <Icon type="folder"  className="WorkFileIcon"/>
                        <p className="workFileItemName">2222</p>
                        {/* <input type="text" className="ModifyWorkFileItemNameInput"/> */}
                    </div>
                    <div className="workFileItemInfo">
                        <span className="establishUser">lucia</span>
                        <span className="lastestModifyTime">今天</span>
                        <div className="ModifyItemTools">
                            <Icon type="delete" title="删除文件夹" className="ModifyItemToolsDeleteIcon"/>
                            <Icon type="copy"  title="复制文件夹" className="ModifyItemToolsCopyIcon"/>
                            <Icon type="profile" title="移动文件夹" className="ModifyItemToolsMoveIcon"/>
                            <Icon type="edit"  title="重命名"  className="ModifyItemToolsRenameIcon"/>
                        </div>
                    </div>
                </div>
                {/* <DelteWorkFileCover/> */}
            </li> 
            )
    }
}
 
export default WorkFileItem;