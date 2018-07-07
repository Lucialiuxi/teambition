import { Spin, Icon } from 'antd';
import React, { Component } from 'react';
const antIcon = <Icon type="loading" style={{ fontSize: 100 }} spin />;

class ProjectHomeLoading  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <Spin indicator={antIcon} /> )
    }
}
 
export default ProjectHomeLoading;