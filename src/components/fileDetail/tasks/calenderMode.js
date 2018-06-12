import React, { Component } from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';

class CanlenderMode extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: moment(),//默认选中日期
            selectedValue: moment(),//当前选中的日期
         }
    }
    onSelect = (value) => {
        this.setState({
            value,
            selectedValue: value,
        });
    }
    onPanelChange = (value) => {
        this.setState({ value });
    }
    getTime = () => {
        let { taskItemId , getDeadline } = this.props;
        let today = this.state.selectedValue.format('YYYY-MM-DD')
        getDeadline(taskItemId,today)
    }
    render() { 
        const { value, selectedValue } = this.state;
        return ( 
            <div 
                style={{ width: 252, borderRadius: 4 }}
                className="CommonCanlender"
            >
                <Alert message={`${selectedValue && selectedValue.format('YYYY-MM-DD')}`} />
                <Calendar 
                    value={value} 
                    onSelect={this.onSelect} 
                    fullscreen={false} 
                    onPanelChange={this.onPanelChange}
                />
                <button className="clear">清除</button>
                <button className="confirm" onClick={this.getTime}>确认</button>
            </div>
         )
    }
}
 
export default CanlenderMode;