import React from 'react';
import { connect } from 'react-redux';
import { 
    withRouter ,    
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import FileInside from '@/components/fileDetail/fileInside';
import { bindActionCreators } from 'redux';
import WorkFileItem from './ListView/workFileItem.js';
import EmptyWorkFile from './ListView/emptyWorkFile.js';
import ThumbNailWorkFileItem from './ThumbnailView/ThumbnailworkFileItem.js';
import { GetAllWorksFileUnderParentWorksFileServer } from '@/server/requestData.js';
import * as allAction from '@/actions/workAction.js';

class WorkFileBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    async componentWillMount(){
        let { location:{ pathname } , GetAllWorksFileUnderParentWorksFileAction } = this.props;
        let arr = pathname.split('/');
        let fileId = arr[2]*1;
        let parentId = '';
        if(arr[arr.length-1]!=='works'){
            parentId = arr[arr.length-1]
        }
        let data = await GetAllWorksFileUnderParentWorksFileServer({
            fileId,parentId
        })
        if(data.data.success){
            GetAllWorksFileUnderParentWorksFileAction(data.data.data)
        }
        
    }
    render() { 
        let { tp , state:{ worksFile , worksViewType:{forCreate,sortByModifyTime} }} = this.props;
        //按照时间排序
        if(sortByModifyTime==='ascend'){//最新创建的排在最前
            worksFile = worksFile.sort((a,b)=>{
                return b.lastestModifyTime - a.lastestModifyTime
            })
        }else if(sortByModifyTime==='descend'){//创建时间最长的在最前
            worksFile = worksFile.sort((a,b)=>{
                return a.lastestModifyTime - b.lastestModifyTime
            })
        }
        return (
            <ul className="workFilesWrap">
                <div className="forScrollBar">
                    {forCreate ? <WorkFileItem forCreate={forCreate}/> : null}
                    { worksFile && worksFile[0] && tp === 'ListView' ? 
                        worksFile.map(val=>{
                            return <WorkFileItem key={val.myId} oneFileData={val} /> 
                        })
                    : null }
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
const  mapDispatchToProps = (dispatch) => {
    return bindActionCreators(allAction,dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorkFileBox));