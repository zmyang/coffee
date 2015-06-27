Coffee_App.service('userInfo', function () {
    var userInfo = {
        hasLogin: false,
        fromPage: null,
        info: null,
        openId: null,
        recodeCode: null,
        getOpenId: function(xhr, done, fail) {
            if (userInfo.openId) {
                done && done();
                return;
            }

            var code;
            if (this.recodeCode) {
                code = this.recodeCode;
            }
            else {
                var codeParam = /code=(\w+)/.exec(location.href);
                if (!codeParam) {
                    fail && fail();
                    return;
                }
                else {
                    code = codeParam[1];
                }
            }
            
            xhr.get('http://www.urcoffee.com/api/wechat/authorize/' + code + '/STATE.jhtml', {
                code: code
            })
              .success(function (data) {
                if (data['data'] && data['data']['openid']) {
                    userInfo.openId = data['data']['openid'];
                    done && done();   
                }
                else {
                    fail && fail();
                }
              })
              .error(function () {
                fail && fail();
              });
        },
        getUserInfo: function (xhr, done, fail) {
            if (userInfo.info) {
                done && done();
                return;
            }
            xhr.get('http://www.urcoffee.com/api/member/weixin/' + userInfo.openId + '.jhtml')
              .success(function (data) {
                userInfo.info = data['info'];
                userInfo.hasLogin = true;
                done && done();
              })
              .error(function () {
                fail && fail();
              });
        },
        postData: function (xhr, url, data) {
            return xhr({
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data
            })
        }
    };

    return userInfo;
});