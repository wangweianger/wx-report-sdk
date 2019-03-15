### wx-report-sdk 微信小程序，错误，ajax性能，系统信息，uv等上报信息sdk


### performance-report SDK主要上报以下性能信息
>  * errs           错误信息，包含js错误和ajax错误信息
>  * markuser       用户标识，可用于做uv统计
>  * net            用户的网络类型 参考小程序的 wx.getNetworkType 方法
>  * system         用户系统信息  参考小程序的  wx.getSystemInfo  方法
>  * loc            用户地理位置信息 参考小程序的  wx.getLocation  方法
>  * pages          用户当前浏览器的path路径 和参数详情
>  * ajaxs          当前path路径下ajax详细信息
>  * time           上报时间



### 使用方法：

```js

微信小程序 app.js头部引入sdk

const wxRepotSdk = require('./utils/wx-report-sdk.min');

new wxRepotSdk({
    domain:'http://test.com'
})

```

### 参数说明

>  * isUse     ：sdk是否启用 默认：true）
>  * isNet     ：是否上报网络信息（默认：true）
>  * isSys     ：是否上报系统信息（默认：true）
>  * isLocal   ：是否上报用户地理位置信息 （默认：true）
>  * timeout   ：上报延迟时间 （默认：500ms）
>  * domain    ：上报api地址 

* 案例
```

const wxRepotSdk = require('./utils/wx-report-sdk.min');

//最简单版本
new wxRepotSdk({
    domain:'http://test.com'
})

//完整版本
new wxRepotSdk({
    domain:'http://test.com',
    isUse:true,
    isNet:true,
    isSys:true,
    isLocal:false,
    timeout:500,
    add:{
      appId:'123456789'
    }
})

```


## Return parameter description

| parameter name | describe | explain |
| --- | --- | --- |
| markuv | 统计uv标识 |  |
| markuser | 用户标识  | 可用来做UV统计，和用户行为漏斗分析 |
| net | 网络类型  |  |
| time | 上报时间  |  |
|  |  |  |
| pages | 页面信息 |  |
| ->router | 当前小程序路径 |  |
| ->options | 当前路径参数 |   |
|  |  |  |
| ajaxs |   ajax性能信息 |  |
| ->duration | ajax请求耗时 |  |
| ->name | api请求地址 |  |
| ->method | 请求方式 | GET,POST,PUT,DELETE 等 |
| ->bodySize | ajax返回资源大小 |  |
| ->options | 请求参数 |  |
|  |  |  |
| errs | 错误信息列表 |  |
| ->col | 错误行 |  |
| ->line | 错误列 |  |
| ->name | 错误js名称 | |
| ->msg | 错误信息 |  |
| ->status | 错误状态码 |  |
| ->options | 请求参数 |  |
| ->type | 错误类型 | js,ajax |
|  |  |  |
| loc | 地理位置信息 |  |
| ->latitude | 经度 |  |
| ->longitude | 纬度 |  |
|  |  |  |
| system | 用户系统信息 |  |
| ->model | 手机品牌 |  |
| ->system | 系统版本 |  |
| ->language | 微信语言 |  |
| ->version | 微信版本 |  |
| ->screenWidth | 屏幕宽度 |  |
| ->screenHeight | 屏幕高度 |  |
| ->SDKVersion | 小程序sdk版本 |  |


### A complete report of the report looks like this.
```js
{
  "errs": [
    {
      "col": 21, 
      "line": 47, 
      "name": "http://127.0.0.1:52874/appservice/pages/index/index.js", 
      "msg": "thirdScriptError;zane is not defined;at \"pages/index/index\" page lifeCycleMethod onLoad function;ReferenceError: zane is not defined;", 
      "type": "js"
    }, 
    {
      "name": "https://test-pt.mornitar.cn/pt-app/api/home/getAllActivityCodes0", 
      "method": "POST", 
      "msg": "request:ok", 
      "type": "ajax", 
      "status": 404
    }
  ], 
  "markuser": "Wkkfay9exDWY7fwBJpk1540288660639", 
  "net": "wifi", 
  "system": {
    "errMsg": "getSystemInfo:ok", 
    "model": "iPhone 7 Plus", 
    "pixelRatio": 3, 
    "windowWidth": 414, 
    "windowHeight": 624, 
    "system": "iOS 10.0.1", 
    "language": "zh_CN", 
    "version": "6.6.3", 
    "screenWidth": 414, 
    "screenHeight": 736, 
    "SDKVersion": "2.2.4", 
    "brand": "devtools", 
    "fontSizeSetting": 16, 
    "benchmarkLevel": 1, 
    "batteryLevel": 100, 
    "statusBarHeight": 20, 
    "platform": "devtools"
  }, 
  "loc": {
    "latitude": 22.53332, 
    "longitude": 113.93041, 
    "speed": -1, 
    "accuracy": 65, 
    "altitude": 0, 
    "verticalAccuracy": 65, 
    "horizontalAccuracy": 65, 
    "errMsg": "getLocation:ok"
  }, 
  "userInfo": { }, 
  "pages": {
    "router": "pages/index/index", 
    "options": { }
  }, 
  "ajaxs": [
    {
      "duration": 155, 
      "name": "https://test-pt.morntar.cn/pt-app/api/activity/queryColumns", 
      "method": "GET", 
      "bodySize": "184"
    }, 
    {
      "duration": 246, 
      "name": "https://test-pt.mornitar.cn/pt-app/api/band/get", 
      "method": "POST", 
      "bodySize": "246"
    }
  ], 
  "time": 1540288661858
}
```







