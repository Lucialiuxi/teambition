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
        let { state:{taskItemInfo} , fileId:id , taskItemId} = this.props;
        let taskItemUnderUpper = taskItemInfo.filter(val=>val.fileId===id);
        return ( 
            <ul id="CurrentTaskItemNameCoverWrap">
                { taskItemUnderUpper.map(val=>{
                   return  <li key={val.taskItemId} className="CurrentTaskItemName"> 
                                {val.taskItemName}
                                {val.taskItemId===taskItemId ? <Icon type="check"  className="selectTaskItemNameICon"/> : null}
                            </li>
                })}
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