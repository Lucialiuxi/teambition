import React, { Component } from 'react';


class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <ul id="TasksWrap">
                <li className="taskItem">
                    <header>
                        <h4>待处理</h4>
                    </header>
                </li>
            </ul> 
        )
    }
}
 
export default Tasks;