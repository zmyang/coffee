angular.module('Coffee.controllers.MemberShip', [])

.controller('MemberShipController', function($scope, $http, currentProduct, shoppingCart) {
  var vm = this;

  var memberShip = {
    'wait_pay': 5,
    'wait_send': 10,
    'sended': 7,
    'done': 0
  };

  vm.memberShip = memberShip;

});
