angular.module('Coffee.controllers.Main', [])

.controller('MainController', function ($scope, $rootScope, $location, $http, userInfo, shoppingCart) {
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

    userInfo.getOpenId($http, function () {
        // 获取购物车，有的话显示提示
        shoppingCart.getCart($http, function (data) {
            if (data && data.length > 0) {
                $rootScope.hasCart = true;
            }
            else {
                $rootScope.hasCart = false;
            }

        }, userInfo.openId);
    });

});