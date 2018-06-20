import React, { Component } from 'react';
import { Checkbox , Icon } from 'antd';


class WorksNav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    render() { 
        return ( 
            <div className="worksNavWrap">
                <div className="worksNavLeft">
                    <Checkbox onChange={this.onChange}/>
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
                </div>
            </div>
         )
    }
}
 
export default WorksNav;