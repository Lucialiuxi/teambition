import { Breadcrumb , Icon  } from 'antd';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter , Link } from 'react-router-dom';
import * as allAction from '@/actions/workAction.js';
import { GetAllWorksFileUnderParentWorksFileServer } from '@/server/requestData.js';

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
    componentWillReceiveProps(nextProps){
        let { location:{pathname:p} ,
              changeBreadCrumbAction ,
              emptyBreadCrumbAction ,
              GetAllWorksFileUnderParentWorksFileAction,
              emptyAGroupOfSameParentIdWorkFilesAction
        } = this.props;
        let { location:{pathname} } = nextProps;
        if(pathname!==p){
            let arr = pathname.split('/');
            let  myId = '';
            if(arr.length===5){
                myId = arr[4];
            }
            //work页回到最顶层文件的时候，不显示导航条 并清空已经存的移动和复制弹框用的数据
            //清空原来所存的修改和复制的弹框数据
            if(arr.length===4){
                emptyBreadCrumbAction()
                emptyAGroupOfSameParentIdWorkFilesAction()
            }
            changeBreadCrumbAction(myId);
            GetAllWorksFileUnderParentWorksFileServer({fileId: arr[2],parentId: myId }).then(({data})=>{
                if(data.success){
                    GetAllWorksFileUnderParentWorksFileAction(data.data)
                }
            })
            return true
        }else{
            return false
        }
    }
    render() { 
        let { state:{ worksFilrCrumb } ,location:{pathname} } = this.props;
        let len = worksFilrCrumb ? worksFilrCrumb.length : 0;
        let fileId = pathname.match(/\d+/g)[0]*1;
        return ( 
            <div className="WorkHeadWrap">
                <header className="WorkHead">
                    <Breadcrumb separator=">" className="work-header-title">
                        <Breadcrumb.Item>
                            <Link to={`/project/${fileId}/works`}>文件库</Link>
                        </Breadcrumb.Item>
                        { worksFilrCrumb && worksFilrCrumb[0] ?
                            worksFilrCrumb.map((val,index)=>{
                                return <Breadcrumb.Item 
                                            data-id={val.myId}
                                            key={val.myId}
                                        >
                                        {len===index ? val.workFileName : <Link to={`/project/32673061269736/works/${val.myId}`}>{val.workFileName}</Link>}
                                        </Breadcrumb.Item>
                            })
                         : null }
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