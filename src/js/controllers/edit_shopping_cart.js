angular.module('Coffee.controllers.EditShoppingCart', [])

.controller('EditShoppingCartController', function($scope, $http, shoppingCart, userInfo) {
  var vm = this;

  // vm.products = shoppingCart.getCart($http)['products'];
  vm.products = [];

  vm.initList = function () {
    if (!userInfo.openId) {
        alert('未能获取用户信息，请重新登陆。');
    }
    var listUrl = 'http://www.urcoffee.com/api/cart/list/' + userInfo.openId + '.jhtml';

    $http.get(listUrl)
      .success(function (data) {
        if (1 == data['result']) {
          vm.products = data['data'];
        }
        else {
          alert('获取购物车失败!');
        }
      })
      .error(function () {
        alert('获取购物车失败!');
      });
  };

  vm.deleteProduct = function (id) {
    // shoppingCart.deleteProduct(id);
    var deleteUrl = 'www.urcoffee.com/api/cart/delete.jhtml';
    var params = {
      wechatId: userInfo.openId,
      id: id
    };

    userInfo.postData($http, deleteUrl, params)
      .success(function (data) {
        if (1 == data['result']) {
          vm.initList();
        }
        else {
          alert('删除购物车失败!');
        }
      })
      .error(function () {
        alert('删除购物车失败!');
      })
      .finally(function () {
      });
  }

  vm.doedit = false;
  vm.selectAll = true;

  var calculateTotlePrice = function () {
    var totalPrice = 0;
    for (var i = vm.products.length - 1; i >= 0; i--) {
      if (vm.products[i]['be_selected']) {
        totalPrice += vm.products[i]['price'] * (vm.products[i]['buy_num'] || 1);
      }
    }
    vm.totalPrice = totalPrice;
  };

  var doSelectAll = function () {
      vm.selectAll = !vm.selectAll;
      for (var i = vm.products.length - 1; i >= 0; i--) {
        vm.products[i]['be_selected'] = vm.selectAll;
      }
      calculateTotlePrice();
  };

  vm.calculateTotlePrice = calculateTotlePrice;
  vm.doSelectAll = doSelectAll;

});
