import React, { Component } from 'react';
import { Icon } from 'antd';

import ModifyFileInfoMask from '@/components/mask/modifyFileInfoMask'

class FileItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let {title,subTitle} = this.props;
        return ( 
                <li className="fileItem">
                    {/* 编辑框 */}
                    <ModifyFileInfoMask/>
                    <Icon type="star"  className="favorite" />
                    <h3>{title}</h3>
                    <h4>{subTitle}</h4>
                </li>
         )
    }
}
 
export default FileItem;