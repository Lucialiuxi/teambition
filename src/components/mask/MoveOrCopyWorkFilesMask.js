import { Modal, Icon } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as workAction from '@/actions/workAction.js';
import { GetAllWorksFileUnderParentWorksFileServer ,
         GetAWorksFileInformationByIdServer,
         MoveOrCopyOneWorkFileServer,
         MoveOrCopyOneGroupWorkFilesServer
     } from '@/server/requestData.js';
import classnames from 'classnames';
import cookie from 'react-cookies';

//移动和复制 work文件的弹框
class MoveOrCopyWorkFilesMask extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
          visible: false,//控制弹框的显示
          title:'',//弹框的类型
          WorkFilesMenuListDataId:[],//显示的每一组WorkFilesMenuList里面li的parentId
          currentfileId:0,//当前所在的项目文件
          openFirstLiHighLight:[]//点击移动的文件所在文件以及所有父级都高亮
      }
  }
  componentWillMount(){ 
    
    //把当前所在的项目文件下的数据存到reducer中
    let { 
      location: { pathname }, 
      state:{ worksFile , WorkFileMoveAndCopyMaskData },
      saveAGroupOfSameParentIdWorkFilesAction,
      oneFileData
    } = this.props;
    let { WorkFilesMenuListDataId:abc } = this.state;
    let pathArr = pathname.split('/');
    let currentfileId = pathArr[2]*1;
    if(this._Mounted){
      this.setState({ 
        currentfileId:currentfileId
      })
    }
    if(pathArr.length===4){//显示顶层的work文件
      saveAGroupOfSameParentIdWorkFilesAction({ ParentId: '' , arr:worksFile });
      if(oneFileData){
        abc.push(oneFileData.myId);
        if(this._Mounted){
          this.setState({
            WorkFilesMenuListDataId:abc
          })
        }
      }
    }else if(pathArr.length===5){
      saveAGroupOfSameParentIdWorkFilesAction({ ParentId: pathArr[4]  ,  arr:worksFile });
      let AllKey = Object.keys(WorkFileMoveAndCopyMaskData);
      if(oneFileData){
        AllKey = AllKey.concat(oneFileData.myId);
        if(AllKey[0]===''){
          AllKey = AllKey.filter(val => val !== '');
        }
      }
      if(this._Mounted){
        this.setState({
          WorkFilesMenuListDataId:AllKey
        })
      }
    }
  }
  shouldComponentUpdate(nextProps){
    return true;
  }

  //点击 个人项目，查询项目文件下的work文件
  clickToSearchWorkFilesInsideAprojectFile = (e) => {
    let { 
      showTopLevelWorkFilesAction,
       } = this.props;
    let t = e.target;
    if(t.nodeName !== 'LI') return;
    let pUl = t.parentNode;
    let Lis = pUl.getElementsByTagName('li');
    this.setState({
      openFirstLiHighLight:[]
    })
    let WorkFilesMenuItems = pUl.parentNode.nextElementSibling.getElementsByClassName('WorkFilesMenuItem active');
    Array.from(WorkFilesMenuItems).forEach(val=>{
      val.classList.remove('active');
    })
    Array.from(Lis).forEach(val=>{
      val.classList.remove('active');
    })
    t.classList.add('active');
    let fileId = t.dataset.id*1;
    GetAllWorksFileUnderParentWorksFileServer({fileId,parentId:''}).then(({data})=>{
      if(data.success){
        showTopLevelWorkFilesAction({ ParentId: '' , arr:data.data })
      }
    })
    if(this._Mounted){
      this.setState({
        currentfileId:fileId
      }) 
    }
  }

  chooseWorkFile = (e) => {//点击WorkFilesMenuList下的li
      let t = e.target;
      let { state:{WorkFileMoveAndCopyMaskData } , 
            location: {pathname} ,
            pushAWorkFilesMenuListAction ,
            UpdateWorkFileMoveAndCopyMaskDataAction
          } = this.props;
      let { WorkFilesMenuListDataId , openFirstLiHighLight } = this.state;
      let arr=[];
      for(let attr in WorkFileMoveAndCopyMaskData){ 
          arr.push(WorkFileMoveAndCopyMaskData[attr])
      }
      if(t.nodeName==="UL") return;
      let pUl = t.parentNode;
      let Lis = pUl.getElementsByTagName('li');
      Array.from(Lis).forEach(val=>{
        val.classList.remove('active');
      })
      t.classList.add('active');
      let fileId = pathname.match(/\d+/g)[0]*1;

      let highlightli = document.getElementsByClassName('projectFileMenuItem active')[0];
      if(highlightli){
        fileId = highlightli.dataset.id*1;
      }
      let len = arr.length;
      let clickedLiId = t.dataset.id;//当前被点击的li的id
      let ulId = t.parentNode.dataset.id;//当前被点击的li的父级ul的data-id
      //如果父级的id不存在，就说明是最后一组ul的里，就查询被点击的li的id,存到reducer对象里面，
      //如果存在，就把循环看点击的ul是第几个ul，然后把之后的几组数据删掉，在把查询的li的数据存起来
      //记录找到的ul是第几个
      let num = -1; 
      let index = -1;
      for(let attr in WorkFileMoveAndCopyMaskData){
        num++;
        if(attr===ulId){
          if(document.getElementsByClassName('WorkFilesMenuList')[0].dataset.id===document.getElementsByClassName('WorkFilesMenuList')[1].dataset.id){
            index=-1;
          }else{
            index = num;
          }
        }
      }
      GetAllWorksFileUnderParentWorksFileServer({fileId,parentId: clickedLiId }).then(({data})=>{
        if(data.success){
          if(index===-1){//如果父级的id不存在，就说明是最后一组ul的里，就查询被点击的li的id,存到reducer对象里面
            pushAWorkFilesMenuListAction({ ParentId: clickedLiId , arr:data.data }) 
          }else{//如果存在，就把循环看点击的ul是第几个ul，然后把之后的几组数据删掉
            UpdateWorkFileMoveAndCopyMaskDataAction({ ulDataId:ulId , ParentId:clickedLiId, arr:data.data })
          }
        }
      })
      openFirstLiHighLight.splice(len-1)
      WorkFilesMenuListDataId.splice(len-1);
      WorkFilesMenuListDataId.push(t.dataset.id);
      this.setState({
        WorkFilesMenuListDataId,
        openFirstLiHighLight
      })
  }
  //移动和复制 work文件的弹框 显示
  showModal = (myId,e) => {
    let { state:{worksFilrCrumb,WorkFileMoveAndCopyMaskData}} = this.props;
    this.WorkFileMoveAndCopyMaskData = WorkFileMoveAndCopyMaskData;
    let arr = []
    worksFilrCrumb.forEach(val=>{
      arr.push(val.myId)
    })
    if(myId){
      arr.push(myId)
    }
    if(this._Mounted){
      this.setState({
        openFirstLiHighLight:arr
      })
    }
    let t = e.target;
    if(t.classList.contains('moveCheckedWorkFile') || 
      t.classList.contains('moveCheckedWorkFileIcon')
    ){
      if(this._Mounted){
        this.setState({
          title:'移动'
        })
      }
    }else if(t.classList.contains('copyCheckedWorkFile') || 
            t.classList.contains('copyCheckedWorkFileIcon')
    ){
      if(this._Mounted){
        this.setState({
          title:'复制'
        })
      }
    }
    if(this._Mounted){
      this.setState({
        visible: true,
      })
    }
  }

  handleOk = async (myId,e) => {
    let { title , openFirstLiHighLight } = this.state;
    let { closeWorkFileMoveAndCopyMaskAction ,
          AWorkFileAlreadyMovedAction , 
          AGroupWorkFileAlreadyMovedAction,
          location:{pathname}
        } = this.props;
    let username= cookie.load('UserName');
    let ARR = pathname.split('/');
    let oldFileId = ARR[2]*1;
    let oldParentId;
    if(ARR.length===4){
      oldParentId = '';
    }else{
      oldParentId = ARR[4];
    }
    if(openFirstLiHighLight[0]){
      let a = openFirstLiHighLight.find(val=>val===myId)
      if(a){
        return
      }
    }
    let HightLightWorkFilesLi = document.getElementsByClassName('WorkFilesMenuItem active');
    let HightLightProjectFileId = document.getElementsByClassName('projectFileMenuItem active')[0].dataset.id*1;
    if(!HightLightWorkFilesLi[0]){//移动到某个项目文件夹的顶层的时候
      if(myId && oldParentId!==HightLightProjectFileId){//移动一个通过myId 复制OR移动 --> parentId 和 fileId
        if(title==='移动'){
          let Move = await MoveOrCopyOneWorkFileServer({ 
              username , 
              myId , 
              keyWord:'移动' , 
              NewfileId: HightLightProjectFileId , 
              NewParentId:'' ,
              lastestModifyTime: Date.now()
            })
            if(Move.data.success){
              AWorkFileAlreadyMovedAction(Move.data.data.myId)
            }
        }else if(title==='复制'){
          MoveOrCopyOneWorkFileServer({ 
            username , 
            myId , 
            keyWord:'复制' , 
            NewfileId: HightLightProjectFileId , 
            NewParentId:'' ,
            lastestModifyTime: Date.now() 
          })
        }
      }else if(!myId && oldParentId!==HightLightProjectFileId){//群组操作
        if(title==='移动'){
          let MoveGroup = await MoveOrCopyOneGroupWorkFilesServer({ 
            username , 
            fileId: oldFileId , 
            parentId:oldParentId , 
            keyWord: '移动' , 
            NewfileId: HightLightProjectFileId , 
            NewParentId:'' ,
            lastestModifyTime:Date.now()
          })
          if(MoveGroup.data.success){
            AGroupWorkFileAlreadyMovedAction()
          }
        }else if(title==='复制'){
          MoveOrCopyOneGroupWorkFilesServer({ 
            username , 
            fileId: oldFileId , 
            parentId:oldParentId , 
            keyWord: '移动' , 
            NewfileId: HightLightProjectFileId , 
            NewParentId:'' ,
            lastestModifyTime:Date.now()
          })
        }
      }
    }else{
      let destinationWorkFileId = HightLightWorkFilesLi[HightLightWorkFilesLi.length-1].dataset.id;
      let a = Array.from(HightLightWorkFilesLi);
      let sss = true;
      for(let i = 0; i < a.length-1; i++){
        if(a[i].dataset.id===myId){//如果目的地文件夹是文件夹所在文件或者子孙文件都不移动
          sss = false
        }
      }
      let GetAWorksFileInformationById = await GetAWorksFileInformationByIdServer({myId:destinationWorkFileId});
      let dworkfile = GetAWorksFileInformationById.data.data;
      let {myId:nmyId,fileId} = dworkfile;//目的地文件夹

      if(myId && sss){//移动一个通过myId 复制OR移动 --> parentId 和 fileId
        if(title==='移动'){
          let Move = await MoveOrCopyOneWorkFileServer({ 
              username , 
              myId , 
              keyWord:'移动' , 
              NewfileId: fileId , 
              NewParentId:nmyId ,
              lastestModifyTime: Date.now()
            })

            if(Move.data.success){
              AWorkFileAlreadyMovedAction(Move.data.data.myId)
            }
        }else if(title==='复制'){
          MoveOrCopyOneWorkFileServer({ 
            username , 
            myId , 
            keyWord:'复制' , 
            NewfileId: fileId , 
            NewParentId:nmyId ,
            lastestModifyTime: Date.now() 
          }).then(({data})=>{
            if(data.success){
              this.findAllChildWorkFiles(myId,oldFileId,fileId,nmyId)
            }
          })
        }
      }else if(!myId && sss){//群组操作
        if(title==='移动'){
          let MoveGroup = await MoveOrCopyOneGroupWorkFilesServer({ 
            username , 
            fileId: oldFileId , 
            parentId:oldParentId , 
            keyWord: '移动' , 
            NewfileId: fileId , 
            NewParentId:nmyId ,
            lastestModifyTime:Date.now()
          })
          if(MoveGroup.data.success){
            AGroupWorkFileAlreadyMovedAction()
          }
        }else if(title==='复制'){
          MoveOrCopyOneGroupWorkFilesServer({ 
            username , 
            fileId: oldFileId , 
            parentId:oldParentId , 
            keyWord: '复制' , 
            NewfileId: fileId , 
            NewParentId:nmyId ,
            lastestModifyTime:Date.now()
          })
        }
      }
    }
    
    closeWorkFileMoveAndCopyMaskAction(this.WorkFileMoveAndCopyMaskData)
    if(this._Mounted){
      this.setState({
        visible: false,
      })
    }
  }

  findAllChildWorkFiles = (myId,fileId,newFileId,newParentId) => {
    let username= cookie.load('UserName');
    GetAllWorksFileUnderParentWorksFileServer({
      username , 
      fileId: fileId,
      parentId: myId 
    }).then(({data})=>{
      console.log(data)
    })
  }

  handleCancel = (e) => {
    let { closeWorkFileMoveAndCopyMaskAction } = this.props;
    closeWorkFileMoveAndCopyMaskAction(this.WorkFileMoveAndCopyMaskData)
    if(this._Mounted){
      this.setState({
        visible: false,
      })
    }
  }

  componentDidMount(){
    this._Mounted=true;
  }
  componentWillUnmount(){
    this._Mounted=false;
  }
  render() {
    let { title , visible , WorkFilesMenuListDataId , openFirstLiHighLight } = this.state;
    let { checkedCount , 
          insideLi , 
          oneFileData,
          location:{pathname},
          state:{ getFileInfo , WorkFileMoveAndCopyMaskData , worksFilrCrumb},
        } = this.props;
    let arr=[];
    for(let attr in WorkFileMoveAndCopyMaskData){ 
        arr.push(WorkFileMoveAndCopyMaskData[attr])
    }
    let currentfileId = pathname.match(/\d+/g)[0]*1;
    if(!WorkFilesMenuListDataId[0]){
      worksFilrCrumb.forEach(val=>{
        if(WorkFilesMenuListDataId.indexOf(val.myId)===-1){
          WorkFilesMenuListDataId.push(val.myId)
        }
      })
    }
    if(getFileInfo[0]){
      getFileInfo = getFileInfo.filter(val=>!val.inRecycleBin)
    }
    return (
      <div className="MoveOrCopyWorkFilesMaskWrap"> 
        { (oneFileData && insideLi) || checkedCount>0 ?
          <div className="moveAndCopyWorkFileWrap">
            <span className="moveCheckedWorkFile"  onClick={this.showModal.bind(this,oneFileData?oneFileData.myId:null)} >
                <Icon type="profile" className="moveCheckedWorkFileIcon" title={insideLi ? "移动文件夹" : ""} />
                {insideLi ? '' : '移动'}
            </span>
            <span className="copyCheckedWorkFile"  onClick={this.showModal.bind(this,oneFileData?oneFileData.myId:null)} >
                <Icon type="copy" className="copyCheckedWorkFileIcon" title={insideLi ? "复制文件夹" : ""} />
                {insideLi ? '' : '复制'}
            </span>
          </div> 
        : null}
        {visible ? <Modal
          className="MoveOrCopyWorkFilesMask"
          title={`${title}${checkedCount}个文件夹  至`}
          visible={this.state.visible}
          onOk={this.handleOk.bind(this,oneFileData?oneFileData.myId:null)}
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
                                  className={classnames({'projectFileMenuItem':true,'active':val.fileId===currentfileId})}
                                  key={val.fileId}
                                  data-id={val.fileId}
                                >{val.FileName}</li>
                    })}
                  </ul>
              </div>
              <div className="WorkFilesMenuWrap">
                <div className="WorkFilesMenu">
                    {arr.map((val,index)=>{ 
                      return <ul 
                                className="WorkFilesMenuList" 
                                key={index} 
                                data-id={WorkFilesMenuListDataId[index]}
                                onClick={this.chooseWorkFile}
                              >
                              {
                                val.map((e,i)=>{
                                  return <li  
                                            className={classnames({"WorkFilesMenuItem":true, 'active':e.myId===openFirstLiHighLight[index] })}
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