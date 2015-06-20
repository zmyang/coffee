angular.module('Coffee.controllers.Account', [])

.controller('AccountController', function($scope, $location) {
    var vm = this;

    // 我的联系方式
    vm.Account = {
        get: function() {
        },
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

            if (!utils.checkTell(this.inTel)) {
                utils.alert('请输入正确的手机号码');
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
            if (!utils.checkTell(this.inTel)) {
                utils.alert('请输入正确的手机号码');
                return;
            }
            if (!this.code) {
                utils.alert('请获取并输入验证码！');
                return;
            }
        }
    };
});
