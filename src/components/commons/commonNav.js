import React, { Component } from 'react';
import { withRouter , Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { getAllFilesInfo } from '@/server/requestData.js';
import { Icon , List, Avatar } from 'antd';
import * as workAction from '@/actions/workAction.js';
import { bindActionCreators } from 'redux';

const ProjectTypes = [
    {
      title: '项目',
      avatar:<Icon type="folder-open" style={{ fontSize: 20, color: '#aeaeae' }} />
    },
    {
      title: '任务',
      avatar:<Icon type="check-square-o" style={{ fontSize: 20, color: '#aeaeae' }} />
    },
    {
      title: '文件',
      avatar:<Icon type="file" style={{ fontSize: 20, color: '#aeaeae' }} />
    }
  ];

  class CommonNav extends Component {
      constructor(props) {
          super(props);
          this.state = { 
              searchResultArr:[]

           }
      }
      clickLoginOut=()=>{
          let { history } = this.props;
          let allCookies = cookie.loadAll();
          for(let attr in allCookies){
              cookie.remove(attr, { path: '/' })
          }
          history.replace('/login')
      }
      GoToOtherPath = (e) => {//跳转路由
        let t = e.target;
        let { location: {pathname} , 
              history , 
              hideOrShowProjectTypeSelectAction 
            } = this.props;
        if(t.classList.contains('ProjectTypeSelect') ||
           t.classList.contains('ant-spin-nested-loading') ||
           t.classList.contains('ant-spin-container')
        ){
          return;  
        }else if(t.classList.contains('ant-list-item-meta-avatar')
        ){
            t = t.nextElementSibling;
        }else if(t.nodeName==='I'){
            t = t.parentNode.nextElementSibling;
        }
        let nextPath = '';
        if(t.innerText.trim()==='项目' && pathname!=='/projects'){
            nextPath = `/projects`;
        }else if(t.innerText.trim()==='任务' && pathname.indexOf('works')!==-1){
            let fileId = pathname.match(/\d+/g)[0]*1;
            nextPath = `/project/${fileId}/tasks`;
        }else if(t.innerText.trim()==='文件' && pathname.indexOf('tasks')!==-1){
            let fileId = pathname.match(/\d+/g)[0]*1;
            nextPath = `/project/${fileId}/works`;
        }
        if(nextPath){
            history.push(nextPath);
        }
        hideOrShowProjectTypeSelectAction({ProjectTypeSelectIsShow:false})
      }
      showOrHideProjectTypeSelect = () => {
        let { hideOrShowProjectTypeSelectAction , state:{worksViewType:{ProjectTypeSelectIsShow}} } = this.props;
        hideOrShowProjectTypeSelectAction({ProjectTypeSelectIsShow:!ProjectTypeSelectIsShow})
      }
      componentDidMount(){
        this._mouted = true;
        document.onclick = (e) => {
            let {hideOrShowSearchBoxAction,hideOrShowProjectTypeSelectAction} = this.props;
            let t = e.target;
            if(t.classList.contains('anticon-search') ||
                t.classList.contains('searchProject') ){
                hideOrShowSearchBoxAction({isShow:true})
            }else{
                hideOrShowSearchBoxAction({isShow:false})
                if(this._mouted){
                    this.setState({
                        searchResultArr:[]
                    })
                }   
                if(document.getElementsByClassName('searchProject')&&
                  document.getElementsByClassName('searchProject')[0]
                ){
                    document.getElementsByClassName('searchProject')[0].value = '';
                }
            }
            if( !(t.classList.contains('ProjectTypeSelect') ||
                t.classList.contains('ant-spin-nested-loading') ||
                t.classList.contains('ant-spin-container') ||
                t.classList.contains('ant-list-item') ||
                t.classList.contains('ant-list-item-meta ProjectTypeItem') ||
                t.classList.contains('ant-list-item-meta-avatar') ||
                t.classList.contains('ant-list-item-meta-content')  ||
                t.classList.contains('anticon-folder-open')  ||
                t.classList.contains('ant-list-item-meta-title') ) && !t.classList.contains('extendBtn')){
                    hideOrShowProjectTypeSelectAction({ProjectTypeSelectIsShow:false})
            }
        }
      }
      componentWillUnmount(){
        this._mouted = false;
      }

      searchOnKeyUp = async (e) => {
        let {hideOrShowSearchBoxAction} = this.props;
        let username= cookie.load('UserName');
        let val = e.target.value.trim();
        if(!val && this._mouted){
            this.setState({
                searchResultArr:[]
            })
        }else{
            hideOrShowSearchBoxAction({isShow:true})
            let data = await getAllFilesInfo({userLoginName:username});
            if(data.data.success){
                let arr = data.data.AllFilesInfoData;
                let fitArr = arr.filter(el => {
                    if(el.FileName.indexOf(val)!==-1){
                        return el
                    }
                    return null;
                });
                if(this._mouted){
                    this.setState({
                        searchResultArr:fitArr
                    })
                }
            }
        }
      }
      componentWillReceiveProps(nextProps){
        let { location:{pathname} } = nextProps;
        if(this.props.location.pathname !== pathname){
            this.setState({
                currentFileId:pathname.match(/\d+/g)[0]*1,
                searchResultArr:[]
            })
        }
    }
      render() { 
          let { searchResultArr } = this.state;
          let { state:{worksViewType:{searchBoxShow,ProjectTypeSelectIsShow}} } = this.props;
          let user = cookie.load('UserName');
          return ( 
            <div className="commonNav">
                <div className="Nav-bar-left">
                    <div className="search-bar">
                        <Icon type="search"/>
                        <input 
                            type="text" 
                            className="searchProject" 
                            placeholder="搜索个人项目"
                            onKeyUp={this.searchOnKeyUp.bind(this)}
                        />
                        {searchBoxShow ? <ul className="search_result" >
                            {
                                searchResultArr.map(val=>{
                                    return <li key={val.fileId} className="resultItem">
                                                <Link to={`/project/${val.fileId}/tasks`} className="linka">{val.FileName}</Link>
                                           </li>
                                })
                            }
                        </ul> :null}
                    </div>
                    {/* 下拉选择项目 */}
                    <Icon 
                        type="plus-circle"  
                        className="extendBtn"
                        style={{ fontSize: 20, color: '#3b93ff' }} 
                        onClick={this.showOrHideProjectTypeSelect}
                    />
                    { ProjectTypeSelectIsShow ? <List
                        className="ProjectTypeSelect"
                        itemLayout="horizontal"
                        dataSource={ProjectTypes}
                        renderItem={item => (
                        <List.Item  onClick={this.GoToOtherPath}>
                            <List.Item.Meta
                            className="ProjectTypeItem"
                            avatar={item.avatar}
                            title={<a>{item.title}</a>}
                            />
                        </List.Item>
                        )}
                    /> : null }
                </div>
                <div  className="Nav-bar-right">
                    <span className="userAvatar">
                        <Avatar size="large" icon="user" />
                    </span>
                    <span className="loginOut" onClick={this.clickLoginOut}>登出</span>
                    <span className="mine">你好，{user}~~</span>
                </div>
            </div>
           )
      }
  }
  
const mapStateToProps = (state) => {
    return {
        state
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(workAction,dispatch)
}
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CommonNav));