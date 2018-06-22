import React, { Component } from 'react';
import { Checkbox , Icon } from 'antd';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class WorksNav extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            viewType:'ListView'
         }
    }
    componentDidMount(){
        this.setState({
            viewType:this.props.tp
        })
    }
    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    render() { 
        let { viewType } = this.state;
        let cls1 = classnames('ThumbnailView-Icon',{'active':viewType==='ThumbnailView'});
        let cls2 = classnames('ListView-Icon',{'active':viewType==='ListView'});
        return ( 
            <div className="worksNavWrap">
                <Checkbox onChange={this.onChange} className="CheckAllBox"/>
                {/* <div className="worksNavWhenChecked">
                    <span className="alreadyCheckedCount">
                        已经选中5项
                    </span>
                    <span className="moveCheckedWorkFile">
                        <Icon type="profile" />
                        移动
                    </span>
                    <span className="copyCheckedWorkFile">
                        <Icon type="copy" />
                        复制
                    </span>
                    <span className="deleteCheckedWorkFile">
                        <Icon type="delete" />
                        删除
                    </span>
                </div> */}

                {/* <Icon type="caret-down" /> */}
                {/*  */}
                <div className="worksNavUnCheck">
                    <div className="workFileItemInfo">
                        <a className="workFileItem-name">名称</a>
                        <a className="workFileItemEstablish-author">创建者</a>
                        <a className="workFileItemmodify-time">
                            更新时间
                            <Icon type="caret-up" className="workFileItemmodify-time-sort-icon"/>
                        </a>
                    </div>
                </div>
                <div id="ThumbnailView-Or-ListView">
                    <Icon type="appstore-o" className={cls1} title="缩略图模式"/>
                    <Icon type="bars"  className={cls2} title="列表模式"/>
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
 
export default withRouter(connect(mapStateToProps,null)(WorksNav));