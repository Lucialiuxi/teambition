//点击一个文件夹，内部显示
import React, { Component } from 'react';
import SubNav from '@/components/commons/subNav/subNav';

class FileInside extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div id="fileInsideWrap">
                <SubNav/>
            </div>
         )
    }
}
 
export default FileInside;