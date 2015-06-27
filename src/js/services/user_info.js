Coffee_App.service('userInfo', function () {
    var userInfo = {
        hasLogin: false,
        fromPage: null,
        info: null,
        openId: null,
        getOpenId: function(xhr, done, fail) {
            if (userInfo.openId) {
                done && done();
                return;
            }
            var codeParam = /code=(\w+)/.exec(location.href);
            var code;
            if (!codeParam) {
                fail && fail();
                return;
            }
            else {
                code = codeParam[1];
            }
            xhr.get('http://www.urcoffee.com/api/wechat/authorize/' + code + '/1.jhtml', {
                code: code
            })
              .success(function (data) {
                userInfo.openId = data['openid'];
                done && done();
              })
              .error(function () {
                fail && fail();
              });
        },
        getUserInfo: function (xhr, done, fail) {
            xhr.get('http://www.urcoffee.com/api/userinfo.jhtml', {
                openid: userInfo.openId
            })
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