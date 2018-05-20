import React, { Component } from 'react';
import { Icon } from 'antd';

class FileItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
                <li className="fileItem newAfile">
                    <Icon 
                        type="plus-circle" 
                        className="newAfileIcon"
                    />
                    <div className="tip">创建新的项目</div>
                </li>
         )
    }
}
 
export default FileItem;