angular.module('Coffee.controllers.SelectReceiver', [])

.controller('SelectReceiverController', function($scope, $http, $location, userInfo, shoppingCart) {
    var vm = this;

    vm.items = [];

    // 获取收获地址列表
    vm.getList = function () {
        function _doGet (id) {
            var listUrl = 'http://www.urcoffee.com/api/member/receivers/' + id + '.jhtml';

            $http.get(listUrl)
                .success(function (data) {
                  if (data && 1 == data['result']) {
                    vm.items = data['data'];
                  }
                })
                .finally(function () {
                });
        }

        userInfo.getUserInfo($http, function () {
          _doGet(userInfo.openId);
        });
    };

    vm.select = function (r) {
        shoppingCart.setReceiver(r);
        $location.path('/pay_order');
    };

});