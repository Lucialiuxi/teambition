import React, { Component } from 'react';
import { Checkbox , Icon } from 'antd';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { ToSwitchCheckAllWorkFileServer ,
         DeleteCheckedWorkFilesServer ,
         ChangeWorksViewTypeServer
     } from '@/server/requestData.js';
import cookie from 'react-cookies';
import * as allAction from '@/actions/workAction.js';

class WorksNav extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            checkAll:false,//全选
            sort:'',//时间排序是升序还是降序
            groupDeal:false,//选中多个操作
            checkedCount:0
         }
    }
    componentWillReceiveProps(nextProps){
        let { state: { worksFile , worksViewType } } = nextProps;
        if(worksFile && worksFile[0]){
            let num = 0;
            worksFile.forEach(val=>{
                if(val.check){
                    num++;
                }
            })
            this.setState({
                checkAll:worksFile.every(val=>val.check),
                groupDeal:worksFile.some(val=>val.check===true),
                checkedCount:num
            })
        }
        if(worksViewType){
            let t = worksViewType.sortByModifyTime === 'descend' ? "caret-up" : "caret-down";
            this.setState({
                sort:t
            })
        }
    }

    //全选
    onChange = (e) => {
        let { state:{worksFile} ,ToSwitchCheckAllWorkFileAction } = this.props;
        if(worksFile[0]){
            let parentId = worksFile[0].parentId;
            ToSwitchCheckAllWorkFileServer({parentId,check:e.target.checked}).then(({data})=>{
                if(data.success){
                    ToSwitchCheckAllWorkFileAction({check:e.target.checked})
                    this.setState({
                        checkAll:e.target.checked
                    })
                }
            })
        }
    }

    //切换排序方式
    changeSort = () => {
        let { sort } = this.state;
        let { ToChangeWorkFileSortTypeAction } = this.props;
        let s = '';
        if(sort==="caret-up"){
            s = 'ascend'
            this.setState({
                sort: "caret-down"
            })
        }else{
            s = 'descend'
            this.setState({
                sort:"caret-up"
            })
        }
        ToChangeWorkFileSortTypeAction({sortByModifyTime:s})
    }

    //全选删除
    deleteCheckedWorkFiles = () => {
        let { state:{worksFile},DeleteCheckedWorkFilesAction} = this.props;
        let willDeletedFilesId = [];
        let arr = [];
        worksFile.forEach(val=>{
            if(val.check===true){
                willDeletedFilesId.push({myId:val.myId})
                arr.push(val)
            }
        })
        DeleteCheckedWorkFilesServer({myIdArr:willDeletedFilesId}).then(({data})=>{
            if(data.success){
                DeleteCheckedWorkFilesAction(arr)
            }
        })
    }
    //切换文件显示模式
    ChangeWorksViewType = (e) => {
        let t = e.target;
        let { ChangeWorksViewTypeAction } = this.props;
        if(t.nodeName === 'I'){
            let username = cookie.load('UserName');
            if(t.classList.contains('ThumbnailView-Icon') && !t.classList.contains('active')){//缩略图模式
                ChangeWorksViewTypeServer({ username , worksViewType:'ThumbnailView' }).then(({data})=>{
                    if(data.success){
                        ChangeWorksViewTypeAction({worksViewType: data.data})
                    }
                })
            }else if(t.classList.contains('ListView-Icon') && !t.classList.contains('active')){//列表模式
                ChangeWorksViewTypeServer({ username , worksViewType:'ListView' }).then(({data})=>{
                    if(data.success){
                        ChangeWorksViewTypeAction({worksViewType: data.data})
                    }
                })
            }

        }
    }
    render() { 
        let { state:{worksFile,worksViewType}} = this.props;
        let {  checkAll , sort , groupDeal , checkedCount } = this.state;
        let cls1 = classnames('ThumbnailView-Icon',{'active':worksViewType.worksViewType==='ThumbnailView'});
        let cls2 = classnames('ListView-Icon',{'active':worksViewType.worksViewType==='ListView'});
        if(!worksFile[0]){
            groupDeal= false;
            checkedCount = 0;
            checkAll = false;
        }
        return ( 
            <div className="worksNavWrap">
                <Checkbox 
                    onChange={this.onChange} 
                    className="CheckAllBox"
                    disabled={worksFile&&worksFile[0] ? false : true}
                    checked={checkAll}
                />
                {groupDeal ? <div className="worksNavWhenChecked">
                    <span className="alreadyCheckedCount">
                        已经选中{checkedCount}项
                    </span>
                    <span className="deleteCheckedWorkFile" onClick={this.deleteCheckedWorkFiles}>
                        <Icon type="delete" />
                        删除
                    </span>
                </div> : null }

                {/* <Icon type="caret-down" /> */}
                {!groupDeal &&  worksViewType.worksViewType==='ListView' ? <div className="worksNavUnCheck">
                    <div className="workFileItemInfo">
                        <a className="workFileItem-name">名称</a>
                        <a className="workFileItemEstablish-author">创建者</a>
                        <a className="workFileItemmodify-time" onClick={this.changeSort}>
                            更新时间
                            <Icon type={sort} className="workFileItemmodify-time-sort-icon"/>
                        </a>
                    </div>
                </div> : null }
                <div id="ThumbnailView-Or-ListView" onClick={this.ChangeWorksViewType}>
                    <Icon type="appstore-o" className={cls1} title="缩略图模式"/>
                    <Icon type="bars"  className={cls2} title="列表模式"/>
                </div>
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorksNav));