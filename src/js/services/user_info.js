Coffee_App.service('userInfo', function ($http) {
    var userInfo = {
        hasLogin: false,
        fromPage: null,
        info: null,
        openId: null,
        recodeCode: null,
        provinces: null,
        childAreas: {},
        getOpenId: function(done, fail) {
            if (this.openId) {
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
            
            $http.get('http://www.urcoffee.com/api/wechat/authorize/' + code + '/STATE.jhtml', {
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
        getUserInfo: function (done, fail, isForce) {
            if (this.info && !isForce) {
                done && done();
                return;
            }

            function _doGet () {
                $http.get('http://www.urcoffee.com/api/member/weixin/' + userInfo.openId + '.jhtml')
                  .success(function (data) {
                    if (data['data']) {
                        userInfo.info = data['data'];
                        userInfo.hasLogin = true;
                        done && done();
                    }
                    else {
                        fail && fail();
                    }
                  })
                  .error(function () {
                    fail && fail();
                  });
            }

            if (!this.openId) {
                this.getOpenId(
                    function () {
                        _doGet();
                    }, fail);
            }
            else {
                _doGet();
            }
            
        },
        postData: function (url, data) {
            return $http({
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
        },
        getProvinces: function (done, fail) {
            if (!this.provinces) {
                $http.get('http://www.urcoffee.com/api/member/provinceList.jhtml')
                    .success(function (data) {
                        if (1 == data['result']) {
                            done && done(data['data']);
                            userInfo.provinces = data;
                        }
                        else {
                            alert('获取省份失败');
                        }
                    })
                    .error(function () {
                        alert('获取省份失败');
                    });
            }
            else {
                done && done(this.provinces);
            }
        },
        getChildAreas: function (pId, done, fail) {
            if (!this.childAreas[pId]) {
                var aUrl = 'http://www.urcoffee.com/api/member/childAreaList/' + pId + '.jhtml'
                $http.get(aUrl)
                    .success(function (data) {
                        if (1 == data['result'] && data['data'].length > 0) {
                            done && done(data['data']);
                            userInfo.childAreas[pId] = data['data'];
                        }
                        else {
                            fail && fail();
                        }
                    })
                    .error(function () {
                        fail && fail();
                    });
            }
            else {
                done && done(this.childAreas[pId]);
            }
        }
    };

    return userInfo;
});