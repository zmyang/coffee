angular.module('Coffee.controllers.Account', [])

.controller('AccountController', function($scope, $location, $http, userInfo) {
    var vm = this;

    // 我的联系方式
    vm.Account = {
        name: '',
        tel: '',
        codeText: '获取验证码',
        isTickTacking: false,
        nameBlur: function() {
            setTimeout(function() {
                Account.hideNameDel = true;
                $scope.refreshView();
            }, 100);
        },
        telBlur: function() {
            setTimeout(function() {
                Account.hideTelDel = true;
                $scope.refreshView();
            }, 100);
        },
        getCode: function() {
            if (this.isTickTacking) {
                return;
            }

            if (!this.inTel) {
                alert('请输入手机号码');
                return;
            }
            this.isTickTacking = true;

            var getTime = 60;

            function ticktack() {
                getTime = getTime - 1;
                if (getTime <= 0) {
                    Account.codeText = '获取验证码';
                    Account.isTickTacking = false;
                    getTime = 60;
                    $scope.refreshView(); // refresh view in $scope
                    return;
                }
                Account.codeText = getTime + '秒后重新获取';
                $scope.refreshView(); // refresh view in $scope
                setTimeout(ticktack, 1000);
            }
        },
        checkCode: function(cb) {
        },
        send: function() {
            if (!this.logTel) {
                alert('请输入账号');
                return;
            }
            if (!this.logPwd) {
                alert('请输入密码！');
                return;
            }


            var me = this;
            function doSend () {
                var loginUrl = 'http://www.urcoffee.com/api/member/login.jhtml';
                userInfo.postData($http, loginUrl, {
                    'username': me.logTel, 
                    'password': me.logPwd,
                    'wechatId': userInfo.openId || ''
                })
                  .success(function (data) {
                    alert(JSON.stringify(data));
                    userInfo.info = data['data'];
                    if (userInfo.openId) {
                        userInfo.hasLogin = true;
                    }
                    window.history.back();
                  })
                  .error(function () {
                    alert('登陆失败!');
                  })
                  .finally(function () {
                  });
            }

            userInfo.getOpenId($http, doSend, doSend);
            
        },
        reg: function () {
            console.log(this.regCountry);
            if (!this.regName) {
                alert('请输入用户名');
                return;
            }
            if (!this.regPwd) {
                alert('请输入密码！');
                return;
            }
            // if (!this.regMail) {
            //     alert('请输入邮箱！');
            //     return;
            // }
            if (!this.regPhone) {
                alert('请输入电话！');
                return;
            }

            var me = this;
            function doReg() {
                var regUrl = 'http://www.urcoffee.com/api/member/singup.jhtml';
                var params = {
                    'username': me.regName, 
                    'password': me.regPwd,
                    'phone': me.regPhone,
                    'wechatId': userInfo.openId || ''
                };

                if (me.regMail) {
                    params['email'] = me.regMail;
                }

                userInfo.postData($http, regUrl, params)
                  .success(function (data) {
                    console.log(data);
                    userInfo.info = data['data'];
                    if (userInfo.openId) {
                        userInfo.hasLogin = true;
                    }
                    alert(JSON.stringify(data));
                    window.history.back();
                  })
                  .error(function () {
                    alert('注册失败!');
                  })
                  .finally(function () {
                  });
            }

            userInfo.getOpenId($http, doReg, doReg);
        }
    };
});
