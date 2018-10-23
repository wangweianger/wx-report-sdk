### wx-report-sdk 微信小程序，错误，ajax性能，系统信息，uv等上报信息sdk


### performance-report SDK主要上报一下性能信息
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

isUse: true,
            isNet: true,
            isSys: true,
            isLocal: true,
            timeout: 500,
            domain: 'test.com'

>  * isUse     ：sdk是否启用
>  * isNet     ：是否上报网络信息（默认：true）
>  * isSys     ：是否上报系统信息（默认：true）
>  * isLocal   ：是否上报用户地理位置信息 （默认：true）
>  * timeout   ：上报延迟时间 （默认：500ms）
>  * domain    ：上报api地址 


## Return parameter description

| parameter name | describe | explain |
| --- | --- | --- |
| markPage | 当前页面标识 |  |
| markUser | 用户标识  | 可用来做UV统计，和用户行为漏斗分析 |
| screenwidth | 屏幕宽度  |  |
| screenheight | 屏幕高度  |  |
| preUrl | 上一页面  |  |
|  |  |  |
| errorList | 错误资源列表信息 |  |
| ->t | 资源时间 |  |
| ->n | 资源类型 | resource，js，ajax，fetch,other  |
| ->msg | 错误信息 |  |
| ->method | 资源请求方式 | GET，POST |
| ->data->resourceUrl | 请求资源路径 |  |
| ->data->col | js错误行 |  |
| ->data->line |  js错误列 |  |
| ->data->status | ajax错误状态 |  |
| ->data->text | ajax错误信息 |  |
|  |  |  |
| performance |   页面资源性能数据(单位均为毫秒) |  |
| ->dnst | DNS解析时间 |  |
| ->tcpt | TCP建立时间 |  |
| ->wit | 白屏时间 |  |
| ->domt | dom渲染完成时间 |  |
| ->lodt | 页面onload时间 |  |
| ->radt | 页面准备时间  |  |
| ->rdit | 页面重定向时间 |  |
| ->uodt | unload时间 |  |
| ->reqt | request请求耗时 |  |
| ->andt | 页面解析dom耗时 |  |
|  |  |  |
| resoruceList | 页面资源性能数据 |  |
| ->decodedBodySize | 资源返回数据大小 |  |
| ->duration | 资源耗时 |  |
| ->method | 请求方式 | GET,POST |
| ->name | 请求资源路径 |  |
| ->nextHopProtocol | http协议版本 |  |
| ->type | 请求资源类型 | script，img，fetchrequest，xmlhttprequest，other |

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







