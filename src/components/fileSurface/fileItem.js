import React, { Component } from 'react';
import { Icon } from 'antd';

import ModifyFileInfoMask from '@/components/mask/modifyFileInfoMask'

class FileItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let {FileName,FileAbstract,fileId} = this.props;
        if(!FileName){
            return null
        }
        return ( 
                <li className="fileItem" data-id={fileId}>
                    {/* 编辑框 */}
                    <ModifyFileInfoMask/>
                    <Icon type="star"  className="favorite" />
                    <h3>{FileName}</h3>
                    <h4>{FileAbstract}</h4>
                </li>
         )
    }
}
 
export default FileItem;