import React, { Component } from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';

//--------编辑子任务标签--------
class EditableTagGroup extends Component {
  state = {
    tags: ['添加标签'],
    inputVisible: false,
    inputValue: '',
  };

  //删除标签
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
    if(tags.length===1){
      document.getElementsByClassName('addTag')[0].style.display = 'inline-block';//显示 ‘添加标签’
      document.getElementsByClassName('goToAddTagIcon')[0].style.display = 'none'//隐藏 圆圈加号icon
    }
  }

  //显示数据标签的输入框
  showInput = (e) => {
    document.getElementsByClassName('addTag')[0].style.display = 'none';
    this.setState({ inputVisible: true }, () => this.input.focus());
  }
  //数据标签的输入框受控change事件
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
//数据标签的输入框失去焦点隐藏
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }
  goToShowAddTagIcon = () => {//显示圆圈加号icon
    document.getElementsByClassName('goToAddTagIcon')[0].style.display = 'inline-block';
    document.getElementsByClassName('addTag')[0].style.display = 'none';
  }
  saveInputRef = input => this.input = input;
  componentDidMount(){///先隐藏圆圈加号icon
    document.getElementsByClassName('goToAddTagIcon')[0].style.display = 'none'
  }
  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div className="tag-text">
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag className='addTag' onClick={this.goToShowAddTagIcon} color="blue" key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip  title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            className="setSubTaskTagInput"
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus-circle-o" onClick={this.showInput} className="goToAddTagIcon"/>
          </Tag>
        )}
      </div>
    );
  }
}
 
export default EditableTagGroup;