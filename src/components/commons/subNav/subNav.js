import React, { Component } from 'react';
import { Tabs ,Icon} from 'antd';
import { withRouter } from 'react-router-dom';
import Groupchat from '@/components/projectPage/fileDetail/groupchat';
import Posts from '@/components/projectPage/fileDetail/posts';
import Schedules from '@/components/projectPage/fileDetail/schedules';
import Tasks from '@/components/projectPage/fileDetail/tasks'
import Works  from '@/components/projectPage/fileDetail/works';

const TabPane = Tabs.TabPane;

class SubNav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    goToFileCoverPage=(ev)=>{
        console.log(this.props)
        let { history } = this.props;
        history.push('/projects')
    }
    render() {
        return (
            <div id="subNavWrap">
                <div id="subNavLeftTool">
                    <span onClick={this.goToFileCoverPage}>首页</span>
                    <Icon type="right" />
                    <span>
                        项目文件名
                        <Icon type="down" style={{ fontSize: 12}} />
                    </span>   
                    <Icon type="star" />
                </div>
                <Tabs id="subNavTab">
                    <TabPane tab="任务" key="1">
                        <Tasks/>
                    </TabPane>
                    <TabPane tab="分享" key="2">
                        <Posts/>
                    </TabPane>
                    <TabPane tab="文件" key="3">
                        <Works/>
                    </TabPane>
                    <TabPane tab="日程" key="4">
                        <Schedules/>
                    </TabPane>
                    <TabPane tab="群聊" key="5">
                        <Groupchat/>
                    </TabPane>
                </Tabs>
            </div> 
         )
    }
}
 
export default withRouter(SubNav);