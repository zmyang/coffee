Coffee_App.service('weixinBridge', function () {

    var wb = {
        debug: false,
        config: function (xhr, url) {
            // var timestamp = Math.floor(new Date().getTime() / 1000);
            // var nonceStr = this.genNonceStr(16);
            var me = this;
            function callConfig (so) {
                var configData = {
                    debug: me.debug,
                    appId: 'wx6a5937f045ee75ad1',
                    nonceStr: so['noncestr'],
                    timestamp: so['timestamp'] + "",
                    signature: so['sign'],
                    jsApiList: ['chooseWXPay']

                };
                alert(JSON.stringify(configData, 4, null));
                me.callWx('config', configData);
            }

            this.genSignature(
                xhr, url,
                function (so) {
                    callConfig(so);
                },
                function () {
                    alert('js sdk config fail');
                });
        },
        genSignature: function (xhr, url, done, fail) {
            var ticketUrl = 'http://www.urcoffee.com/api/wechat/signature.jhtml';
            xhr({
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
                alert(JSON.stringify(data));
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
        pay: function (xhr) {
            var timestamp = Math.floor(new Date().getTime() / 1000);
            this.callWx('chooseWXPay', {
                timestamp: timestamp,
                nonceStr: 'noncestr',
                package: 'addition=action_id%3dgaby1234%26limit_pay%3d&bank_type=WX&body=innertest&fee_type=1&input_charset=GBK&notify_url=http%3A%2F%2F120.204.206.246%2Fcgi-bin%2Fmmsupport-bin%2Fnotifypay&out_trade_no=1414723227818375338&partner=1900000109&spbill_create_ip=127.0.0.1&total_fee=1&sign=432B647FE95C7BF73BCD177CEECBEF8D',
                signType: 'SHA1', // 注意：新版支付接口使用 MD5 加密
                paySign: 'bd5b1933cda6e9548862944836a9b52e8c9a2b69'
            });
        },
        callWx: function (api, params) {
            if (wx) {
                wx[api](params);
            }
            else {
                alert('未能获取微信JSSDK权限。');
            }
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
        }
    };

    return wb;
});