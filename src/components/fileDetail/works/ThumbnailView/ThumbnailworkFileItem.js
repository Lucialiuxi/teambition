import React , { Component } from 'react';
import {  Icon } from 'antd';
//复制移动删除文件夹的定位框
import ModifyMenuCover from '../ModifyMenuCover.js';
//确认删除文件夹的定位框    
import DelteWorkFileCover from '../delteCover.js';

//缩略图模式

class ThumbNailWorkFileItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <li className="ThumbNailWorkFileItemLi">
                <div className="check-frame">
                    <Icon type="check-square" className="check-frame-checkIcon"/>
                    <Icon type="down" className="check-frame-downIcon"/>
                    {/* <ModifyMenuCover/> */}
                    {/* <DelteWorkFileCover/> */}
                </div>
                <div className="title-bar">
                    {/* <input  type="text" className="title-edit-input"/> */}
                    <p className="elastic-title" title="lucia">lucia</p>
                </div>
            </li>
         )
    }
}
 
export default ThumbNailWorkFileItem;