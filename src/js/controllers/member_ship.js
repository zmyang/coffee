angular.module('Coffee.controllers.MemberShip', [])

.controller('MemberShipController', function($scope, $location, currentOrder, shoppingCart, userInfo) {
    var vm = this;

    vm.unPaidOrders = [];
    vm.paidOrders = [];
    vm.shipedOrders = [];
    vm.finishedOrders = [];

    // orders page
    vm.activeTab = 1;

    function noLogin () {
        return;// no need login
        userInfo.fromPage = '/member_ship';
        $location.path('/login');
    }

    vm.getInfo = function (page) {
        var isForce = false;
        if ('member_ship' == page) {
            isForce = true;
        }
        if ('orders' == page) {
            userInfo.getOrders(function (data) {
                vm.unShippedOrders = data['unShippedOrders'];
                vm.completedOrders = data['completedOrders'];
                vm.unpaidOrders = data['unpaidOrders'];
                vm.shippedOrders = data['shippedOrders'];
            });
            return;
        }
        userInfo.getUserInfo(function () {
          var infoData = userInfo.info;
          vm.userinfo = infoData;
        }, noLogin, isForce);
    };

    vm.showOrderDetail = function (o) {
        currentOrder.setOrder(o);
        $location.path('/order_detail');
    };

    vm.historyOrders = [];
    vm.getOrderHistory = function () {
        userInfo.getOrderHistory(function (data) {
            vm.historyOrders = data;
        });
    }

    vm.confirmOrder = function (o) {
        currentOrder.confirmOrder(o, function () {
            vm.getInfo('orders');
            vm.activeTab = 4;
        });
    }
});
