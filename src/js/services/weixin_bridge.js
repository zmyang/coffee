Coffee_App.service('weixinBridge', function () {

    var wb = {
        debug: true,
        config: function (xhr) {
            var timestamp = new Date().getTime();
            var nonceStr = this.genNonceStr(10);
            var signature = this.genSignature(xhr, timestamp, nonceStr);
            this.callWx('config', {
                debug: this.debug,
                appId: 'wx6a5937f045ee75ad',
                nonceStr: nonceStr,
                timestamp: timestamp,
                signature: signature,
                jsApiList: [chooseWXPay]

            });
        },
        callWx: function (api, params) {
            if (wx) {
                wx[api].call(wx, params);
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
        },
        genSignature: function (xhr, t, n) {

        }
    };

    return wb;
});