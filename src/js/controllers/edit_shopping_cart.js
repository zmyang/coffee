angular.module('Coffee.controllers.EditShoppingCart', [])

.controller('EditShoppingCartController', function($scope, $http, shoppingCart) {
  var vm = this;

  vm.products = shoppingCart.getCart()['products'];

  vm.deleteProduct = function (id) {
    shoppingCart.deleteProduct(id);
  }
  vm.doedit = false;
  vm.selectAll = true;

  var calculateTotlePrice = function () {
    var totalPrice = 0;
    for (var i = vm.products.length - 1; i >= 0; i--) {
      if (vm.products[i]['be_selected']) {
        totalPrice += vm.products[i]['price'];
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
