angular.module('Coffee.controllers.PayOrder', [])

.controller('PayOrderController', function($scope, $location, $http, shoppingCart, userInfo) {
    var vm = this;

    vm.products = [];

    vm.userinfo = {};

    vm.selectReceiver = null;

    vm.sendPrice = 0;

    userInfo.getUserInfo($http, function () {
      var infoData = userInfo.info;
      vm.userinfo = infoData;
      vm.selectReceiver = shoppingCart.getReceiver() || infoData['receivers'][0]
    });

    vm.initList = function (force) {
        if (!userInfo.openId) {
            alert('未能获取用户信息，请重新登陆。');
        }

        shoppingCart.getCart($http, function (data) {
            vm.products = data;
            calculateTotlePrice();
        }, userInfo.openId, force);
    };


    vm.totalPrice = 0;

    var calculateTotlePrice = function () {
        var totalPrice = 0;
        for (var i = vm.products.length - 1; i >= 0; i--) {
          vm.products[i]['buy_num'] = vm.products[i]['buy_num'] || 1;
          totalPrice += vm.products[i]['price'] * vm.products[i]['buy_num'];
        }
        vm.totalPrice = totalPrice;
    };


    vm.payCart = function () {
        var payUrl = 'http://www.urcoffee.com/api/order/create.jhtml';

        alert('memo:' + vm.memo);
        alert('userPoint:' + vm.userPoint);

        var params = { 
            wechatId: userInfo.openId,
            receiverId: '',
            // paymentMethodId: 1,
            shippingMethodId: 1,
            code: '',
            // isInvoice: false,
            invoiceTitle: '',
            // useBalance: false,
            memo: vm.memo,
            point: 0,
            amount: 1000,
            usePoint: vm.userPoint
        };

        userInfo.postData($http, payUrl, params)
          .success(function (data) {
            if (1 == data['result']) {
              alert('下单成功!');
                weixinBridge.config($http, window.location.href, function() {
                  weixinBridge.pay($http, userInfo.openId, new Date().getTime());
                });
            }
            else {
              alert(data['msg']['content'] || '下单失败!');
            }
          })
          .error(function () {
            alert('下单失败!');
          })
          .finally(function () {
          });


        // weixinBridge.config($http, window.location.href, function() {
        //   weixinBridge.pay($http, userInfo.openId, new Date().getTime());
        // });
    };
});
