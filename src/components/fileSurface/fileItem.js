    import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ModifyFileInfoMask from '@/components/mask/modifyFileInfoMask';
import { ToggleFileStar } from '@/actions/fileAction';
import { ToggleFileStarServer } from '@/server/requestData';
import {CustomeLink} from '@/commonfunc/';

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
        }else if(target.nodeName==="A"){//进入文件夹内部
            let { clickInToTheFile , fileId , userLoginName , FileName} = this.props;
            clickInToTheFile(fileId,userLoginName,FileName)
        }
    }
    render() {
        let { FileName , FileAbstract , fileId , star , goToFileCoverPage } = this.props;
        if(!FileName){
            return null
        }
        let starClass = classnames('favorite',{'starActive':star})
        return ( 
                <li 
                    className="fileItem"
                    onClick={this.ClickFileItem}
                >
                <CustomeLink 
                    path={`/project/${fileId}/tasks`}
                    data-id={fileId} 
                    to={`/project/${fileId}/tasks`}
                    event={goToFileCoverPage}
                >
                </CustomeLink>
                <div>
                    <ModifyFileInfoMask {...this.props}/>
                    <Icon 
                        type="star"
                        className={starClass}
                    />
                    <h3>{FileName}</h3>
                    <h4>{FileAbstract}</h4>
                </div>
                </li>
         )
    }
}
 
export default connect()(FileItem);