import request from '@/utils/request';
import * as uploadUtils from '@alicloud/pop-core';
import axios from 'axios'

// const RPCClient = uploadUtils.RPCClient;


// function initVodClient(accessKeyId, secretAccessKey) {
//     let regionId = 'cn-shanghai';   // 点播服务接入区域
//     let client = new RPCClient({
//         accessKeyId: accessKeyId,
//         secretAccessKey: secretAccessKey,
//         endpoint: 'http://vod.' + regionId + '.aliyuncs.com',
//         apiVersion: '2017-03-21',
//     });
//     return client;
// }
// export function testUploadVideo() {
//     let client = initVodClient('LTAI2EPo5OV3ro5O','WX2ABzpho1H5sHKiN6pg6ZmzsngPD9');
//     console.log('=======================testUploadVideo=====================');
//     let res =  client.request("CreateUploadVideo", {
//         Title: 'this is a sample',
//         FileName: 'filename.mp4'
//     }).then(function (response) {
//         // return response
//         console.log('VideoId = ' + response.VideoId);
//         console.log('UploadAddress = ' + response.UploadAddress);
//         console.log('UploadAuth = ' + response.UploadAuth);
//         console.log('RequestId = ' + response.RequestId);
//     });
//     console.log('=======================res=====================',res);

// }

/**获取扬尘监测仪表盘数据 */
export function  getTspDashBoardData(params) {
    // console.log("仪表盘参数=======>>>>>",params)
    return request('get', `${config.tspInfo.getDashBoardData}`, params, false);
}
/**视频上传 */
// export function  uploadVideo(params){
//     let file = params.file.file
//     let fileName = file.name;
//     let fileSize = file.size;
//     let title = fileName.split(".")[0] + (new Date()).valueOf();
//     // console.log("fileName======>>>>>>",fileName,"fileSize====>>>",fileSize,"title====>>>>",title);
//     var uploader = new AliyunUpload.Vod({
//         //阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
//         userId:"1613946937128513",
//         //上传到点播的地域， 默认值为'cn-shanghai',//eu-central-1,ap-southeast-1
//         region:"cn-shanghai",
//         //分片大小默认1M，不能小于100K
//         partSize: 1048576,
//         //并行上传分片个数，默认5
//         parallel: 5,
//         //网络原因失败时，重新上传次数，默认为3
//         retryCount: 3,
//         //网络原因失败时，重新上传间隔时间，默认为2秒
//         retryDuration: 2,
//         // 开始上传
//         addFileSuccess: function (uploadInfo) {
//             debugger
//             console.log('addFileSuccess')
//             console.log("addFileSuccess: " + uploadInfo.file.name)
//         },
        
//         'onUploadstarted': function (uploadInfo) {
//             debugger
//             console.log("onUploadStarted:" + uploadInfo.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
//             // 上传方式1, 需要根据uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress，如果videoId有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
//             if (uploadInfo.videoId) {
//                 // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
//                 // const getUrl =  request('get', "http://10.3.6.152:8080/ossVideo/getUrl", {"fileName":fileName,"fileSize":fileSize,"title":title,"voideId":uploadInfo.videoId}, false);
//                 var createUrl = "http://10.3.6.152:8080/ossVideo/getUrl?fileName="+fileName+"&fileSize="+fileSize+"&title="+title+"&voideId="+uploadInfo.videoId
//                 axios.get(createUrl).then(({data}) => {
//                     debugger
//                     if(data.code == 200){
//                         let res = JSON.parse(data.data);
//                         let uploadAuth = data.UploadAuth
//                         let uploadAddress = data.UploadAddress
//                         let videoId = uploadInfo.videoId
//                         uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
//                         console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
//                     }
//                 })
//                 debugger
//             }else{
//                 // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
//                 const getUrl =  request('get', "http://10.3.6.152:8080/ossVideo/getUrl", {"fileName":fileName,"fileSize":fileSize,"title":title}, false);
//                 debugger
//             }
//             // uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId);
//         },
//         // 文件上传成功
//         'onUploadSucceed': function (uploadInfo) {

//             console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object+"上传成功");
//             debugger
//         },
//         // 文件上传失败
//         'onUploadFailed': function (uploadInfo, code, message) {
//             console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message+"上传失败");
//             debugger
//         },
//         'onUploadProgress': function (uploadInfo, totalSize, loadedPercent) {
//             console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(loadedPercent * 100) + "%");
//             debugger
//         },
//         'onUploadTokenExpired': function (uploadInfo) {
//             debugger
//             console.log("onUploadTokenExpired");
//             uploader.resumeUploadWithAuth(uploadAuth);
//         },
//         'onUploadEnd':function(uploadInfo){
//             debugger
//                 console.log("onUploadEnd: uploaded all the files");
//         }
//     });
//     var userData = '{"Vod":{}}'
//     uploader.addFile(file, null, null, null, userData);
//     uploader.startUpload()
// }

