//点击 ‘移动本列表所有任务’ OR ‘复制本列表所有任务’ 的项目显示的上一层定位框
import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';

class ShowFileNameCover extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    clickToCopyAndMovewhichFileItem = (e) => {
        let { changeFileDestination } = this.props;
        let t = e.target;
        let FIid,FName;
        if(t.nodeName==="DIV"){
            t = e.target.parentNode;
        }else if(t.nodeName==="I"){
            t = e.target.parentNode.parentNode;
        }
        if(t.nodeName==='LI'){
            FIid = t.dataset.id;
            FName = t.innerText.trim();
        }
        changeFileDestination(FIid,FName)
    }
    render() {
        let { state:{getFileInfo} , fileId:id } = this.props;
        let starFile = getFileInfo.filter(val=>val.star===true)
        let nostarFile = getFileInfo.filter(val=>val.star===false)
        let allNoStarFiles = starFile.map(val=>{
                    return <li key={val.fileId}  className="no-star-File" data-id={val.fileId}>
                                <div className="divWrap">
                                    {val.FileName}
                                    {id===val.fileId ? <Icon type="check"  className="checkFileNameIcon"/> : null}
                                </div>
                            </li>
                })
        return ( 
            <div id="ShowFileNameCoverIndropDownContainer">
                 <input type="text" className="searchFileNameInput" placeholder="查找项目"/>
                 <div className="ShowFileNameWrap" onClick={this.clickToCopyAndMovewhichFileItem.bind(this)}>
                    {starFile[0] ? <section className="no-star-File-wrap">
                        <p className="title">星标项目</p>
                        <ul className="all-no-star-Files">
                            {allNoStarFiles}
                        </ul>
                    </section> : null}
                    <section className="star-File-wrap">
                        <p className="title">非星标项目</p>
                        <ul className="all-star-Files">
                        {nostarFile.map(val=>{
                            return <li key={val.fileId} className="star-File" data-id={val.fileId}>
                                        <div className="divWrap">
                                            {val.FileName}
                                            {id===val.fileId ? <Icon type="check"  className="checkFileNameIcon"/> : null}
                                        </div>
                                    </li>
                        })}
                        </ul>
                 </section>
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
export default connect(mapStateToProps,null)(ShowFileNameCover);