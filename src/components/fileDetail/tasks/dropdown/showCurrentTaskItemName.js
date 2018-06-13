//点击 ‘移动本列表所有任务’ OR ‘复制本列表所有任务’ 的列表显示的上一层定位框
import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';

class ShowCurrentTaskItemNameCover extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let { state:{taskItemInfo} , fileId:id } = this.props;
        return ( 
            <ul id="CurrentTaskItemNameCoverWrap">
                <li className="CurrentTaskItemName"> 
                    222222222222222222222222
                    <Icon type="check"  className="selectTaskItemNameICon"/>
                </li>
                <li className="CurrentTaskItemName"> 
                    222222222222222222222222
                    <Icon type="check"  className="selectTaskItemNameICon"/>
                </li>
                <li className="CurrentTaskItemName"> 
                    222222222222222222222222
                    <Icon type="check"  className="selectTaskItemNameICon"/>
                </li>
            </ul>
         )
    }
}

const mapStateToProps = state => {
    return  {
        state
    }
}
export default connect(mapStateToProps,null)(ShowCurrentTaskItemNameCover);