import React, { Component } from 'react';
import styles from './index.less';
import { Modal, Form, Input, Upload, message, Button, Icon, Table, Tooltip,  } from 'antd';
import axios from "axios";
import * as comFun from "../../utils/commonFunction"
import * as uploadFun from "../../utils/uploadFunction"

const FormItem = Form.Item;
const { TextArea } = Input;
/**
 * 视频监控模块
 */
class BimVideoModal extends React.Component {
  constructor() {
    super();
    this.state = {
        timeout: "",
        partSize: "",
        parallel: "",
        retryCount: "",
        retryDuration: "",
        region: "cn-shanghai",
        userId: "1303984639806000",
        file: null,
        videoFileList:[],
        fileList:[],
        authProgress: 0,
        uploadDisabled: true,
        resumeDisabled: true,
        pauseDisabled: true,
        statusText: ""
    }
  }
  componentWillReceiveProps=(newProps)=>{
    let {canVisibie} = newProps
    if(canVisibie){
      // var player = new Aliplayer({
      //   id: 'J_prismPlayer',
      //   width: '100%',
      //   height: '100%',
      //   autoplay: true,
      //   source : "http://video.gcnao.cn/44ffbb9ac3d24f0cb1b0d19b2353be6c/1359ffca4a56428088b5418615df09a0-bf827dd9ac1cfd86e0299926024b398f-ld.m3u8"
      // })
    }
  }
  render() {
    const { getFieldDecorator,resetFields,validateFields} = this.props.form;
    const { canVisibie, onShow, uploadVideo,saveVIdeoID } = this.props
    /**视频模态框点击关闭 */
    const onCancel = () => {
      debugger
      document.getElementById("identification_modal_box").style.zIndex = -10;
      onShow();
    }
    const handleSubmit =() =>{
      let fileList = this.state.fileList;
      let videoFileList = this.state.videoFileList
      console.log('fileList=====>>>>>',fileList,"videoFileList=====>>>>>",videoFileList)
      if(videoFileList.length>0){
        if(this.uploader){
          this.uploader = null
        }
        let userData = '{"Vod":{}}';
        this.uploader = uploadFun.createUploader(saveVIdeoID);
        debugger
        videoFileList.map(file=>{
          this.uploader.addFile(file, null, null, null, userData);
        })
        this.uploader.startUpload();
      }
    }
    const onScrollHandle =() =>{
      // console.log("按钮灰色，点击无效")
    }
    const formItemLayout = {
      labelCol: { span: 1, },
      wrapperCol: { span: 22  },
    };
   const playaa = () =>{
     debugger
     document.getElementById("playBox").style.display = 'block'
      this.player = new Aliplayer({
        id: 'J_prismPlayer',
        width: '100%',
        height: '100%',
        autoplay: true,
        // source : "https://outin-58172bac132211e99ef100163e1c8a9c.oss-cn-shanghai.aliyuncs.com/sv/4a9e2b53-1687ddf4ebd/4a9e2b53-1687ddf4ebd.mp4?Expires=1548320787&OSSAccessKeyId=LTAIx2xjxmIyFov4&Signature=otmjbZlRGN3TVjsbcFI3%2FYMCzM0%3D",
        // source : 'http://video.gcnao.cn/f8e77d92596a42a7b908eb5f514ec00d/3815164e6d464be692cffc89cec15f86-5287d2089db37e62345123a1be272f8b.mp4'
        source : "http://video.gcnao.cn/f7538b9588234f459c74613823317cfd/a8e34b6233cb45f89dbee6f16dd09f0a-bb2e4821815b0bc0c34b609bc81fbaba-ld.m3u8"
      })
   }
   const stopaa = () =>{
    document.getElementById("playBox").style.display = 'none'
      if(this.player){
        this.player.dispose()
      }
   }
    const columns = [
      {
        title: "序号",
        key: 'xuhao',
        width:70,
        colSpan: 1,
        className:styles.center,
        render:(text, record,index)=><span title={index + 1}>{index + 1}</span>,
      },
      {
        title: '文件名称',
        dataIndex: 'name',
        key: 'name',
        width:"35%",
        colSpan: 1,
        className:styles.center,
        render:(text, record)=>{
          return <Tooltip placement="top" title={text}>
            <span >{text}</span>
          </Tooltip>
        }
      },
      {
        title: '文件格式',
        dataIndex: 'type',
        key: 'type',
        width:"10%",
        colSpan: 1,
        className: styles.center,
        render: (text, record) => {
          return <span title={text}>{text}</span>
        },
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        width:'35%',
        colSpan: 1,
        className: styles.center,
        render: (text, record) => {
          return <Form onSubmit={handleSubmit} layout="vertical" style={{marginBottom:10}}>
          <FormItem {...formItemLayout}>
              {
                getFieldDecorator("content"+record.id,{
                  initialValue:"",
                  // rules: [{ required: true, message: '' }],
                } )(<Input/>)
              }
            </FormItem>
          </Form>
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        colSpan: 1,
        className: styles.center,
        render: (text, record) => {
          return (
            <span>
              <Tooltip placement="top" title={"预览"}>
                <Icon type="play-circle" className={styles.icon}/>
              </Tooltip>
              <Tooltip placement="top" title={"删除"}>
                <Icon type="delete" className={styles.icon}/>
              </Tooltip>
            </span>
          )
        },
      },
    ];
    const annexData=[
      {
        "name":"附件1部分的空间撒谎附近看到沙发看机会多刷卡了房间里大家撒放卡兰蒂斯",
        "type":"mp4",
        "content":"1",
        "id":1
      },
      {
        "name":"附件2",
        "type":"mp4",
        "content":"2",
        "id":2
      },
      {
        "name":"附件3",
        "type":"mp4",
        "content":"3",
        "id":3
      },
      {
        "name":"附件4",
        "type":"mp4",
        "content":"4",
        "id":4
      },
      {
        "name":"附件5",
        "type":"mp4",
        "content":"5",
        "id":5
      },
      {
        "name":"附件6",
        "type":"mp4",
        "content":"5",
        "id":6
      },
    ]
    const uploadProps = {
      showUploadList:false,
      beforeUpload:file=>{
        file.tmpuid = "testID"
        debugger
          let fileList = this.state.fileList
          let videoFileList = this.state.videoFileList
          let name = file.name
          let type = file.type.split("/")
          debugger
          let tmpFile = {
            "name":name,
            "content":'',
            "type":type[0],
            "time":file.lastModified,
          }
          console.log(type[0])
          debugger
          if( type[0] == 'video'){
            videoFileList.push(file)
          }else{
            fileList.push(file)
          }
          this.setState({
            fileList,videoFileList
          })
        return false;
      },
    }
    const props = {
      showUploadList:false,
          beforeUpload:file=>{
              comFun.uploadLargeFile( [file],
              {},
              ()=>{},
                  ()=>{})
              return false
          }
    }
    return (
        <Modal
          visible={canVisibie}
          title={null}
          footer={null}
          maskClosable={true}
          // onCancel={onCancel}
          wrapClassName={"video_modal"}
          getContainer={() => document.getElementById('identification_modal_box')}
        >
        {1==1?
          <div>
            <div className={styles.Modal_title}>标示</div>
            <div className={styles.content_title}>
              <Form onSubmit={handleSubmit} layout="vertical" style={{marginBottom:10}}>
                <FormItem label="标题" style={{marginRight:50}} {...formItemLayout}>
                  {
                    getFieldDecorator("title",{
                      initialValue:"",
                      rules: [{ required: true, message: '' }],
                    } )(<Input/>)
                  }
                </FormItem>
                <FormItem label="描述" {...formItemLayout}>
                  {
                    getFieldDecorator("desc",{
                      initialValue:"",
                      rules: [{ required: true, message: '' }],
                    })(
                      <TextArea autosize={{ minRows: 4, maxRows: 4 }} />
                    )
                  }
                </FormItem>
              </Form>
            
            </div>
            <div style={{paddingLeft:" 10px" ,marginTop:"-20px"}}>
              上传附件：
              <Upload {...uploadProps}>
              {/* <Upload {...props}> */}
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
              {/*<input type="file" name="file" id="files" multiple onChange={e=>{fileChange(e)}}/>上传文件*/}
            </div>
          
            <div className={styles.annex_box}>
              <div className={styles.table1} onScroll={onScrollHandle}>
                <Table
                  columns={columns}
                  rowSelection={null}
                  pagination={false}
                />
              </div>
              <div className={styles.table}  onScroll={onScrollHandle}>
                <Table
                  columns={columns}
                  dataSource={annexData}
                  rowSelection={null}
                  rowKey={r => { r.id}}
                  pagination={false}
                  locale={{ emptyText: "暂无数据" }}
                  showHeader={false}
                />
              </div>
            </div>
            <div>
              <Button onClick={handleSubmit}>确定</Button>
              <Button onClick={onCancel}>取消</Button>
              <Button onClick={playaa}>播放</Button>

            </div>
          </div>:""
        }
        <div id="playBox" style={{background:"#000",width:'100%',height:'100%',position:'absolute',top:0,left:0,display:'none'}} >
        <div  class="prism-player" id="J_prismPlayer" style={{width:'100%',height:'100%',position:'relative'}}>
        <Button onClick={stopaa} style={{position:'absolute',right:20,top:20}}>关闭播放</Button>
        </div>
        </div>
        </Modal>
    )
  }
}

export default Form.create()(BimVideoModal);
