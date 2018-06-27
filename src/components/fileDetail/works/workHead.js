import { Breadcrumb , Icon  } from 'antd';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as allAction from '@/actions/workAction.js';

class WorkHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    //点击创建文件夹
    toCreateAWorkFile = () => {
        let { GoToCreateAWorksFileAction } = this.props;
        GoToCreateAWorksFileAction()
    }
    render() { 
        let { state:{ worksFile } } = this.props;
        return ( 
            <div className="WorkHeadWrap">
                <header className="WorkHead">
                    <Breadcrumb separator=">" className="work-header-title">
                        <Breadcrumb.Item href="" >文件库</Breadcrumb.Item>
                        { worksFile && worksFile[0] ? <Breadcrumb.Item></Breadcrumb.Item> : null }
                    </Breadcrumb>
                    <div className="workHeadTools">
                        <a className="workCreator"  onClick={this.toCreateAWorkFile}>
                            <Icon type="plus-circle" className="workCreatorPlusIcon" />
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
const mapStateToProps = state => {
    return  {
        state
    }
}
const  mapDispatchToProps = (dispatch) => {
    return bindActionCreators(allAction,dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorkHead));