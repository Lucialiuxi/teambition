import React, { Component } from 'react';
import { BrowserRouter as Router, Route , withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import FileItem from './fileItem'
import CreateFile from './CreateFile'
import './file.css'

  
class FileCover extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let {fileInfoData} = this.props;
        // console.log(fileInfoData)
        return ( 
            <div  className="fileCover">
                <div className="starFlies">
                    <h2>
                        <span className="title">星标项目</span>
                    </h2>
                    <ul className="myOwnfiles">
                       
                    </ul>
                </div>
                <div className="myOwnFlies">
                    <h2>
                        <span className="title">我拥有的项目</span>
                    </h2>
                    <ul className="myOwnfiles">
                    {
                        fileInfoData.map((val,i)=>{
                            return <FileItem  key={val.fileId+i} {...val}/>
                        })
                    }
                    <CreateFile />
                    </ul>
                </div>
                <div className="recycledFlies">
                    <h2>
                        <span className="title">项目回收站</span>
                        <span className="switchIsShow">显示</span>
                    </h2>
                    <ul className="myOwnfiles">
                    </ul>
                </div>
            </div>
         )
    }
}

export default FileCover;