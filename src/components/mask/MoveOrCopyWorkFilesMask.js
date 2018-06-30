import { Modal, Icon } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { 
    withRouter
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as workAction from '@/actions/workAction.js';
import { GetAllWorksFileUnderParentWorksFileServer } from '@/server/requestData.js';
import classnames from 'classnames'

//移动和复制 work文件的弹框
class MoveOrCopyWorkFilesMask extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
          visible: false,//控制弹框的显示
          title:'',//弹框的类型
          activeWorkFileId:[],//目录显示的所在文件以及所有父级都高亮
          currentfileId:0,//当前所在的项目文件
        }
  }
  componentWillMount(){ 
    //把当前所在的项目文件下的数据存到reducer中
    let { location: {pathname} , 
      state:{ worksFile , WorkFileMoveAndCopyMaskData } ,
      saveAGroupOfSameParentIdWorkFilesAction,
      oneFileData
    } = this.props;
    let { activeWorkFileId:abc } = this.state;
    let pathArr = pathname.split('/');
    let currentfileId = pathArr[2]*1;
    this.setState({
      currentfileId:currentfileId
    })
    if(pathArr.length===4){
      saveAGroupOfSameParentIdWorkFilesAction({ ParentId: '' , arr:worksFile })
      if(oneFileData){
        abc.push(oneFileData.myId)
        this.setState({
          activeWorkFileId:abc
        })
      }
    }else if(pathArr.length===5){
      saveAGroupOfSameParentIdWorkFilesAction({ ParentId: pathArr[4]  ,  arr:worksFile })
      let AllKey = Object.keys(WorkFileMoveAndCopyMaskData)
      if(oneFileData){
        AllKey = AllKey.concat(oneFileData.myId);
        AllKey.shift()
      }
      this.setState({
        activeWorkFileId:AllKey
      })
    }
  }
  shouldComponentUpdate(nextProps){
    return true
  }

  //点击 个人项目，查询项目文件下的work文件
  clickToSearchWorkFilesInsideAprojectFile = (e) => {
    let { 
      saveAGroupOfSameParentIdWorkFilesAction, 
      showTopLevelWorkFilesAction,
      state:{ worksFile , WorkFileMoveAndCopyMaskData } ,
       } = this.props;
    let t = e.target;
    if(t.nodeName !== 'LI') return;
    let fileId = t.dataset.id*1;
    GetAllWorksFileUnderParentWorksFileServer({fileId,parentId:''}).then(({data})=>{
      if(data.success){
        showTopLevelWorkFilesAction({ ParentId: '' , arr:data.data })
      }
    })
    this.setState({
      currentfileId:fileId
    })
  }

  //移动和复制 work文件的弹框 显示
  showModal = (e) => {
    let t = e.target;
    if(t.classList.contains('moveCheckedWorkFile') || 
      t.classList.contains('moveCheckedWorkFileIcon')
    ){
      this.setState({
        title:'移动'
      })
    }else if(t.classList.contains('copyCheckedWorkFile') || 
            t.classList.contains('copyCheckedWorkFileIcon')
    ){
      this.setState({
        title:'复制'
      })
    }
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    let { title , visible , activeWorkFileId , currentfileId } = this.state;
    let { checkedCount , 
          insideLi , 
          CanCopyOrMove ,
          oneFileData,
          state:{ getFileInfo , WorkFileMoveAndCopyMaskData},
        } = this.props;
    let arr=[];
    for(let attr in WorkFileMoveAndCopyMaskData){ 
        arr.push(WorkFileMoveAndCopyMaskData[attr])
    }
    return (
      <div className="MoveOrCopyWorkFilesMaskWrap"> 
        {!CanCopyOrMove ?
          <div className="moveAndCopyWorkFileWrap">
            <span className="moveCheckedWorkFile"  onClick={this.showModal} >
                <Icon type="profile" className="moveCheckedWorkFileIcon" title={insideLi ? "移动文件夹" : ""} />
                {insideLi ? '' : '移动'}
            </span>
            <span className="copyCheckedWorkFile"  onClick={this.showModal} >
                <Icon type="copy" className="copyCheckedWorkFileIcon" title={insideLi ? "复制文件夹" : ""} />
                {insideLi ? '' : '复制'}
            </span>
          </div> 
        : null}
        {visible ? <Modal
          className="MoveOrCopyWorkFilesMask"
          title={`${title}${checkedCount}个文件夹  至`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <section id="MoveOrCopyWorkFilesMaskContent">
              <div className="projectFileMenuContainer">
                  <h3 className="projectFileMenuTitle">个人项目</h3>
                  <ul className="projectFileMenuList" onClick={this.clickToSearchWorkFilesInsideAprojectFile}>
                    {getFileInfo.map(val=>{
                        return <li 
                                  className={classnames({'projectFileMenuItem':true,active:val.fileId===currentfileId})}
                                  key={val.fileId}
                                  data-id={val.fileId}
                                >{val.FileName}</li>
                    })}
                  </ul>
              </div>
              <div className="WorkFilesMenuWrap">
                <div className="WorkFilesMenu">
                    {arr.map((val,index)=>{
                      return <ul className="WorkFilesMenuList" key={index} data-id={activeWorkFileId[index]}>
                              {
                                val.map((e,i)=>{
                                  return <li  
                                            className={classnames({"WorkFilesMenuItem":true, 'active':e.myId===activeWorkFileId[index] })}
                                            key={e.myId}
                                            data-id={e.myId}
                                          >{e.workFileName}</li>
                                })
                                
                              }
                            </ul> 
                    })}
              </div>
              </div>
          </section>
        </Modal> : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return  {
      state
  }
}

const  mapDispatchToProps = (dispatch) => {
  return bindActionCreators(workAction,dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MoveOrCopyWorkFilesMask));