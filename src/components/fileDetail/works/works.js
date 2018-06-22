import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './works.css';
import WorkHead from './workHead.js';
import WorksNav from './worksNav.js';
import WorkFileBox from './workFileBox.js';


class Works extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    //点击创建文件夹
    GoToCreateAWorkFile = () => {
        console.log(555)
    }
    render() {
        let { state:{worksViewType}} = this.props;
        let tp =  worksViewType.worksViewType;
        return (
            <div>
                {
                    tp && <div id="WorksWrap">
                        <WorkHead {...{GoToCreateAWorkFile:this.GoToCreateAWorkFile}}/>
                        <WorksNav tp={tp}/>
                        <WorkFileBox  tp={tp}/>
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return  {
        state
    }
} 
export default withRouter(connect(mapStateToProps,null)(Works));
