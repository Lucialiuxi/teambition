import React , { Component } from 'react';
import {  Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EmptyWorkFile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div id="emptyWorkFileWrap">
                <Icon type="meh-o"  className="emptyWorkFileIcon"/>
                <br/>
                文件夹中还没有内容哦
            </div>
          )
    }
}
const mapStateToProps = (state) => {
    return {
       state
    }
}
export default withRouter(connect(mapStateToProps,null)(EmptyWorkFile));