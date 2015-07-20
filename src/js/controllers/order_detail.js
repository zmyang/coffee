angular.module('Coffee.controllers.OrderDetail', [])

.controller('OrderDetailController', function($scope, $rootScope, $location, currentOrder, userInfo, weixinBridge) {
    var vm = this;

    vm.order = currentOrder.getOrder();

    vm.orderStatusText = {
        'unconfirmed': '未确认',
        'confirmed': '已确认',
        'completed': '已完成',
        'cancelled': '已取消'
    }[vm.order.orderStatus] || '';

    vm.shippingsTrackingNo = '';
    vm.shippingsDeliveryCorp = '';
    if (vm.order.shippings && vm.order.shippings.length > 0) {
        vm.shippingsTrackingNo = vm.order.shippings[0]['trackingNo'];
        vm.shippingsDeliveryCorp = vm.order.shippings[0]['deliveryCorp'];
    }

    function finalFn() {
        $rootScope.ajaxDataLoading = false;
    }

    var paying = false;
    vm.payOrder = function () {
        if (true == paying) {
            return;
        }
        paying = true;
        $rootScope.ajaxDataLoading = true;
        weixinBridge.config(window.location.href, function() {
          paying = false;
          weixinBridge.pay(userInfo.openId, vm.order.sn, finalFn, finalFn);
        });
    };
});
