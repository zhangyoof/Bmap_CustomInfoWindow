export const setCookie = (k, v, d)=>{
    var date = new Date();
    //date方法
    date.setTime(date.getTime() + d * 60 * 60 * 24 * 1000)
    var expires = ';expires=' + date.toUTCString();
    document.cookie = k + '=' + v + expires;
}
export const getCookie = k=>{
    //分组的第二个元素
    var arr = document.cookie.match(new RegExp(k + '=([^;]*)'));
    return arr ? arr[1] : ''
}
export const clearCookie = k=>{
    setCookie(k, '', -1)
}