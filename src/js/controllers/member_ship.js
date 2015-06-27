angular.module('Coffee.controllers.MemberShip', [])

.controller('MemberShipController', function($scope, $location, $http, currentProduct, shoppingCart, userInfo) {
    var vm = this;

    var memberShip = {
        'wait_pay': 5,
        'wait_send': 10,
        'sended': 7,
        'done': 0
    };

    vm.memberShip = memberShip;

    function noLogin () {
        userInfo.fromPage = '/member_ship';
        $location.path('/login');
    }

    userInfo.getOpenId($http, function () {
        userInfo.getUserInfo($http, function () {
          var infoData = userInfo.info;
          // ...
        }, noLogin) ;
    }, noLogin);
});
