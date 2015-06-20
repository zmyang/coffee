angular.module('Coffee.controllers.GroupPurchase', [])

.controller('GroupPurchaseController', function($scope, $http, shoppingCart) {
  var vm = this;

  vm.activeTab = 1;
  vm.groupPurchaseDates = [
      {
        'date': '4月20日',
        'desc': '抢购进行中',
        'index': 1
      },
      {
        'date': '5月6日',
        'desc': '即将开场',
        'index': 2
      },
      {
        'date': '5月28日',
        'desc': '即将开场',
        'index': 3
      },
      {
        'date': '6月1日',
        'desc': '即将开场',
        'index': 4
      }
  ];
});
