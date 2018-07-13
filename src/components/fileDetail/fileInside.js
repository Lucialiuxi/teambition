//点击一个项目文件夹，内部显示
import React, { Component } from 'react';
import SubNav from '@/components/commons/subNav/subNav';
class FileInside extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    shouldComponentUpdate(){
        return true;
    }
    render() {
        return ( 
            <div id="fileInsideWrap">
            {/* 把函数tabBar传给 SubNav组件*/}
                <SubNav {...this.props}/>
            </div>
         )
    }
}
 
export default FileInside;