import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs ,Icon} from 'antd';
import { withRouter } from 'react-router-dom';
import Groupchat from '@/components/fileDetail/groupchat/groupchat';
import Posts from '@/components/fileDetail/posts/posts';
import Schedules from '@/components/fileDetail/schedules/schedules';
import Tasks from '@/components/fileDetail/tasks/tasks'
import Works  from '@/components/fileDetail/works/works';
// import routes from '@/router/router';

const TabPane = Tabs.TabPane;

class SubNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey:this.props.activeBar,
            fileName:'',
            myFileData:[]
        }
    }
    goToFileCoverPage=(ev)=>{
        // console.log(this.props)
        let { history } = this.props;
        history.push('/projects')
    }
    tabToOther=(activeKey)=>{
        // console.log(activeKey,this.props)
        //点击项目详情分类名字的时候传 【点击的项目详情分类名字、数字  文件id】 --到Project组件中
        let { match , tabBar } = this.props;
        // let fileId = match.params.undefined;
        let t = '';
        if( activeKey==='1' || activeKey==='' ){
            t = 'tasks';
            this.setState({
                activeKey:'1'
            })
        }else if(activeKey==='2'){
            t = 'posts';
            this.setState({
                activeKey:'2'
            })
        }else if(activeKey==='3'){
            t = 'works';
            this.setState({
                activeKey:'3'
            })
        }else if(activeKey==='4'){
            t = 'schedules';
            this.setState({
                activeKey:'4'
            })
        }else if(activeKey==='5'){
            t = 'groupchat';
            this.setState({
                activeKey:'5'
            })
        }
        // console.log(t,this.state.fId)
        tabBar(t,activeKey,this.state.fId);
    }
    componentWillMount(){
        console.log(this.props)
        let id = this.props.match.params.undefined;
        if(id){
            this.setState({
                fId:this.props.match.params.undefined
            })
        }
    }
    render() {
        console.log(this.state.fId)
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
                <Tabs 
                    id="subNavTab" 
                    activeKey={this.state.activeKey}
                    onChange={this.tabToOther}
                >
                    <TabPane tab="任务" key="1" >
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
 
export default withRouter(connect()(SubNav));