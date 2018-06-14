//移动文件到回收站
import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import { MoveFileToRecycleBin } from '@/actions/action';
import { MoveFileToRecycleBinServer } from '@/server/requestData'

  class moveFileToRecycleBin extends Component {
      constructor(props) {
          super(props);
          this.state = {  }
      }
      warning=()=>{
        Modal.warning({
          title: '移到回收站',
          content: '一旦将项目「ddd」移到回收站, 所有与项目有关的信息将会被移到回收站。请谨慎对待！',
          className:'moveFileToRecycleBin',
          okText:'移动到回收站',
          maskClosable:true,
          onOk:()=>{
            MoveFileToRecycleBinServer({...this.props,inRecycleBin:true}).then(({data})=>{
              this.props.dispatch(MoveFileToRecycleBin(data.afterModifyData))

            })
          }
        });
        // setTimeout(()=>{
        //     let moveFileToRecycleBin = document.getElementsByClassName('moveFileToRecycleBin')[0];
        //     let confirmMoveFileToRecycleBinBtn =  moveFileToRecycleBin.getElementsByTagName('button')[1];
        // })
      }
      render() { 
        //   console.log(this.props)
          return ( 
              <div>
                  <Button 
                    onClick={this.warning}
                  >移到回收站</Button>
              </div>
           )
      }
  }
   
  export default moveFileToRecycleBin;