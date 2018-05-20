import React, { Component } from 'react';
import { Modal, Button } from 'antd';

function warning() {
    Modal.warning({
      title: '移到回收站',
      content: '一旦将项目「ddd」移到回收站, 所有与项目有关的信息将会被移到回收站。请谨慎对待！',
      className:'moveFileToRecycleBin',
      okText:'移动到回收站'
    });
  }

  class moveFileToRecycleBin extends Component {
      constructor(props) {
          super(props);
          this.state = {  }
      }
      render() { 
          return ( 
              <div>
                  <Button onClick={warning}>移到回收站</Button>
              </div>
           )
      }
  }
   
  export default moveFileToRecycleBin;