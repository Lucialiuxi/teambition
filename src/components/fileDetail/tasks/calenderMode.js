import React, { Component } from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';

class CanlenderMode extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: moment('2018-06-01'),
            selectedValue: moment('2018-06-01'),
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
                <button className="confirm">确认</button>
            </div>
         )
    }
}
 
export default CanlenderMode;