
import React from 'react';
import WorkFileItem from './ListView/workFileItem.js'
import EmptyWorkFile from './ListView/emptyWorkFile.js';
import ThumbNailWorkFileItem from './ThumbnailView/ThumbnailworkFileItem.js';

class WorkFileBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <ul className="workFilesWrap">
                <div className="forScrollBar">
                    {/* <WorkFileItem/> */}
                    {/* <EmptyWorkFile/> */}
                    {/* <ThumbNailWorkFileItem/> */}
                </div>
            </ul>  
            )
    }
}
 
export default WorkFileBox;