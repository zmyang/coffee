angular.module('Coffee.controllers.OrderDetail', [])

.controller('OrderDetailController', function($scope, $location, currentOrder, userInfo, weixinBridge) {
    var vm = this;

    vm.order = currentOrder.getOrder();

    vm.orderStatusText = {
        'unconfirmed': '未确认',
        'confirmed': '已确认',
        'completed': '已完成',
        'cancelled': '已取消'
    }[vm.order.orderStatus] || '';

    vm.payOrder = function () {
        weixinBridge.config(window.location.href, function() {
          weixinBridge.pay(userInfo.openId, vm.order.sn);
        });
    };
});
