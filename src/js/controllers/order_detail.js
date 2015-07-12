angular.module('Coffee.controllers.OrderDetail', [])

.controller('OrderDetailController', function($scope, $location, currentOrder, userInfo, weixinBridge) {
    var vm = this;

    vm.order = currentOrder.getOrder();

    vm.payOrder = function () {
        weixinBridge.config(window.location.href, function() {
          weixinBridge.pay(userInfo.openId, vm.order.sn);
        });
    };
});
