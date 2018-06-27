import React, { Component } from 'react';
import { Checkbox , Icon } from 'antd';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ToSwitchCheckAllWorkFileAction , 
         ToChangeWorkFileSortTypeAction ,
         DeleteCheckedWorkFilesAction ,
         GetAllWorksFileUnderParentWorksFileAction
     } from '@/actions/workAction.js';
import { ToSwitchCheckAllWorkFileServer ,
         DeleteCheckedWorkFilesServer ,
         GetAllWorksFileUnderParentWorksFileServer
     } from '@/server/requestData.js';
import MoveOrCopyWorkFilesMask from '@/components/mask/MoveOrCopyWorkFilesMask.js';

class WorksNav extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            viewType:'ListView',//文件展示模式
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

    componentDidMount(){
        this.setState({
            viewType:this.props.tp
        })
    }
    //全选
    onChange = (e) => {
        let { state:{worksFile} } = this.props;
        if(worksFile[0]){
            let parentId = worksFile[0].parentId;
            let { dispatch } = this.props;
            ToSwitchCheckAllWorkFileServer({parentId,check:e.target.checked}).then(({data})=>{
                if(data.success){
                    dispatch(ToSwitchCheckAllWorkFileAction({check:e.target.checked}))
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
        let { dispatch } = this.props;
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
        dispatch(ToChangeWorkFileSortTypeAction({sortByModifyTime:s}))
    }

    //全选删除
    deleteCheckedWorkFiles = () => {
        let { state:{worksFile},dispatch} = this.props;
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
                dispatch(DeleteCheckedWorkFilesAction(arr))
            }
        })
    }
    render() { 
        let { state:{worksFile}} = this.props;
        let { viewType , checkAll , sort , groupDeal , checkedCount } = this.state;
        let cls1 = classnames('ThumbnailView-Icon',{'active':viewType==='ThumbnailView'});
        let cls2 = classnames('ListView-Icon',{'active':viewType==='ListView'});
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
                    <MoveOrCopyWorkFilesMask checkedCount={checkedCount}/>
                    <span className="deleteCheckedWorkFile" onClick={this.deleteCheckedWorkFiles}>
                        <Icon type="delete" />
                        删除
                    </span>
                </div> : null }

                {/* <Icon type="caret-down" /> */}
                {!groupDeal ? <div className="worksNavUnCheck">
                    <div className="workFileItemInfo">
                        <a className="workFileItem-name">名称</a>
                        <a className="workFileItemEstablish-author">创建者</a>
                        <a className="workFileItemmodify-time" onClick={this.changeSort}>
                            更新时间
                            <Icon type={sort} className="workFileItemmodify-time-sort-icon"/>
                        </a>
                    </div>
                </div> : null }
                <div id="ThumbnailView-Or-ListView">
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
 
export default withRouter(connect(mapStateToProps,null)(WorksNav));