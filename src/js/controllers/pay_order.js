angular.module('Coffee.controllers.PayOrder', [])

.controller('PayOrderController', function($scope, $rootScope, $location, shoppingCart, userInfo, weixinBridge) {
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
    vm.allPrice = 0;

    var calculateTotlePrice = function () {
        var totalPrice = 0;
        for (var i = vm.products.length - 1; i >= 0; i--) {
          vm.products[i]['buy_num'] = vm.products[i]['buy_num'] || 1;
          totalPrice += vm.products[i]['price'] * vm.products[i]['buy_num'];
        }

        vm.totalPrice = totalPrice.toFixed(2);
        vm.allPrice = parseFloat(vm.totalPrice) + vm.sendPrice;
    };


    var paying = false;
    vm.payCart = function () {
        if (paying) {
          return;
        }
        paying = true;
        $rootScope.ajaxDataLoading = true;
        var payUrl = 'http://www.urcoffee.com/api/order/create.jhtml';

        var params = { 
            openid: userInfo.openId,
            receiverId:  vm.selectReceiver ? vm.selectReceiver['id'] : '1',
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


        function payFinished () {
            $rootScope.ajaxDataLoading = false;
            vm.initList(true);
            $location.path('/order_records');
        }

        function payFail () {
            $rootScope.ajaxDataLoading = false;
            vm.initList();
            $location.path('/orders');
        }

        userInfo.postData(payUrl, params)
          .success(function (data) {
            if (1 == data['result'] && data['data'] && data['data']['sn']) {
                weixinBridge.config(window.location.href, function() {
                  weixinBridge.pay(userInfo.openId, data['data']['sn'], payFinished, payFail);
                });
            }
            else {
              $rootScope.ajaxDataLoading = false;
              alert(data['msg']['content'] || '下单失败!');
            }
          })
          .error(function () {
            $rootScope.ajaxDataLoading = false;
            alert('下单失败，请稍后再试。');
          })
          .finally(function () {
            paying = false;
          });
    };
});
