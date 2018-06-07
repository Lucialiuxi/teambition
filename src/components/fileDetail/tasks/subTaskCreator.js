import React, { Component } from 'react';
import { Icon} from 'antd';
import { connect } from 'react-redux';

 
// 新建--项目列表子任务
class SubTaskCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    setDeadline=()=>{
        console.log('setDeadline',this.props)
        let { id , GoToChoiceSubTaskDeadline } = this.props;
        GoToChoiceSubTaskDeadline(id)
    }
    render() {
        return (
        <div 
            className="subTask-creator-wrap"
        >
        <div className="task-creator fade in">
            <textarea 
                className="task-content-input form-control" 
                placeholder="任务内容"
            ></textarea>
            <div className="createUser">Lucia</div>
            <div className="date-wrap" onClick={this.setDeadline}>
                <Icon type="calendar" />
                <span className="date-text">设置截止时间</span>
            </div>
            <div className="scenario-creators-wrap more-set">
                <div className="scenario-infos-creator-view detail-infos-wrapper">
                    <section className="detail-infos-priority-view no-border-wrapper">
                        <div className="priority-container">
                            <div className="priority-aside detail-infos-aside short-version">
                                <div className="icon-circle"></div>
                                <button className="btn urgencyBtn">普通</button>
                            </div>
                        </div>
                    </section>
                    <div className="setTagBox">
                        <Icon type="tags-o"/>
                        <div className="tag-text">添加标签</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="confirmCreacteBtn-wrap">
            <button id="confirmCreacteBtn">创建</button>
        </div>
    </div>)
    }
}
const mapStateToProps = state => {
    return  {
        state
    }
} 
export default connect(mapStateToProps,null)(SubTaskCreator);
