import { Breadcrumb , Icon  } from 'antd';
import React from 'react';

class WorkHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="WorkHeadWrap">
                <header className="WorkHead">
                    <Breadcrumb separator=">" className="work-header-title">
                        <Breadcrumb.Item href="" >文件库</Breadcrumb.Item>
                        <Breadcrumb.Item href="" >文档</Breadcrumb.Item>
                        <Breadcrumb.Item href="">456 </Breadcrumb.Item>
                        <Breadcrumb.Item href="">45 </Breadcrumb.Item>
                        <Breadcrumb.Item href="">45666 </Breadcrumb.Item>
                        <Breadcrumb.Item href="">4566 </Breadcrumb.Item>
                        <Breadcrumb.Item href="">45 </Breadcrumb.Item>
                        <Breadcrumb.Item href="">cc</Breadcrumb.Item>
                        <Breadcrumb.Item>ddd</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="workHeadTools">
                        <a className="workCreator">
                            <Icon type="plus-circle" className="workCreatorPlusIcon"/>
                            创建文件夹
                        </a>
                        <div className="workUpload" title="此功能正在开发中">
                            <span className="workUploadText">
                                <Icon type="upload" className="workUploadIcon"/> 上传
                            </span>
                        </div>
                    </div>
                </header>
            </div>
             )
    }
}
 
export default WorkHead;