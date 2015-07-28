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


  // 点击立即购买
  vm.buyIt = function (p) {
      currentProduct.setProduct(p);
      var type = 1;
      if (p['attributeValue1']) {
          type = 2;
      }
      location.href = '#/detail?item=' + p.id + '&type=' + type;
  };

});
