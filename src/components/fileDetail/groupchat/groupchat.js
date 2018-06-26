import React , { Component } from 'react';
import Websocket from 'react-websocket';

class Groupchat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }
    handleData(data) {
        let result = JSON.parse(data);
        this.setState({count: this.state.count + result.movement});
    }

    render() { 
        return ( 
        <div id="GroupChatWrap">
            Count: <strong>{this.state.count}</strong>

            <Websocket url='ws://localhost:3000/project/32635326286498/groupchat'
                onMessage={this.handleData.bind(this)}/>
        </div>
        )
    }
}
 
export default Groupchat;