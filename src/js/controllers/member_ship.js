angular.module('Coffee.controllers.MemberShip', [])

.controller('MemberShipController', function($scope, $location, currentOrder, shoppingCart, userInfo) {
    var vm = this;

    vm.unPaidOrders = [];
    vm.paidOrders = [];
    vm.shipedOrders = [];
    vm.finishedOrders = [];

    function noLogin () {
        return;// no need login
        userInfo.fromPage = '/member_ship';
        $location.path('/login');
    }

    function filterOrders () {
        var orders = vm.userinfo['orders'];

        var curOrder;
        for (var i = orders.length - 1; i >= 0; i--) {
            curOrder = orders[i];
            if ('unpaid' === curOrder['paymentStatus']) {
                vm.unPaidOrders.push(curOrder);
            }
            else {
                if ('unshipped' === curOrder['shippingStatus']) {
                    vm.paidOrders.push(curOrder);
                }
                else {
                    if ('confirmed' === curOrder['orderStatus']) {
                        vm.finishedOrders.push(curOrder);
                    }
                    else {
                        vm.shipedOrders.push(curOrder);
                    }
                }
            }
         };
    }

    vm.getInfo = function (page) {
        var isForce = false;
        var doFilterOrders = false;
        if ('member_ship' == page) {
            isForce = true;
        }
        if ('orders' == page) {
            doFilterOrders = true;
        }
        userInfo.getUserInfo(function () {
          var infoData = userInfo.info;
          vm.userinfo = infoData;

          if (doFilterOrders) {
            filterOrders();
          }
        }, noLogin, isForce);
    };

    vm.showOrderDetail = function (o) {
        currentOrder.setOrder(o);
        $location.path('/order_detail');
    };
});
