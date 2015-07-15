Coffee_App.service('weixinBridge', function ($http) {

    var wb = {
        debug: false,
        config: function (url, done, fail) {
            // var timestamp = Math.floor(new Date().getTime() / 1000);
            // var nonceStr = this.genNonceStr(16);
            var me = this;
            function callConfig (so) {
                var configData = {
                    debug: me.debug,
                    appId: 'wx6a5937f045ee75ad',
                    nonceStr: so['noncestr'],
                    timestamp: so['timestamp'],
                    signature: so['sign'],
                    jsApiList: ['chooseWXPay']

                };
                me.callWx('config', configData);
                done && done();
            }

            this.genSignature(
                url,
                function (so) {
                    callConfig(so);
                },
                function () {
                    alert('js sdk config fail');
                });
        },
        genSignature: function (url, done, fail) {
            var ticketUrl = 'http://www.urcoffee.com/api/wechat/signature.jhtml';
            $http({
                method: 'POST',
                url: ticketUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    url: url
                }
            })
              .success(function (data) {
                if (data['data'] && data['data']['sign']) {
                    done && done(data['data']);   
                }
                else {
                    fail && fail();
                }
              })
              .error(function () {
                fail && fail();
              });
        },
        pay: function (openid, out_trade_no) {
            var timestamp = Math.floor(new Date().getTime() / 1000);

            var me = this;
            function callPay (preObj) {
                var payObj = {
                    timestamp: preObj['timestamp'],
                    nonceStr: preObj['nonce_str'],
                    package: 'prepay_id=' + preObj['prepay_id'],
                    signType: 'MD5', // 注意：新版支付接口使用 MD5 加密
                    paySign: preObj['paysign'],
                    success: function (res) {
                        // alert(JSON.stringify(res));
                    }
                };

                me.callWx('chooseWXPay', payObj);
            }
            this.getPrePayId(openid, out_trade_no,
                function (preObj) {
                    callPay(preObj);
                },
                function () {
                    alert('下单失败，请稍后再试。');
                });
        },
        getPrePayId: function (openid, out_trade_no, done, fail) {
            var prepaUrl = 'http://www.urcoffee.com/api/wechat/unifiedorder.jhtml';
            $http({
                method: 'POST',
                url: prepaUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    openid: openid,
                    out_trade_no: out_trade_no
                }
            })
              .success(function (data) {
                if (data['data'] && data['data']['prepay_id']) {
                    done && done(data['data']);   
                }
                else {
                    fail && fail();
                }
              })
              .error(function () {
                fail && fail();
              });
        },
        callWx: function (api, params) {
            if (wx) {
                wx[api](params);
                this.listenErr();
            }
            else {
                alert('未能获取微信JSSDK权限。');
            }
        },
        listenErr: function () {
            if (this.errorListened) {
                return;
            }
            wx.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                // alert(JSON.stringify(res));
            });
            this.errorListened = true;
        },
        genNonceStr: function (l) {
            var str = "";
            var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            var pos;

            for(var i=0; i<l; i++){
                pos = Math.round(Math.random() * (arr.length-1));
                str += arr[pos];
            }
            return str;
        },
        shareItem: function (link, imgUrl) {
            wx.onMenuShareTimeline({
                title: 'test', // 分享标题
                link: link, // 分享链接
                imgUrl: imgUrl || '', // 分享图标
                success: function () { 
                    alert('success');
                },
                cancel: function () { 
                    alert('fail');
                }
            });
        }
    };

    return wb;
});