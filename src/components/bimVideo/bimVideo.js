import React, { Component } from 'react';
import styles from './index.less';
import { Modal, Form, Input, Upload, message, Button, Icon, Table, Tooltip, } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
/**
 * 视频监控模块
 */
class BimVideoModel extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
      const { onShow } = this.props
      const openModal = () =>{
        debugger
        console.log("打开模态框")
        document.getElementById("identification_modal_box").style.zIndex = 10;
        onShow();
        
      }
    return (
        <div style={{width:'100%',height:"100%",background:'#fff',display:'flex',justifyContent:"center",alignItems:'center'}}>
          <p style={{fontSize:18, height:'250px',width:'250px',borderRadius:'50%',background:'#4b85fc',color:'#fff',border:'1px solid #000',lineHeight:'250px',textAlign:'center',cursor:'pointer'}} onClick={openModal}>
              点击打开视频上传模态框
          </p>
        </div>
    )
  }
}

export default Form.create()(BimVideoModel);
