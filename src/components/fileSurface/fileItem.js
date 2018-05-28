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
    ClickFileItem=(ev)=>{//事件委托
        let target = ev.target;
        if(target.classList.contains('anticon-star')){
            //切换文件的标星
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
            ToggleFileStarServer({...this.props,star:isStar}).then(({data})=>{
                dispatch(ToggleFileStar(data.afterModifyData))
            })
        }
        //进入文件夹内部
        if(target.nodeName==="I") return;
        if(target.nodeName==="LI"){
            let { clickInToTheFile , fileId , userLoginName } = this.props;
            clickInToTheFile(fileId,userLoginName)
        }
    }
    render() { 
        // console.log(this.props)
        let { FileName , FileAbstract , fileId ,star } = this.props;
        if(!FileName){
            return null
        }
        let starClass = classnames('favorite',{'starActive':star})
        return ( 
                <li 
                    className="fileItem" 
                    data-id={fileId} 
                    onClick={this.ClickFileItem}
                >
                    {/* 编辑框 */}
                    <ModifyFileInfoMask {...this.props}/>
                    <Icon 
                        type="star"
                        className={starClass}
                    />
                    <h3>{FileName}</h3>
                    <h4>{FileAbstract}</h4>
                </li>
         )
    }
}
 
export default connect()(FileItem);