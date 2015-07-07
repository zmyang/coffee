angular.module('Coffee.controllers.Main', [])

.controller('MainController', function ($scope, $location, $http, userInfo, shoppingCart) {
    $scope.mainHost = /^http/.test(location.href) ? location.href.replace(location.hash, '') : '';

    $scope.pageBack = function () {
        window.history.back();
    };

    $scope.go = function (path, isHash) {
        if (isHash) {
            $location.hash(path);
        } else {
            $location.path(path);
        }
    };

    userInfo.getOpenId($http);

    // 获取购物车，有的话显示提示
    shoppingCart.getCart($http, function (data) {
        if (data && data.length > 0) {
            $scope.hasCart = true;
        }
        else {
            $scope.hasCart = false;
        }

    }, userInfo.openId);

});