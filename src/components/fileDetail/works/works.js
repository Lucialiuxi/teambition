import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import './works.css';
import WorkHead from './workHead.js';
import WorksNav from './worksNav.js';
import WorkFileBox from './workFileBox.js';
import cookie from 'react-cookies';
import * as allAction from '@/actions/workAction.js';
/**
    username: String,
    fileId: Number,
    parentId: String,//最外层文件是‘’
    myId: String,
    workFileName: String,
    lastestModifyTime: Number
 */

class Works extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount(){
        let { location: { pathname } , getBreadCrumbAction } = this.props;
        if(pathname.split('/').length===4){
            if(cookie.load('BreadCrumb')){
                // console.log('移除')
                cookie.remove('BreadCrumb',{ path: '/' })
            }
        }else{
            let BreadCrumb = cookie.load('BreadCrumb');
            getBreadCrumbAction(BreadCrumb)
        }
    }
    shouldComponentUpdate(nextProps){
        let { location: { pathname } } = nextProps;
        if(pathname.split('/').length===5){
            let newBreadCrumb = [];
            let BreadCrumb = cookie.load('BreadCrumb');
           if(BreadCrumb){
                newBreadCrumb = nextProps.state.worksFilrCrumb; 
                if(newBreadCrumb[0]){
                    cookie.save('BreadCrumb',newBreadCrumb,{ path: '/' });
                }
            }else{
                newBreadCrumb = nextProps.state.worksFilrCrumb;
                if(!BreadCrumb || newBreadCrumb[0]){
                    cookie.save('BreadCrumb',newBreadCrumb,{ path: '/' });
                }
            }
        }else{
            if( (nextProps.state.worksFilrCrumb === this.props.state.worksFilrCrumb) && this.props.state.worksFilrCrumb[0]){
                return false;
            } 
        }
        return true;
    }
    componentDidMount(){
        let { toHideDelteCoverAction , toHideModifyWorkFileMenuCoverAction } = this.props;
        //鼠标点击的不是 li删除定位框deleteCover的时候，关闭它
        document.onclick = (e) =>{
            let t = e.target;
            let deleteCoverTag = (//删除文件夹定位框
                t.classList.contains('delteWorkFileCover-Wrap') ||
                t.classList.contains('delteWorkFileCover-Head') ||
                t.classList.contains('delteWorkFileCover-leftIcon') ||
                t.classList.contains('delteWorkFileCover-Title') ||
                t.classList.contains('delteWorkFileCover-closeIcon') ||
                t.classList.contains('delteWorkFileCover-Content') ||
                t.classList.contains('delteWorkFileCover-Tip') ||
                t.classList.contains('delteWorkFile-ConfirmBtn')  ||
                t.classList.contains('ModifyItemToolsDeleteIcon') )

            let ModifyMenuCoverTag = (//文件夹菜单定位框
                t.getAttribute('id') === 'ModifyMenuCoverWrap' ||
                t.classList.contains('ModifyMenuCover-head') ||
                t.classList.contains('ModifyMenuCover-head-title') ||
                t.classList.contains('ModifyMenuCover-closeIcon') ||
                t.classList.contains('ModifyMenuCover-content') ||
                t.classList.contains('ModifyMenuList') ||
                t.classList.contains('ModifyMenuList-MoveIcon') ||
                t.classList.contains('ModifyMenuList-title') ||
                t.classList.contains('ModifyMenuList-DeleteIcon') ||
                t.classList.contains('check-frame-downIcon') ||
                t.classList.contains('ModifyMenuList-CopyIcon') ||
                t.classList.contains('MoveOrCopyWorkFilesMaskWrap') ||
                t.classList.contains('moveAndCopyWorkFileWrap') ||
                t.classList.contains('moveCheckedWorkFile') ||
                t.classList.contains('copyCheckedWorkFile') ||
                t.classList.contains('moveCheckedWorkFileIcon') ||
                t.classList.contains('copyCheckedWorkFileIcon') ||
                t.classList.contains('MoveOrCopyWorkFilesMaskWrap') ||
                t.classList.contains('moveAndCopyWorkFileWrap') ||
                t.classList.contains('moveCheckedWorkFile') ||
                t.classList.contains('moveCheckedWorkFileIcon') ||
                t.classList.contains('copyCheckedWorkFile') ||
                t.classList.contains('copyCheckedWorkFileIcon') ||
                t.classList.contains('MoveOrCopyWorkFilesMask')
            )
            let MoveAndCopyMaskTag =(//移动和复制弹框
                t.classList.contains('MoveOrCopyWorkFilesMaskContent') ||
                t.classList.contains('projectFileMenuContainer') ||
                t.classList.contains('projectFileMenuTitle') ||
                t.classList.contains('projectFileMenuList') ||
                t.classList.contains('projectFileMenuItem') ||
                t.classList.contains('projectFileMenuItem active') ||
                t.classList.contains('WorkFilesMenuWrap') ||
                t.classList.contains('WorkFilesMenu') ||
                t.classList.contains('WorkFilesMenuList') ||
                t.classList.contains('WorkFilesMenuItem') ||
                t.classList.contains('WorkFilesMenuItem active') ||
                t.classList.contains('ant-modal-content') ||
                t.classList.contains('ant-modal-header') ||
                t.classList.contains('ant-modal-title') ||
                t.classList.contains('ant-modal-body') ||
                t.classList.contains('ant-modal-footer')
            )
            if(!ModifyMenuCoverTag && !deleteCoverTag && !MoveAndCopyMaskTag){//隐藏文件夹菜单的显示框
                toHideModifyWorkFileMenuCoverAction()
            }
            if(!deleteCoverTag && !ModifyMenuCoverTag){//隐藏确认删除文件夹定位框
                toHideDelteCoverAction()
            }
        }
    }
    render() {
        let { 
                location:{ pathname } , 
                state:{worksViewType}
            } = this.props;
        // console.log(worksViewType)
        let tp =  worksViewType.worksViewType;
        let arr = pathname.split('/');
        let parentId = '';
        if(arr.length===4){
            parentId = '';
        }else if(arr.length===5){
            parentId = arr[4];
        }
        let fileId = arr[2]*1;
        return (
            <div className="WorksOverFlowDiv" >
                {
                    tp && <div id="WorksWrap">
                        <WorkHead  {...{fileId , currentParentId:parentId}}/>
                        <WorksNav tp={ tp }/>
                        <WorkFileBox  {...{ tp }}/>
                    </div> 
                }
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Works));
