import React , { Component } from 'react';
import {  Icon } from 'antd';

class EmptyWorkFile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div id="emptyWorkFileWrap">
                <Icon type="meh-o"  className="emptyWorkFileIcon"/>
                <br/>
                文件夹中还没有内容哦
            </div>
          )
    }
}
 
export default EmptyWorkFile;