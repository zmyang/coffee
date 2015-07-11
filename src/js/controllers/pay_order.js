angular.module('Coffee.controllers.PayOrder', [])

.controller('PayOrderController', function($scope, $rootScope, $location, shoppingCart, userInfo) {
    var vm = this;

    vm.products = [];

    vm.userinfo = {};

    vm.selectReceiver = null;

    vm.sendPrice = 0;

    userInfo.getUserInfo(function () {
      var infoData = userInfo.info;
      vm.userinfo = infoData;
      vm.selectReceiver = shoppingCart.getReceiver() || infoData['receivers'][0]
    });

    vm.initList = function (force) {
        if (!userInfo.openId) {
            alert('未能获取用户信息，请重新登陆。');
        }

        shoppingCart.getCart(function (data) {
            vm.products = data;
            calculateTotlePrice();
            if (data && data.length > 0) {
              $rootScope.hasCart = true;
            }
            else {
              $rootScope.hasCart = false;
            }
            $rootScope.refreshView();
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

        var params = { 
            wechatId: userInfo.openId,
            receiverId:  vm.selectReceiver ? vm.selectReceiver['id'] : '',
            // paymentMethodId: 1,
            shippingMethodId: 1,
            code: '',
            // isInvoice: false,
            invoiceTitle: '',
            // useBalance: false,
            memo: vm.memo || '',
            point: 0,
            amount: 1000,
            usePoint: vm.userPoint || ''
        };

        alert('order params:' + JSON.stringity(params));

        userInfo.postData(payUrl, params)
          .success(function (data) {
            if (1 == data['result']) {
              alert('下单成功!');
                weixinBridge.config(window.location.href, function() {
                  weixinBridge.pay(userInfo.openId, new Date().getTime());
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
    };
});
