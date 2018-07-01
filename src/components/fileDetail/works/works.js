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
                console.log('移除')
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
        let { toHideDelteCoverAction } = this.props;
        //鼠标点击的不是 li删除定位框deleteCover的时候，关闭它
        document.onclick = (e) =>{
            let t = e.target;
            let deleteCoverTag = (
                t.classList.contains('delteWorkFileCover-Wrap') ||
                t.classList.contains('delteWorkFileCover-Head') ||
                t.classList.contains('delteWorkFileCover-leftIcon') ||
                t.classList.contains('delteWorkFileCover-Title') ||
                t.classList.contains('delteWorkFileCover-closeIcon') ||
                t.classList.contains('delteWorkFileCover-Content') ||
                t.classList.contains('delteWorkFileCover-Tip') ||
                t.classList.contains('delteWorkFile-ConfirmBtn')  ||
                t.classList.contains('ModifyItemToolsDeleteIcon') )
            if(!deleteCoverTag){
                toHideDelteCoverAction()
            }
        }
    }
    render() {
        let { 
                location:{ pathname } , 
                state:{worksViewType}
            } = this.props;
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
