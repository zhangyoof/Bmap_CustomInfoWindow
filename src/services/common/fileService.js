import commonConfig from "@/config/common/commonConfig";
import listConfig from "@/config/element/listConfig";
import {message} from 'antd';
import Axios from "axios";

//提供文件上传和下载服务

export function uploadFile(file, url) {
  let formData = new FormData();
  formData.append('file', file);
  let obj = {
    method: 'post',
    url: url ? url : listConfig.api.uploadFile,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': window.app._store.getState().global.token || '',
    },
  }
  return Axios.create().request(obj)
    .then(res=> {
      if (res.status === 200) {
        let data = res.data;
        if (data.code === commonConfig.SUCCESS_CODE) {
          return data.data;
        } else {
          message.error( data.message);
          return "";
        }
      } else {
        console.log(res);
        message.error('上传文件错误');
        return "";
      }
    }).catch(err => {
      message.error('上传文件错误')
      console.log(err);
      return "";
    })
}


export function downloadFile(key, fileName, url) {
  let obj = {
    method: 'get',
    url: url ? url : listConfig.api.downloadFile + `?key=${key}&fileName=${fileName}`,
    responseType: "blob",
    headers: {
      'Authorization': window.app._store.getState().global.token || '',
    },
  }

  return Axios.create().request(obj).then(res=> {
    if (res.status == "200") {
      let evt = document.createEvent("MouseEvents");
      let a = document.createElement('a');
      a.href = URL.createObjectURL(res.data);
      a.download = fileName;
      evt.initEvent("click", true, true);     //注册单机事件
      a.dispatchEvent(evt);                    //元素绑定事件
    } else {
      message.error('请求失败');
    }
  }).catch(err => {
    let parseError = JSON.parse(JSON.stringify(err));
    /**
     * 无权限处理
     */
    let code = parseError.response.status;
    if (code == 401) {
      return window.app._store.dispatch({type: 'global/getUngrantInfo'})
    }
    /**
     * 客户端错误
     */
    if (code >= 400 && code < 500) {
      message.error('客户端异常');
    }

    /**
     * 服务端错误
     */
    if (code >= 500) {
      message.error('服务端异常');
    }

    /**
     * 超时终止
     */
    if (code == 'ECONNABORTED') {
      message.error('请求超时');
    }
  });
}
