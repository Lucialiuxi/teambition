import {  Checkbox , Icon } from 'antd';
import React from 'react';

class WorkFileItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    TocheckAworkFileItem(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    render() { 
        return (
            <li className="workFileItemLi">
                <Checkbox onChange={this.TocheckAworkFileItem}/>
                <div className="workFileItemInfoWrap">
                    <Icon type="folder" />
                    <p className="workFileItemName">2222</p>
                    <input type="text"/>
                    <div className=""></div>
                </div>
            </li> 
            )
    }
}
 
export default WorkFileItem;