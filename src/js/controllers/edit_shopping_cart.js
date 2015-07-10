angular.module('Coffee.controllers.EditShoppingCart', [])

.controller('EditShoppingCartController', function($scope, $rootScope, $http, shoppingCart, userInfo) {
  var vm = this;

  vm.products = [];


  var initList = function (force) {
    if (!userInfo.openId) {
        alert('未能获取用户信息，请重新登陆。');
    }

    shoppingCart.getCart($http, function (data) {
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

  vm.initList = initList;

  vm.deleteProduct = function (id) {
    // shoppingCart.deleteProduct(id);
    var deleteUrl = 'http://www.urcoffee.com/api/cart/delete.jhtml';
    var params = {
      wechatId: userInfo.openId,
      id: id
    };

    userInfo.postData($http, deleteUrl, params)
      .success(function (data) {
        initList(true);
        if (1 != data['result']) {
          alert(data['msg']);
        }
      })
      .error(function () {
        alert('删除购物车失败!');
      });
  }

  vm.totalPrice = 0;

  var calculateTotlePrice = function () {
    var totalPrice = 0;
    for (var i = vm.products.length - 1; i >= 0; i--) {
      totalPrice += vm.products[i]['subtotal'];
    }
    vm.totalPrice = totalPrice;
  };


  vm.calculateTotlePrice = calculateTotlePrice;

});
