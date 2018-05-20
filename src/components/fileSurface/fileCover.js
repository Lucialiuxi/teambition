import React, { Component } from 'react';
import { BrowserRouter as Router, Route , withRouter } from 'react-router-dom'

import FileItem from './fileItem'
import NewFile from './newFile'
import './file.css'
const FileCoverData = [
    {
      title: 'Title 1',
      subTitle:'subTitle',
      fileId:1
    },
    {
      title: 'Title 2',
      subTitle:'subTitle',
      fileId:2
    },
    {
      title: 'Title 3',
      subTitle:'subTitle',
      fileId:3
    },
    {
      title: 'Title 4',
      subTitle:'subTitle',
      fileId:4
    },
  ];
  
class FileCover extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log(FileCoverData)
        return ( 
            <div>
                <div className="starFlies">
                    <h2>
                        <span className="title">星标项目</span>
                    </h2>
                    <ul className="myOwnfiles">
                        {
                            FileCoverData.map(val=>{
                                return <FileItem key={val.fileId}  {...val}/>
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
                        FileCoverData.map(val=>{
                            return <FileItem  key={val.fileId} {...val}/>
                        })
                    }
                    <NewFile />
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