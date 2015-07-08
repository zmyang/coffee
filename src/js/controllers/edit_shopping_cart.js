angular.module('Coffee.controllers.EditShoppingCart', [])

.controller('EditShoppingCartController', function($scope, $http, shoppingCart, userInfo) {
  var vm = this;

  vm.products = [];


  vm.initList = function (force) {
    if (!userInfo.openId) {
        alert('未能获取用户信息，请重新登陆。');
    }

    shoppingCart.getCart($http, function (data) {
      vm.products = data;
      calculateTotlePrice();
    }, userInfo.openId, force);
  };

  vm.deleteProduct = function (id) {
    // shoppingCart.deleteProduct(id);
    var deleteUrl = 'http://www.urcoffee.com/api/cart/delete.jhtml';
    var params = {
      wechatId: userInfo.openId,
      id: id
    };

    userInfo.postData($http, deleteUrl, params)
      .success(function (data) {
        if (1 == data['result']) {
          vm.initList(true);
        }
        else {
          alert('删除购物车失败!');
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
      vm.products[i]['product']['buy_num'] = vm.products[i]['product']['buy_num'] || 1;
      totalPrice += vm.products[i]['product']['price'] * vm.products[i]['product']['buy_num'];
    }
    vm.totalPrice = totalPrice;
  };


  vm.calculateTotlePrice = calculateTotlePrice;

});
