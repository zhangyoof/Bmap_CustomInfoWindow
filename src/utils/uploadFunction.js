import axios from "axios";
let API = 'http://bimcloud-test.gcnao.cn:8080/jsbimpro-dp-service'

export function createUploader (successCallback) {
    let i = 1;
    // let self = this;
    // let fileName = this.state.file.name;
    // let fileSize = this.state.file.size;
    // let title = fileName.split(".")[0] + (new Date()).valueOf();
    //这是公共方法
    let tmpFileTime = ''
    let tmpFileId = ''
    let uploader = new AliyunUpload.Vod({
        // userId:"vod_jsbim_upload@szewec.onaliyun.com",
        userId:"1303984639806000",
        //上传到点播的地域， 默认值为'cn-shanghai',//eu-central-1,ap-southeast-1
        region:"cn-shanghai",
        //分片大小默认1M，不能小于100K
        partSize: 1048576,
        //并行上传分片个数，默认5
        parallel: 5,
        //网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        //网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 添加文件成功
        addFileSuccess: function(uploadInfo) {
            console.log("addFileSuccess: " + uploadInfo.file.name);
        },
        // 开始上传
        onUploadstarted: function(uploadInfo) {
            debugger
            // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
            // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
            // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
            // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
            // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
            // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
            let tmpName = uploadInfo.file.name;
            let bsid = tmpName.lastIndexOf(".")
            let tmpTitle = tmpName.slice(0,bsid) +"-"+ (new Date()).valueOf();
            if (!uploadInfo.videoId) {
              debugger
                let createUrl = API+"/ossVideo/getUrl?type=upload&fileName="+uploadInfo.file.name+"&fileSize="+uploadInfo.file.size+"&title="+tmpTitle
                debugger
                axios({
                    method: 'get',
                    url: createUrl,
                    headers: {'Authorization': "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiJkYjAwZTQ1M2VkNTM0NWQ2OWJlZTYyNTNhZTBiMTgxZSIsImVtYWlsIjoiMTM3NTE0MzAwMDFAcXEuY29tIiwibmFtZSI6IuS4muS4uzLnlKjmiLdBIiwidXNlcm5hbWUiOiJ5ejJ5aGEiLCJwaG9uZU51bWJlciI6IjEzNzUxNDMwMDAxIiwiYWNjb3VudFR5cGUiOiJQRVJTT05BTCIsInVzZXJJZCI6ImQ0NzdmNWQ2ZWU0MTRkYzU4MTY5NmNmZGI4NjFiZTU1IiwiY29tcGFueUlkIjoiYWU1NjgzMzE0ZTVjNDhiM2I4ZWIxZGYyZGFjNGM2ZmEiLCJjb21wYW55TmFtZSI6IuaWsOS4muS4uzI0NSIsImV4cCI6MTU0ODgyNDYxNX0.pC2ZFgDW7pcxUu7a6i1p2v_Ci14MR2u2lObmyWdcdDE"}
                  }).then(({ data }) => {
                    if(data.code == 200){
                      debugger
                        let res = JSON.parse(data.message);
                        let uploadAuth = res.UploadAuth
                        let uploadAddress = res.UploadAddress
                        let videoId = res.VideoId
                        tmpFileId = res.VideoId //保存当前videoId
                        tmpFileTime = uploadInfo.file.lastModified
                        uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
                        console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
                        debugger
                    }
                    debugger;
                });
                console.log("onUploadStarted:" +uploadInfo.file.name +", endpoint:" +uploadInfo.endpoint +", bucket:" +uploadInfo.bucket +", object:" +uploadInfo.object);
                debugger;
            } else {
              debugger
                // 如果videoId有值，根据videoId刷新上传凭证
                // https://help.aliyun.com/document_detail/55408.html?spm=a2c4g.11186623.6.630.BoYYcY
                let refreshUrl = API+"/ossVideo/getUrl?type=upload&fileName="+uploadInfo.file.name+"&fileSize="+uploadInfo.file.size+"&title="+tmpTitle+"&videoId="+uploadInfo.videoId;
                debugger
                axios.get(refreshUrl).then(({ data }) => {
                    let res = JSON.parse(data.data);
                    let uploadAuth = res.UploadAuth
                    let uploadAddress = res.UploadAddress;
                    let videoId = uploadInfo.videoId;
                    uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
                    debugger;
                });
                debugger;
            }
        },
        // 文件上传成功
        onUploadSucceed: function(uploadInfo) {
          i=i+1
            console.log( "onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
            debugger;
            successCallback(tmpFileId,tmpFileTime)
        },
        // 文件上传失败
        onUploadFailed: function(uploadInfo, code, message) {
            console.log("onUploadFailed: file:" + uploadInfo.file.name +",code:" +code +", message:" + message);
            console.log("onUploadFailed: file:" + uploadInfo.file.name +",code:" +code +", message:" + message);
            console.log("err-message=====>>>>>>",message);
            debugger;
        },
        // 取消文件上传
        onUploadCanceled: function(uploadInfo, code, message) {
            console.log("Canceled file: " + uploadInfo.file.name +", code: " + code + ", message:" + message);
            debugger;
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: function(uploadInfo, totalSize, progress) {
            console.log( "onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%，正在上传第"+i+"个文件");
          
        },
        // 上传凭证超时
        onUploadTokenExpired: function(uploadInfo) {
            // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
            // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
            let refreshUrl = API+"/ossVideo/getUrl?type=upload&fileName="+uploadInfo.file.name+"&fileSize="+uploadInfo.file.size+"&title="+tmpTitle+"&videoId="+uploadInfo.videoId;
            debugger;
            axios.get(refreshUrl).then(({ data }) => {
                let res = JSON.parse(data.data);
                let uploadAuth = res.UploadAuth
                uploader.resumeUploadWithAuth(uploadAuth);
                console.log(
                    "upload expired and resume upload with uploadauth " + uploadAuth
                );
                debugger;
            });
        },
        // 全部文件上传结束
        onUploadEnd: function(uploadInfo) {
            console.log("onUploadEnd: uploaded all the files");
            debugger;
        }
    });
    return uploader;
}