import Axios from 'axios';
import qs from 'qs';
import { browswerHistory } from 'dva/router';
import { message } from 'antd';
Axios.defaults.timeout = 600000; // 模型解析及pw文件传输耗时较长
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios.defaults.withCredentials = true;

var request = function(type, url, params, isToast, responseType = 'json'){
  type = type || 'get';
  if (!url) throw new Error('请指定url');
  var obj = {};
  params = Object.prototype.toString.call(params) === '[object Object]' ? params : {};

  if(type === 'get'){
    obj.method = 'get';
    obj.url = url;
    obj.params = params;
    obj.responseType = responseType;
  }else if(type === 'post'){
    obj.method = 'post';
    obj.url = url;
    params = qs.stringify(params);
    obj.data = params;
    obj.responseType = responseType;
  }else{
    throw new Error('请指定请求方式');
  }
  var instance = Axios.create();
//   当创建实例的时候，拦截器放在default无效
  instance.interceptors.request.use(config=>{
    //不能使用null，否则会将token的值变成'null'

    if (window.app && window.app._store && window.app._store.getState().global){
      config.headers['Authorization'] = window.app._store.getState().global.token || "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiJkYjAwZTQ1M2VkNTM0NWQ2OWJlZTYyNTNhZTBiMTgxZSIsImVtYWlsIjoiMTM3NTE0MzAwMDFAcXEuY29tIiwibmFtZSI6IuS4muS4uzLnlKjmiLdBIiwidXNlcm5hbWUiOiJ5ejJ5aGEiLCJwaG9uZU51bWJlciI6IjEzNzUxNDMwMDAxIiwiYWNjb3VudFR5cGUiOiJQRVJTT05BTCIsInVzZXJJZCI6ImQ0NzdmNWQ2ZWU0MTRkYzU4MTY5NmNmZGI4NjFiZTU1IiwiY29tcGFueUlkIjoiYWU1NjgzMzE0ZTVjNDhiM2I4ZWIxZGYyZGFjNGM2ZmEiLCJjb21wYW55TmFtZSI6IuaWsOS4muS4uzI0NSIsImV4cCI6MTU0ODY1MjE5Nn0.AHrvx3ISNmFLWtvCik6kSl2SqS96h98skYWfLGPPsVM";
    }
    return config;
  }, error=> {
    return Promise.reject(error);
  });
  instance.interceptors.response.use(response=> {
    return response;
  }, error=> {
    return Promise.reject(error);
  });

  var __promise = new Promise((resolve, reject)=>{
    instance.request(obj).then(res=>{
        debugger
      if(res.status == 200){
    	/**
         * 如果返回的事blob 则直接返回
         */
        if(res.data instanceof Blob){
          return resolve(res);
        }
        /**
         * 无权限处理
         */
        if(res.data.code == 401){
        	return window.app._store.dispatch({type:'global/getUngrantInfo'});
        }

        /**
         * 有权请求
         */
        if(res.data.code == '200' || res.data.code == '201' || res.data.code == '202' || res.data.code == '204'){
          isToast && message.info(res.data.message && res.data.message || '请求成功');
          return resolve(res.data);
        }else{
          isToast && message.warning(res.data.message && res.data.message || '请求错误');
          return resolve(res.data);
        }
      }
      message.error('请求失败');
      reject(res.data);
    }, err=>{
      let parseError = JSON.parse(JSON.stringify(err));
      let code = parseError.response.status;
      if (isToast){
    	  if(code == 401){
        	  return window.app._store.dispatch({type:'global/getUngrantInfo'});
          }
          if(code >= 400 && code <500 && code != 401){
            message.error('客户端异常');
          }
        if(code >=500){
          message.error('服务端异常');
        }
        if(code == 'ECONNABORTED'){
          message.error('请求超时');
        }
      }
      reject(code);
    })
    .catch(e=>{
      console.log(e)
      message.error('异常');
      reject('异常');
    });
  });
  return __promise;
}

export default request;
