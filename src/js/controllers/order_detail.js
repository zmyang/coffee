angular.module('Coffee.controllers.OrderDetail', [])

.controller('OrderDetailController', function($scope, $location, $http, currentOrder, userInfo) {
    var vm = this;

    vm.order = currentOrder.getOrder();
    console.log(vm.order);

});
