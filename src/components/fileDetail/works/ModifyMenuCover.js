import React, { Component } from 'react';
import { Icon  } from 'antd';

import * as allAction from '@/actions/workAction.js';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import MoveOrCopyWorkFilesMask from '@/components/mask/MoveOrCopyWorkFilesMask.js';

class ModifyMenuCover extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    toCloseModifyWorkFileMenuCover = () => {//关闭文件夹菜单的显示框
        let { toHideModifyWorkFileMenuCoverAction } = this.props;
        toHideModifyWorkFileMenuCoverAction()
    }
    toShowDeleteCover = (myId) => {//显示删除文件夹定位框
        let { toShowDelteCoverAction } = this.props;
        toShowDelteCoverAction(myId)
    }
    render() { 
        let { oneFileData } = this.props;
        return ( 
            <div id="ModifyMenuCoverWrap">
                <header className="ModifyMenuCover-head">
                    <h3 className="ModifyMenuCover-head-title">文件夹菜单</h3>
                    <Icon type="close" className="ModifyMenuCover-closeIcon" onClick={this.toCloseModifyWorkFileMenuCover}/>
                </header>
                <ul className="ModifyMenuCover-content">
                    <li className="ModifyMenuList">
                        <Icon type="profile" className="ModifyMenuList-MoveIcon"/>
                        <span className="ModifyMenuList-title">移动文件夹</span>
                        <MoveOrCopyWorkFilesMask
                            insideLi='false'
                            checkedCount='1'
                            oneFileData={oneFileData}
                        />
                    </li>
                    <li className="ModifyMenuList">
                        <Icon type="copy" className="ModifyMenuList-CopyIcon"/>
                        <span className="ModifyMenuList-title">复制文件夹</span>
                        <MoveOrCopyWorkFilesMask
                            insideLi='false'
                            checkedCount='1'
                            oneFileData={oneFileData}
                        />
                    </li>
                    <li className="ModifyMenuList" onClick={this.toShowDeleteCover.bind(this,oneFileData.myId)}>
                        <Icon type="delete" className="ModifyMenuList-DeleteIcon"/>
                        <span className="ModifyMenuList-title">删除文件夹</span>
                    </li>
                </ul>
            </div>
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ModifyMenuCover));  