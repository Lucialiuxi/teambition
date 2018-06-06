//【添加任务的显示】----点击去 显示新建子任务编辑框 
import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';

class ToShowSubTaskCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    GoToCreateSubTaskFn=()=>{
        let { id , GoToCreateSubTask } = this.props;
        GoToCreateSubTask(id)
    }
    render() { 
        return ( 
            <div
                onClick={this.GoToCreateSubTaskFn}
                className="task-creator-handler-wrap"
                >
                <a className="task-creator-handler link-add-handler">
                    <Icon 
                        type="plus-circle" 
                        className="AddSubTaskIcon"
                        style={{ fontSize: 15, color: '#3da8f5' , marginRight:'10px'}}
                    />
                    添加任务
                </a>
            </div> )
    }
}

const mapStateToProps = state => {
    return  {
        state
    }
}
export default connect(mapStateToProps,null)(ToShowSubTaskCreator);