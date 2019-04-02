/**
 *自定义信息弹窗
 *悬浮弹窗
 * @param {*} point 信息弹窗的显示位置即坐标
 * @param {*} text  信息弹窗内容，支持HTML代码片段
 * @param {*} width 信息弹窗宽度
 * @param {*} offsetTop 信息弹窗基于显示位置的向上偏移量
 */
export function customInfoWindow(point,text,width,offsetTop){

    function ComplexCustomOverlay(point, text,width,offsetTop){
        this._point = point;
        this._text = text;
        this._width = width;
        this._offsetTop = offsetTop;
      }

      ComplexCustomOverlay.prototype = new BMap.Overlay();//继承百度地图提供的覆盖物的类

      ComplexCustomOverlay.prototype.initialize = function(map){
        this._map = map;
        let div = this._div = document.createElement("div");
        div.setAttribute("id","customInfoWindow")
        div.style.position = "absolute";
        div.style.width = this._width + "px"
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        div.innerHTML=this._text
        let leftMove = (this._width - 20)/2 + "px"
        if(offsetTop){
          let arrow = this._arrow = document.createElement("div");
          arrow.style.position =  "absolute";
          arrow.style.bottom = "-20px";
          arrow.style.left = leftMove;//（（div宽度）-20（边框宽度））/2
          arrow.style.border = "10px solid transparent";
          arrow.style.borderTopColor =  "#414141";
          div.appendChild(arrow);
        }
        map.getPanes().labelPane.appendChild(div);
        return div;
      }

      ComplexCustomOverlay.prototype.draw = function(){
        let H = document.getElementById("customInfoWindow").offsetHeight;
        let map = this._map;
        let pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - parseInt(this._arrow.style.left)-10 + "px";
        this._div.style.top  = pixel.y - H - this._offsetTop + "px";
      }

      let  myCompOverlay = new ComplexCustomOverlay(point,text,width,offsetTop);
      return myCompOverlay;
}
/**
 *自定义地图类型控件（普通地图鱼卫星地图切换）
 */
export function customClickWindow(){
  function mapTypeControl(){
    // 设置默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    this.defaultOffset = new BMap.Size(10, 10);
  }
  // 通过JavaScript的prototype属性继承于BMap.Control
  mapTypeControl.prototype = new BMap.Control();
  // 自定义控件必须实现initialize方法，并且将控件的DOM元素返回
  // 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中
  mapTypeControl.prototype.initialize = function(map){
    // 创建一个DOM元素
    var div = document.createElement("div");
    // 添加文字说明
    div.appendChild(document.createTextNode("切换卫星地图"));
    // 设置样式
    div.style.cursor = "pointer";
    div.style.border = "1px solid gray";
    div.style.backgroundColor = "white";
    // 绑定事件，点击切换地图
    let  showNormalMap = true
    div.onclick = function(e){
        map.zoomTo(map.getZoom() + 2);
    }
    // 添加DOM元素到地图中
    map.getContainer().appendChild(div);
    // 将DOM元素返回
    return div;
  }
  var myZoomCtrl = new mapTypeControl();  
  return myZoomCtrl
  // let MapTypeControl = new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP ]})
  // return MapTypeControl
}