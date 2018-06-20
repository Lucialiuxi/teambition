
import React from 'react';
import WorkFileItem from './workFileItem.js'

class WorkFileBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <ul className="workFilesWrap">
                <WorkFileItem/>
            </ul>  
            )
    }
}
 
export default WorkFileBox;