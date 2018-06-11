import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import FileItem from './fileItem';
import FileItemInRecyCleBin from './fileItemInRecycleBin';
import CreateFile from './CreateFile';
import './file.css';

  
class FileCover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RecycleFlieIsShow:null
        }
    }
    //控制回收站的显示
    ToggleRecycleFlieShow=()=>{
        let { RecycleFlieIsShow } = this.state;
        this.setState({
            RecycleFlieIsShow:!RecycleFlieIsShow
        })
    }
    render() { 
        let { RecycleFlieIsShow } = this.state;
        let { state , clickInToTheFile } = this.props;
        let myOwnProjects =  state.getFileInfo.filter(val=>{
            return val.inRecycleBin ? null : val;
        });
        //把点击进入文件夹的函数加入每一条数据我拥有的项目的数据
        myOwnProjects.forEach(val=>{
            val['clickInToTheFile'] = clickInToTheFile;
        })
        let recycledProjects =   state.getFileInfo.filter(val=>{
            return val.inRecycleBin ? val : null;
        });
        let recycled;
        if(RecycleFlieIsShow){
            recycled =  recycledProjects.map((val,i)=>{
                return <FileItemInRecyCleBin  key={val.fileId+i} {...val}/>
            })
        }
        let starProjects = state.getFileInfo.filter(val=>{
            return val.star&&(!val.inRecycleBin) ? val : null;
        });
        return ( 
            <div  className="fileCover">
                <div className="starFlies">
                    <h2>
                        <span className="title">星标项目</span>
                    </h2>
                    <ul className="myOwnfiles">
                    {
                        starProjects.map((val,i)=>{
                            return <FileItem key={val.fileId+i} {...val}/>
                        })
                    }
                    </ul>
                </div>
                <div className="myOwnFlies">
                    <h2>
                        <span className="title">我拥有的项目</span>
                    </h2>
                    <ul className="myOwnfiles">
                    {
                        myOwnProjects.map((val,i)=>{
                            return <FileItem  key={val.fileId+i} {...val}/>
                        })
                    }
                    <CreateFile />
                    </ul>
                </div>
                <div className="recycledFlies">
                    <h2>
                        <span className="title">项目回收站</span>
                        <span className="switchIsShow" onClick={this.ToggleRecycleFlieShow}>{RecycleFlieIsShow?'隐藏':'显示'}</span>
                    </h2>
                    <ul className="myOwnfiles">{recycled}</ul>
                </div>
            </div>
         )
    }
}
 //要修改的数据
 const mapStateToProps = state => {
    return  {
        state
    }
  }
 
export default withRouter(connect(mapStateToProps,null)(FileCover));