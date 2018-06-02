import React, { Component } from 'react';
import { Icon } from 'antd';

class MoveOrCopySubTask extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="MoveOrCopySubTaskWrap">
                <ul className="MoveOrCopySubTaskContent">
                    <li>
                        <span className="MoveOrCopySubTaskTitle">项目</span>
                        <span>
                            <em>项目名称</em>
                            <Icon type="down" />
                        </span>
                    </li>
                    <li>
                        <span className="MoveOrCopySubTaskTitle">列表</span>
                        <span>
                            <em>列表名称</em>
                            <Icon type="down"/>
                        </span>
                    </li>
                </ul>
                <button>确定</button>
            </div>
         )
    }
}
 
export default MoveOrCopySubTask;