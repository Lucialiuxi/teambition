import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './works.css';
import WorkHead from './workHead.js';
import WorksNav from './worksNav.js';
import WorkFileBox from './workFileBox.js';
/**
    username: String,
    fileId: Number,
    parentId: String,//最外层文件是‘’
    myId: String,
    workFileName: String,
    lastestModifyTime: Number
 */

class Works extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let { state:{worksViewType}} = this.props;
        let tp =  worksViewType.worksViewType;
        return (
            <div>
                {
                    tp && <div id="WorksWrap">
                        <WorkHead />
                        <WorksNav tp={tp}/>
                        <WorkFileBox  {...{tp}}/>
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
