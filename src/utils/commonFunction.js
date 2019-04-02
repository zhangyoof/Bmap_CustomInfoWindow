import { Select } from 'antd';
import request from './request'
import _ from 'underscore';
import OSS from 'ali-oss';
const { Option } = Select;

export function tranKeyToVal(value, keys, vals) { // 转义键值
  // value: 需要转义的数据
  // keys : 转义所需要的所有数据源
  // vals : 转义所需要的所有数据结果
  // 数据源与数据结果均是对象，且对应转义键值的字段属性名要一致，数据结果要求有缺省字段defaults
  for (let [k, v] of Object.entries(keys)) {
     if (v === value) {
       return vals[k];
     }
   }
   return vals.defaults;
}

export function tranListToOption(list, keys, labels) { // 将数组转换为下拉框
  let node = [];
  if (Array.isArray(list)) {
    list.map((row, i) => {
      let { [keys]: key, [labels]: label } = row;
      node[node.length] = <Option key={key} value={key}>{label}</Option>;
    });
  }
  return node;
}

export function fillService (namespace,service) {
  for (let key in service) {
    service[key] = (data)=> {
      return {type: namespace + '/' + key, payload: data||{}};
    }
  }
};

export function keyValueOptionsBuild (list,keyName,valueName,disable=false) {
  var options = [];
  if (keyName && valueName){
    for (let index in list) {
      let one = list[index];
      options.push(<Option disabled={disable} key={one[keyName]} title={one[keyName]} value={one[keyName]}>{one[valueName]}</Option>)
    }
  }else {
    var keyArr = Object.getOwnPropertyNames(list).sort();
    for(let index in keyArr){
      let key = keyArr[index];
      let value = list[key];
      options.push(<Option disabled={disable} key={key} title={value}  value={key}>{value}</Option>)
    }
  }
  return options;
};

export function getFileTypeByFileName (fileName) {
  let lastDotIndex = fileName.lastIndexOf('.');
  let fileType = fileName.substr(lastDotIndex + 1,fileName.length);
  return fileType;
};

const loadScript = (()=>{
	  let idCache = {};
	  return async function(id,url,flush) {
	    if (idCache[id] && !flush){
	      return
	    }else {
	      let script;
	      script = await request('get',url,{random:Math.random()}, false,'text');
	      if (script){
	        idCache[id]=id;
	        try{
	          let el = document.createElement('script');
	          el.innerHTML = script;
	          el.id = id;
	          el.src=url;
	          document.body.appendChild(el);
	        }catch(err){
	          console.log(err);
	        }

	      }else {
	        delete idCache[id];
	      }
	    }
	  }
	})();

export async function extendScript(extendArr) {
  for(let js of extendArr){
    try{
      await loadScript(js.id,js.src);
    }catch (e){
      console.log(`加载js错误,url:${js.src},err:${e}`);
    }
  }
}

export const buildThrottle = (func,context,time)=>{
  return _.throttle(function(){
    func.apply(context,arguments);
  },time,{trailing:false})
};

export const deepCopyObject = (object)=>{
  return JSON.parse(JSON.stringify(object));
};

export const moveMap = (x,y,mapW,mapH,infoW,infoH)=>{
  //设置信息窗口偏移
  if(x<((infoW+20)/2)){
    map.panBy((infoW+20)/2-x,0, true);
  }else if(x>(mapW -(infoW+20)/2)){
    map.panBy((mapW-(infoW+20)/2)-x,0, true);
  }
  if(y < (infoH)){
    map.panBy(0,(infoH-y), true);
  }
}




