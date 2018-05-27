import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ModifyFileInfoMask from '@/components/mask/modifyFileInfoMask';
import { ToggleFileStar } from '@/actions/action';
import { ToggleFileStarServer } from '@/server/requestData'
class FileItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    //切换文件的标星
    clickToggleStar=(ev)=>{
        let { dispatch } = this.props;
        let star = ev.target;
        let isStar;
        if(star.classList.contains('starActive')){
            star.classList.remove('starActive')
            isStar = false;
        }else{
            star.classList.add('starActive')
            isStar = true;
        }
        console.log(this.props.fileId)
        ToggleFileStarServer({...this.props,star:isStar}).then(({data})=>{
            dispatch(ToggleFileStar(data.afterModifyData))
        })
    }
    render() { 
        let { FileName , FileAbstract , fileId ,star } = this.props;
        if(!FileName){
            return null
        }
        let starClass = classnames('favorite',{'starActive':star})
        return ( 
                <li className="fileItem" data-id={fileId}>
                    {/* 编辑框 */}
                    <ModifyFileInfoMask {...this.props}/>
                    <Icon 
                        type="star"
                        className={starClass}
                        onClick={this.clickToggleStar}
                    />
                    <h3>{FileName}</h3>
                    <h4>{FileAbstract}</h4>
                </li>
         )
    }
}
 
export default connect()(FileItem);