angular.module('Coffee.controllers.GroupPurchase', [])

.controller('GroupPurchaseController', function($scope, $rootScope, $http, $location, userInfo, currentProduct, shoppingCart) {
  var vm = this;

  vm.curTime = null;
  vm.isPreDate = false;
  vm.groupPurchaseDates = [];

  vm.groupProducts = [];

  userInfo.getGroupDates(function (data) {
    vm.groupPurchaseDates = data;

    if (vm.groupPurchaseDates.length > 0) {
      vm.curTime = vm.groupPurchaseDates[0];
      vm.getGroupProducts(vm.curTime);
    }
  });


  vm.getGroupProducts = function (d) {
    vm.curTime = d;
    userInfo.getGroupProducts(d, function (data, isToday) {
      vm.groupProducts = data;
      vm.isPreDate = isToday;
    });
  };

  var joiningCart = false;
  function doAddCart(p, done) {
    if (joiningCart) {
      return;
    }
    joiningCart = true;
    if (!userInfo.openId) {
        alert('未能获取用户信息，请重新登陆。');
    }
    var params = {
        'openid': userInfo.openId,
        'id': p.id, 
        'quantity': 1,
        'processingPrice': 0
    };
    shoppingCart.add(params, function (data) {
      if (data && 1 == data['result']) {
        $rootScope.hasCart = true;
      }
      else {
        $rootScope.hasCart = false;
      }
      done && done();
    }, function () {
      joiningCart = false;
    });
  }

  // 点击立即购买
  vm.buyIt = function (p) {
      currentProduct.setProduct(p);
      if (p['attributeValue1']) {
          $location.path('/add_shopping_cart');
      }
      else {
          doAddCart(p, function () {
              $location.path('/pay_order');
          });
      }
  };

});
