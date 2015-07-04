angular.module('Coffee.controllers.MemberShip', [])

.controller('MemberShipController', function($scope, $location, $http, currentOrder, shoppingCart, userInfo) {
    var vm = this;

    vm.unPaidOrders = [{
            "id": 71,
            "createDate": 1435629289000,
            "modifyDate": 1435664034000,
            "sn": "201506303840",
            "orderStatus": "confirmed",
            "paymentStatus": "paid",
            "shippingStatus": "shipped",
            "freight": 0,
            "point": 0,
            "consignee": "张国华",
            "areaName": "江苏省南京市雨花台区",
            "address": "宁双路",
            "zipCode": "210012",
            "phone": "18651649663",
            "isInvoice": false,
            "invoiceTitle": null,
            "tax": 0,
            "memo": null,
            "paymentMethodName": "网上支付",
            "shippingMethodName": "普通快递",
            "area": {
                "id": 820,
                "createDate": 1357002126000,
                "modifyDate": 1357002126000,
                "order": null,
                "name": "雨花台区",
                "fullName": "江苏省南京市雨花台区"
            },
            "shippings": [
                {
                    "id": 10,
                    "createDate": 1435663306000,
                    "modifyDate": 1435663306000,
                    "sn": "20150630505",
                    "shippingMethod": "顺丰速递",
                    "deliveryCorp": "顺丰速递",
                    "trackingNo": "918246491606",
                    "consignee": "张国华",
                    "area": "江苏省南京市雨花台区",
                    "address": "宁双路",
                    "zipCode": "210012",
                    "phone": "18651649663",
                    "quantity": 1
                }
            ],
            "amount": 0.01,
            "usePoint": 0,
            "name": "测试商品[1kg]",
            "quantity": 1,
            "shippedQuantity": 1,
            "weight": 1000,
            "price": 0.01
        }];
    vm.paidOrders = [];
    vm.shipedOrders = [];
    vm.finishedOrders = [];

    function noLogin () {
        return;// for test
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
        userInfo.getUserInfo($http, function () {
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
