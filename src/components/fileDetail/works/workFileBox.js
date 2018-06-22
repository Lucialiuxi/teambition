import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WorkFileItem from './ListView/workFileItem.js'
import EmptyWorkFile from './ListView/emptyWorkFile.js';
import ThumbNailWorkFileItem from './ThumbnailView/ThumbnailworkFileItem.js';

class WorkFileBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let { tp , state:{ worksFile } } = this.props;
        return (
            <ul className="workFilesWrap">
                <div className="forScrollBar">
                    { worksFile && worksFile[0] && tp === 'ListView' ? <WorkFileItem/> : null }
                    { worksFile && worksFile[0] && tp === 'ThumbnailView' ? <ThumbNailWorkFileItem/> : null }
                    {/* <EmptyWorkFile/> */}
                </div>
            </ul>  
            )
    }
}
const mapStateToProps = (state) => {
     return {
        state
     }
 }
export default withRouter(connect(mapStateToProps,null)(WorkFileBox));