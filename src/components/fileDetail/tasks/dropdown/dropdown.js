
// 下拉列表菜单
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import MoveOrCopySubTask from './moveOrCopySubTask';
import DeleteSubTaskOrDeleteTaskItem from './deleteSubTaskOrDeleteTaskItem';
import * as allActions  from '@/actions/action';
import classnames from 'classnames';
import { CreateANewTaskItemServer , ModifyATaskItemNameServer } from '@/server/requestData';

/**
 * 以下列表是否显示的【标识】：
    * 编辑任务列表 isModifyTaskItem
    * 在此后添加新任务列表 addATaskItemAfterThis
    * 移动本列表所有任务 moveAllSubTasksFromThisToOther
    * 复制本列表所有任务 copyAllSubTasksInsideThis
    * 清空本列表所有任务 deleteAllSubTasksInsideThis
    * 删除任务列表 deleteThisTaskItem
 */
let listData = [
    {
        iconType:'edit',
        title:'编辑列表',
        index:1
    },
    {
        iconType:'plus',
        title:'在此后添加新列表',
        index:2
    },
    {
        iconType:'edit',
        title:'移动本列表所有任务',
        index:3
    },
    {
        iconType:'copy',
        title:'复制本列表所有任务',
        index:4
    },
    {
        iconType:'delete',
        title:'清空本列表所有任务',
        index:5
    },
    {
        iconType:'delete',
        title:'删除列表',
        index:6
    },
]

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentDropDownType:''//当前下拉编辑的是哪一项
         }
    }
    //点击下拉列表菜单跳到下一级编辑框
    clickToNextMenu=(e)=>{
        let { dispatch , taskItemInfo:{taskItemId}} = this.props;
        let t = e.target
        if(!t.classList.contains('modifyItem')){
            t = e.target.parentNode;
        }
        let w = t.innerText;
        if(w==='编辑列表'){
            dispatch(allActions.ModifyTaskItemAction(taskItemId))
            this.setState({
                currentDropDownType:'编辑列表'
            })
        }else if(w==='在此后添加新列表'){
            dispatch(allActions.addATaskItemAfterThisAction(taskItemId));
            this.setState({
                currentDropDownType:'在此后添加新列表'
            })
        }else if(w==='移动本列表所有任务'){
            dispatch(allActions.moveAllSubTasksFromThisToOtherAction(taskItemId));
            this.setState({
                currentDropDownType:'移动本列表所有任务'
            })
        }else if(w==='复制本列表所有任务'){
            dispatch(allActions.copyAllSubTasksInsideThisAction(taskItemId));
            this.setState({
                currentDropDownType:'复制本列表所有任务'
            })
        }else if(w==='清空本列表所有任务'){
            dispatch(allActions.deleteAllSubTasksInsideThisAction(taskItemId));
            this.setState({
                currentDropDownType:'清空本列表所有任务'
            })
        }else if(w==='删除列表'){
            dispatch(allActions.deleteThisTaskItemAction(taskItemId));
            this.setState({
                currentDropDownType:'删除列表'
            })
        }
    }
    //返回下拉列表框主页
    goToshowDropDownContainerMainList=()=>{
        let { dispatch , taskItemInfo:{taskItemId}} = this.props;
        dispatch(allActions.showDropDownContainerMainListAction(taskItemId));
    }
    //点击X关闭下拉菜单
    goToCloseDropDownContainer=()=>{
        let { dispatch , taskItemInfo:{taskItemId}} = this.props;
        dispatch(allActions.HideTaskItemDropDownContainerAction(taskItemId));
        
    }
    componentDidUpdate(){
        let { taskItemInfo:{taskItemName}} = this.props;
        if(this.MTaskItemInput){
            this.MTaskItemInput.focus()
            if(this.state.currentDropDownType==='编辑列表'){
                this.MTaskItemInput.value = taskItemName;
            }
        }   
    }
    //确认->新建一个taskItem/修改name
    confirmModifyTaskItemOrAddNewOne = () => {
        let { 
            dispatch , 
            taskItemInfo:{ taskItemName , index , fileId , taskItemId },
            state
        } = this.props;
        let { currentDropDownType } = this.state;
        let val = this.MTaskItemInput.value.trim();
        switch (currentDropDownType){
            case '编辑列表':
                if(val!==taskItemName){
                    ModifyATaskItemNameServer({fileId,taskItemId,taskItemName:val}).then(({data})=>{
                        if(data.success===true){
                            dispatch(allActions.HideTaskItemDropDownContainerAction('close'))
                            dispatch(allActions.ModifyATaskItemNameAction({taskItemId,taskItemName:val}))
                        }
                    })
                }
            break;
            case '在此后添加新列表':
                if(val!==''){
                    let allTaskItemIndexData= state.taskItemInfo.map(val=>val.index);
                    console.log(allTaskItemIndexData)
                    //新建的项目列表index是前一个和后一个index的中间值，如果是最后一个，就是当前index+1
                    let currentIndex = allTaskItemIndexData.indexOf(index)
                    console.log(currentIndex)
                    let newIndex;
                    if(allTaskItemIndexData[currentIndex+1]){
                        newIndex = (allTaskItemIndexData[currentIndex] + allTaskItemIndexData[currentIndex+1])/2
                    }else{
                        newIndex = allTaskItemIndexData[currentIndex] + 1
                    }
                    //可以添加新列表
                    CreateANewTaskItemServer({fileId,index:newIndex,taskItemName:val}).then(({data})=>{
                        dispatch(allActions.CreateATaskItemAction(data.newTaskItemData))
                        dispatch(allActions.HideTaskItemDropDownContainerAction('close'))
                    })
                }

            break;
            default:
                return null;
        }
    }
    //新建或修改taskItem的taskItemName 框的input的onchange事件
    MTaskItemInputChange = () => {
        if(this.state.currentDropDownType==='在此后添加新列表'){
           if(this.MTaskItemInput.value.trim()!==''){
                this.MTaskItemInput.nextElementSibling.classList.remove('add');
           }
           if(this.MTaskItemInput.value.trim()===''){
                    this.MTaskItemInput.nextElementSibling.classList.add('add');
            }
        }
    }
    render() {
        let { dispatch , taskItemInfo:{
                addATaskItemAfterThis,
                copyAllSubTasksInsideThis,
                deleteAllSubTasksInsideThis,
                deleteThisTaskItem,
                isModifyTaskItem,
                moveAllSubTasksFromThisToOther,
                fileId,
                taskItemId
            }} = this.props;
        let b = !(addATaskItemAfterThis ||
                copyAllSubTasksInsideThis ||
                deleteAllSubTasksInsideThis ||
                deleteThisTaskItem ||
                isModifyTaskItem ||
                moveAllSubTasksFromThisToOther)
         
        let btnName = '';
        let menuTitile = '列表菜单';
        this.btnclassname= classnames({
            'saveModifyInputValueBtn':isModifyTaskItem,
            'createATaskItemBtn':addATaskItemAfterThis,
            'add':true
        })
        if(isModifyTaskItem){
            btnName = '保存';
            menuTitile = '编辑列表';
        }else if(addATaskItemAfterThis){
            btnName = '创建';
            menuTitile = '添加列表';
        }else if(moveAllSubTasksFromThisToOther){
            menuTitile = '移动本列表所有任务';
        }else if(copyAllSubTasksInsideThis){
            menuTitile = '复制本列表所有任务';
        }else if(deleteAllSubTasksInsideThis){
            menuTitile = '清空任务';
        }else if(deleteThisTaskItem){
            menuTitile = '删除列表';
        }
        return ( 
            <div id="dropdown-container">
                {/* 列表菜单没有className  编辑列表M_TaskItem 添加列表Add_TaskItem*/}
                <header className="M_TaskItem">
                    <Icon type="left"  onClick={this.goToshowDropDownContainerMainList}/>
                    <h4 className="dropdown_title">{menuTitile}</h4>
                    <Icon type="close"  onClick={this.goToCloseDropDownContainer}/>
                </header>
                <hr/>
                <ul className="modifyDetailList">
                    {b && listData.map(val=>{
                        return <li className="modifyItem" key={val.index} onClick={this.clickToNextMenu}>
                                    <Icon type={val.iconType} />
                                    {val.title}
                                </li>
                    })}
                </ul>
                {/* 编辑或添加列表 */}
                {/* saveModifyInputValueBtn-->保存按钮 createATaskItemBtn-->创建按钮 */}
                { (isModifyTaskItem || addATaskItemAfterThis) ? <div className="MOrAddListTaskItem">
                    {addATaskItemAfterThis?<p className="createATaskItemText">新列表将被添加在当前列表之后</p>:null}
                    <input 
                        type="text" 
                        className="MTaskItemInput add" 
                        placeholder="列表名称"
                        ref={node=>this.MTaskItemInput=node}
                        onChange={this.MTaskItemInputChange}
                    />
                    <button 
                        className={this.btnclassname}
                        onClick={this.confirmModifyTaskItemOrAddNewOne}
                    >{btnName}</button>
                </div> : null}
                {/* 移动 或 复制 任务 */}
                {(copyAllSubTasksInsideThis || moveAllSubTasksFromThisToOther) ? <MoveOrCopySubTask taskItemId={taskItemId}/> : null}
                 {/* 删除列表所有任务 或者 删除列表 */}
                { (deleteAllSubTasksInsideThis ||deleteThisTaskItem) ? 
                    <DeleteSubTaskOrDeleteTaskItem
                    {...{deleteAllSubTasksInsideThis,
                         deleteThisTaskItem,
                         fileId,
                         taskItemId,
                         dispatch}}
                    /> : null }
            </div>
         )
    }
}
const mapStateToProps = state => {
    return  {
        state
    }
}
export default connect(mapStateToProps,null)(DropDown);