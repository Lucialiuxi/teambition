import React from 'react';
import './works.css';
import WorkHead from './workHead.js';
import WorksNav from './worksNav.js';
import WorkFileBox from './workFileBox.js';


class Works extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div id="WorksWrap">
                <WorkHead/>
                <WorksNav/>
                <WorkFileBox/>
            </div>
        )
    }
}
 
export default Works;