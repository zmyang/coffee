Coffee_App.service('userInfo', function ($http, $rootScope) {
    var userInfo = {
        hasLogin: false,
        fromPage: null,
        info: null,
        openId: null,
        recodeCode: null,
        provinces: null,
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
                            userInfo.provinces = data['data'];
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
            var aUrl = 'http://www.urcoffee.com/api/member/childAreaList/' + pId + '.jhtml'
            $http.get(aUrl)
                .success(function (data) {
                    if (1 == data['result'] && data['data'].length > 0) {
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
        getOrders: function (done) {
            $rootScope.ajaxDataLoading = true;
            var gUrl = 'http://www.urcoffee.com/api/order/list/' + this.openId + '.jhtml';
            $http.get(gUrl)
                .success(function (data) {
                    $rootScope.ajaxDataLoading = false;
                    if (1 == data['result']) {
                        done && done(data);
                    }
                    else {
                        alert('获取我的订单列表失败');
                    }
                })
                .error(function () {
                    $rootScope.ajaxDataLoading = false;
                    alert('获取我的订单列表失败');
                });
        },
        getOrderHistory: function (done, force) {
            var me = this;
            var gUrl = 'http://www.urcoffee.com/api/order/history/' + this.openId + '.jhtml';
            $http.get(gUrl)
                .success(function (data) {
                    if (1 == data['result']) {
                        done && done(data['data']);
                        me.orderHistory = data['data'];
                    }
                    else {
                        alert('获取购物记录失败');
                    }
                })
                .error(function () {
                    alert('获取购物记录失败');
                });
        },
        delCollection: function (id, done) {
            this.postData('http://www.urcoffee.com/api/member/delFavorite.jhtml', {
                openid: this.openId,
                id: id
            }).success(function (data) {
                if (1 == data['result']) {
                    done && done();
                }
                else {
                    alert('取消失败，稍后再试');
                }
            });
        },
        getGroupDates: function (done) {
            var gUrl = 'http://www.urcoffee.com/api/tuangou/tuangouDates.jhtml';
            $http.get(gUrl)
                .success(function (data) {
                    if (1 == data['result']) {
                        done && done(data['data']);
                    }
                    else {
                        alert('获取团购信息失败');
                    }
                })
                .error(function () {
                    alert('获取团购信息失败');
                });
        },
        getGroupProducts: function (d, done) {
            var today = new Date();
            var theDay = new Date(d);
            var params = {
                method: 'POST',
                url: 'http://www.urcoffee.com/api/tuangou/tuangouPreProducts.jhtml',
                data: {
                    startDate: d
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            };

            var isToday = today.getFullYear() == theDay.getFullYear()
                && today.getMonth() == theDay.getMonth()
                && today.getDate() == theDay.getDate();

            if (isToday) {
                params = {
                    method: 'GET',
                    url: 'http://www.urcoffee.com/api/tuangou/tuangouProducts.jhtml'
                };
            }

            $http(params)
                .success(function (data) {
                    if (1 == data['result']) {
                        done && done(data['data'], isToday);
                    }
                    else {
                        alert('获取团购信息失败');
                    }
                })
                .error(function () {
                    alert('获取团购信息失败');
                });
        }
    };

    return userInfo;
});