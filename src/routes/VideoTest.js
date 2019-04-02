import React from 'react';
import { connect } from 'dva';

import  {BimVideo,BimVideoModal}  from "../components/bimVideo/index"

const VideoTest = (obj) => {
  const { location, dispatch, videoUpload  } = obj
    const modalProps = {
        canVisibie: videoUpload.canVisibie,
        onShow:()=>{
            dispatch({
                type:'videoUpload/showModal',
                payload:{}
            })
        },
        uploadVideo: (file)=>{
            dispatch({
                type:'videoUpload/setState',
                payload:{"file":file}
            })
            dispatch({
                type:'videoUpload/upload',
                payload:{file}
            })
        },
        saveVIdeoID:(id,time) =>{
            debugger
            console.log("id====>>>>",id,"time=======>>>>",time)
        }
        
    }

    const videoProps = {
        onShow:()=>{
            dispatch({
                type:'videoUpload/showModal',
                payload:{}
            })
        }
    }

  return (
    <div style={{width:"100%",height:'100%'}}>
        <BimVideo {...videoProps}/>
        {/*标示模态框挂载容器  */}
        <div id="identification_modal_box" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',boxSizing:'border-box',zIndex:-1,background:"rgba(0,0,0,0.35)"}}></div>
        <BimVideoModal {...modalProps}/>
    </div>
  );
}

function mapStateToProps({ videoUpload }) {
  return { videoUpload };
}
export default connect(mapStateToProps)(VideoTest);
let arr=[{"id":1,"tmp":'aa'},{"id":2,"tmp":'cd'}]
arr.map(item=>{
    delete item.tmp
})
console.log(arr)