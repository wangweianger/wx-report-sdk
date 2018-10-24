'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var wxRepotSdk = function () {
    function wxRepotSdk(opt) {
        _classCallCheck(this, wxRepotSdk);

        this.originPage = Page;
        this.originApp = App;
        this.wxRequest = wx.request;
        this.haveAjax = false;
        this.config = {
            isUse: true,
            isNet: true,
            isSys: true,
            isLocal: true,
            timeout: 500,
            domain: 'test.com'
        };
        this.config = Object.assign(this.config, opt || {});
        this.datas = {
            errs: [],
            markuser: '',
            net: '',
            system: {},
            loc: {},
            userInfo: {},
            pages: {},
            ajaxs: []
        };
        this.datas = Object.assign(this.datas, opt.add || {});
        this.init();
    }

    _createClass(wxRepotSdk, [{
        key: 'init',
        value: function init() {
            if (!this.config.isUse) return;
            this.page();
            this.app();
            this.wrapRequest();
            if (this.config.isNet) this.network();
            if (this.config.isSys) this.system();
            if (this.config.isLocal) this.location();
        }
    }, {
        key: 'randomString',
        value: function randomString(len) {
            len = len || 19;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
            var maxPos = $chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd + new Date().getTime();
        }
    }, {
        key: 'page',
        value: function page() {
            var _this = this;
            Page = function Page(page) {
                var _onShow = page.onShow || function () {};
                page.onShow = function () {
                    var currentPages = getCurrentPages();
                    if (currentPages && currentPages.length) {
                        var length = currentPages.length;
                        var lastpage = currentPages[length - 1];
                        _this.datas.pages.router = lastpage.__route__;
                        _this.datas.pages.options = lastpage.options || {};
                    }
                    if (!_this.datas.markuser) wx.getStorage({ key: 'ps_wx_mark_user', success: function success(res) {
                            _this.datas.markuser = res;
                        }
                    });
                    setTimeout(function () {
                        if (!_this.haveAjax) {
                            _this.datas.time = new Date().getTime();
                            _this.report();
                        }
                    }, _this.config.timeout);
                    return _onShow.apply(this, arguments);
                };
                _this.originPage(page);
            };
        }
    }, {
        key: 'app',
        value: function app() {
            var _this = this;
            App = function App(app) {
                var _onError = app.onError || function () {};
                var _onShow = app.onShow || function () {};
                app.onError = function (err) {
                    var errspit = err.split(/\n/) || [];
                    var src = void 0,
                        col = void 0,
                        line = void 0;
                    var errs = err.match(/\(.+?\)/);
                    if (errs && errs.length) errs = errs[0];
                    errs = errs.replace(/\w.+js/g, function ($1) {
                        src = $1;return '';
                    });
                    errs = errs.split(':');
                    if (errs && errs.length > 1) line = parseInt(errs[1] || 0);col = parseInt(errs[2] || 0);
                    _this.datas.errs.push({
                        col: col,
                        line: line,
                        name: src,
                        msg: errspit[0] + ';' + errspit[1] + ';' + errspit[2] + ';',
                        type: 'js'
                    });
                    return _onError.apply(this, arguments);
                };
                app.onShow = function () {
                    var random = _this.randomString(19);
                    wx.setStorage({ key: "ps_wx_mark_user", data: random });
                    _this.datas.markuser = random;
                    return _onShow.apply(this, arguments);
                };
                _this.originApp(app);
            };
        }
    }, {
        key: 'network',
        value: function network() {
            var _this2 = this;

            wx.getNetworkType({
                success: function success(res) {
                    _this2.datas.net = res.networkType;
                }
            });
        }
    }, {
        key: 'system',
        value: function system() {
            var _this3 = this;

            wx.getSystemInfo({
                success: function success(res) {
                    _this3.datas.system = res;
                }
            });
        }
    }, {
        key: 'location',
        value: function location() {
            var _this4 = this;

            wx.getLocation({
                type: 'wgs84',
                success: function success(res) {
                    _this4.datas.loc = res;
                }
            });
        }
    }, {
        key: 'wrapRequest',
        value: function wrapRequest() {
            var timer = null;
            var originRequest = wx.request;
            var request = [];
            var response = [];
            var _this = this;
            Object.defineProperty(wx, 'request', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function value() {
                    var config = arguments[0] || {};
                    _this.haveAjax = true;
                    request.push({
                        url: config.url || '',
                        options: config.data || '',
                        method: config.method || 'GET',
                        begintime: new Date().getTime()
                    });
                    var _complete = config.complete || function (data) {};
                    config.complete = function (data) {
                        response.push({
                            errMsg: data.errMsg,
                            url: config.url || '',
                            statusCode: data.statusCode,
                            endtime: new Date().getTime(),
                            bodySize: data.header ? data.header['Content-Length'] : 0
                        });
                        if (response.length === request.length) {
                            clearTimeout(timer);
                            timer = setTimeout(function () {
                                if (response.length === request.length) _this.mergeAjax(request, response);
                                request = [];
                                response = [];
                                clearTimeout(timer);
                            }, _this.config.timeout);
                        }
                        return _complete.apply(this, arguments);
                    };
                    return originRequest.apply(this, arguments);
                }
            });
        }
    }, {
        key: 'mergeAjax',
        value: function mergeAjax(request, response) {
            var _this = this;
            response.forEach(function (item, i) {
                request.forEach(function (item1, i1) {
                    if (item.url.indexOf(item1.url) > -1) {
                        if (item.errMsg === 'request:ok' && item.statusCode === 200) {
                            _this.datas.ajaxs.push({
                                duration: item.endtime - item1.begintime || 0,
                                name: item1.url,
                                method: item1.method,
                                bodySize: item.bodySize,
                                options: item1.options
                            });
                        } else {
                            _this.datas.errs.push({
                                name: item1.url,
                                method: item1.method,
                                msg: item.errMsg,
                                type: 'ajax',
                                status: item.statusCode,
                                options: item1.options
                            });
                        }
                    }
                });
                if (i === response.length - 1) {
                    _this.datas.time = new Date().getTime();
                    _this.report();
                }
            });
        }
    }, {
        key: 'report',
        value: function report() {
            this.wxRequest({
                method: 'POST',
                url: this.config.domain,
                data: this.datas,
                success: function success(res) {
                    void 0;
                }
            });
            this.haveAjax = false;
            this.datas.errs = [];
            this.datas.ajaxs = [];
        }
    }]);

    return wxRepotSdk;
}();

module.exports = wxRepotSdk;