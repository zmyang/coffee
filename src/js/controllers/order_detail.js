angular.module('Coffee.controllers.OrderDetail', [])

.controller('OrderDetailController', function($scope, $location, currentOrder, userInfo) {
    var vm = this;

    vm.order = currentOrder.getOrder();
});
